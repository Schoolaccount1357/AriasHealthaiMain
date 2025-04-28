import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { getClientIp } from 'request-ip';
import * as fs from 'fs';
import * as path from 'path';
import { createRollingFileLogger } from '../utils/logger';
import { Reader } from '@maxmind/geoip2-node';
import { IPReputationClient } from 'ip-reputation-js-client';
import ExpressBrute from 'express-brute';
import { storage } from '../storage';

// Initialize our security metrics and loggers
const securityLogDir = path.join(process.cwd(), 'logs');
const securityLogPath = path.join(securityLogDir, 'security.log');

// Create log directory if it doesn't exist
if (!fs.existsSync(securityLogDir)) {
  fs.mkdirSync(securityLogDir, { recursive: true });
}

// Create our security logger
const securityLogger = createRollingFileLogger('security', {
  path: securityLogPath,
  interval: '1d',     // Rotate daily
  size: '10M',        // Max size per file
  maxFiles: 60        // Keep logs for 60 days
});

// Bot detection patterns
const BOT_PATTERNS = [
  // Browser automation frameworks
  /selenium/i, /webdriver/i, /puppeteer/i, /playwright/i, /headless/i,
  // Common bots
  /zgrab/i, /python-requests/i, /curl/i, /wget/i, /go-http-client/i,
  // Scanner signatures
  /nmap/i, /nikto/i, /dirbuster/i, /gobuster/i, /zap/i, /burp/i,
  // Some good bots we may want to allow
  /Googlebot/i, /bingbot/i, /Yandex/i, /Baiduspider/i
];

// Track unusual traffic patterns
type TrafficRecord = {
  count: number;
  lastAccess: number;
  paths: Map<string, number>;
  userAgents: Set<string>;
  geo?: string;
  suspicious: boolean;
  consecutiveFailures: number;
};

// In-memory traffic store - consider Redis for production
const trafficStore = new Map<string, TrafficRecord>();
const geoStore = new Map<string, Map<string, number>>();

// In-memory IP reputation store (would be replaced with a DB in production)
const reputationStore = new Map<string, {
  score: number; // 0-100, lower is worse
  lastCheck: number;
}>();

// Create a brute force prevention instance
const bruteStore = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(bruteStore, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour
  lifetime: 24 * 60 * 60 // 1 day (seconds)
});

/**
 * Custom security middleware that adds additional security headers beyond what Helmet provides
 */
export function additionalSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  // Set permissions policy (formerly Feature-Policy)
  // Restricts which browser features the site can use
  res.setHeader(
    'Permissions-Policy',
    'camera=self, microphone=self, geolocation=self, interest-cohort=()'
  );

  // Add referrer policy to control how much referrer information is sent
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Set X-Content-Type-Options to prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Set X-Frame-Options to prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Set X-XSS-Protection as an additional layer of protection against XSS attacks
  // Note: Modern browsers rely more on CSP, but this helps with older browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
}

/**
 * Extended Rate Limiter
 * More advanced rate limiting with IP tracking and analysis
 */
export const simpleRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    const ip = getClientIp(req) || 'unknown';
    await logSecurityEvent(req, 'RATE_LIMIT_EXCEEDED', `Rate limit exceeded for IP: ${ip}`);
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }
});

/**
 * Speed Limiter
 * Progressive slowdown for suspicious behavior
 */
export const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 50, // slow down after 50 requests in window
  delayMs: (hits) => hits * 50, // add 50ms per hit over threshold
  onLimitReached: async (req, res, options) => {
    const ip = getClientIp(req) || 'unknown';
    await logSecurityEvent(req, 'SPEED_LIMIT', `Speed limit reached for IP: ${ip}, hits: ${options.delayAfter}`);
  }
});

/**
 * Bot Detection Middleware
 * Identifies and handles suspicious automation
 */
export function botDetection(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = getClientIp(req) || 'unknown';
  
  // Skip internal requests
  if (ip === '127.0.0.1' || ip === '::1') {
    return next();
  }
  
  // Check for bot signatures
  const isSuspiciousBot = BOT_PATTERNS.some(pattern => pattern.test(userAgent));
  
  // Allow legitimate crawlers but log them
  if (isSuspiciousBot) {
    if (
      /Googlebot/i.test(userAgent) || 
      /bingbot/i.test(userAgent) || 
      /Yandex/i.test(userAgent) || 
      /Baiduspider/i.test(userAgent)
    ) {
      // This would verify if it's a real search engine bot by doing reverse DNS lookup
      // For simplicity, we just log and allow
      logSecurityEvent(req, 'LEGITIMATE_BOT', `Search engine bot detected: ${userAgent}`);
      return next();
    }
    
    // Log and possibly block suspicious bots
    logSecurityEvent(req, 'SUSPICIOUS_BOT', `Suspicious bot detected: ${userAgent}`);
    
    // Increase detection score for this IP
    increaseDetectionScore(ip, 'bot_signature', 10);
    
    // For now, we'll let it through but add some delay
    setTimeout(() => {
      next();
    }, 500);
    return;
  }
  
  // Track behavioral patterns
  const trafficRecord = trafficStore.get(ip) || {
    count: 0,
    lastAccess: Date.now(),
    paths: new Map<string, number>(),
    userAgents: new Set<string>(),
    suspicious: false,
    consecutiveFailures: 0
  };
  
  // Update traffic record
  trafficRecord.count++;
  trafficRecord.lastAccess = Date.now();
  trafficRecord.paths.set(req.path, (trafficRecord.paths.get(req.path) || 0) + 1);
  trafficRecord.userAgents.add(userAgent);
  
  // Check for suspicious patterns
  
  // 1. Multiple user agents from same IP
  if (trafficRecord.userAgents.size > 3) {
    trafficRecord.suspicious = true;
    logSecurityEvent(req, 'MULTIPLE_USER_AGENTS', `IP ${ip} using multiple (${trafficRecord.userAgents.size}) User-Agents`);
    increaseDetectionScore(ip, 'multiple_user_agents', 15);
  }
  
  // 2. High frequency requests to same path
  const pathCount = trafficRecord.paths.get(req.path) || 0;
  if (pathCount > 15) { // More than 15 hits to same path 
    trafficRecord.suspicious = true;
    logSecurityEvent(req, 'PATH_FREQUENCY', `IP ${ip} accessed ${req.path} ${pathCount} times`);
    increaseDetectionScore(ip, 'path_frequency', 5);
  }
  
  // 3. Request velocity check
  const timeDiff = Date.now() - trafficRecord.lastAccess;
  if (trafficRecord.count > 10 && timeDiff < 1000) { // 10+ requests in under 1 second
    trafficRecord.suspicious = true;
    logSecurityEvent(req, 'HIGH_VELOCITY', `IP ${ip} sending high velocity requests`);
    increaseDetectionScore(ip, 'high_velocity', 20);
  }
  
  // Save updated traffic record
  trafficStore.set(ip, trafficRecord);
  
  // Update geo-based metrics if geo info is available
  if (req.headers['cf-ipcountry'] || res.locals.geo) {
    const country = (req.headers['cf-ipcountry'] as string) || res.locals.geo?.country?.isoCode || 'unknown';
    if (country !== 'unknown') {
      trafficRecord.geo = country;
      
      // Update geo-based metrics
      const countryMap = geoStore.get(country) || new Map<string, number>();
      const hourKey = new Date().toISOString().slice(0, 13); // Group by hour
      countryMap.set(hourKey, (countryMap.get(hourKey) || 0) + 1);
      geoStore.set(country, countryMap);
      
      // Check for unusual geo-based spikes
      checkForGeoAnomalies(country, hourKey);
    }
  }
  
  // Apply progressive controls based on detection score
  const score = getDetectionScore(ip);
  
  if (score >= 50) {
    // High risk - challenge or block
    logSecurityEvent(req, 'HIGH_RISK_IP', `High risk IP ${ip} with score ${score}`);
    
    // For high-risk IPs, we would implement a CAPTCHA or other challenge
    // For this implementation, we'll just add a delay proportional to the score
    setTimeout(() => {
      next();
    }, score * 10); // 10ms per risk point
    return;
  } else if (score >= 30) {
    // Medium risk - add delay and monitor
    logSecurityEvent(req, 'MEDIUM_RISK_IP', `Medium risk IP ${ip} with score ${score}`);
    
    setTimeout(() => {
      next();
    }, score * 5); // 5ms per risk point
    return;
  }
  
  // Low or no risk
  next();
}

/**
 * IP Reputation Checking
 * Assigns reputation scores based on behavior and third-party data
 */
export async function checkIpReputation(req: Request, res: Response, next: NextFunction) {
  const ip = getClientIp(req) || 'unknown';
  
  // Skip for localhost or internal IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return next();
  }
  
  // Check our in-memory store first
  const cached = reputationStore.get(ip);
  const now = Date.now();
  
  // If we have a recent check, use that
  if (cached && (now - cached.lastCheck) < 3600000) { // 1 hour cache
    if (cached.score < 20) {
      // Very bad reputation
      logSecurityEvent(req, 'BAD_REPUTATION_IP', `Bad reputation IP: ${ip}, score: ${cached.score}`);
      
      // For very bad IPs, we might want to block, but for now just delay
      setTimeout(() => {
        next();
      }, 1000); // 1 second delay
      return;
    }
    
    // Store reputation in response locals for other middleware to access
    res.locals.ipReputation = cached.score;
    return next();
  }
  
  try {
    // This is where we would normally call a real IP reputation service
    // For this implementation, we'll simulate it with a simple calculation
    
    let reputationScore = 75; // Default is moderately good
    
    // Reduce score based on detection metrics
    const detectionScore = getDetectionScore(ip);
    if (detectionScore > 0) {
      reputationScore -= Math.min(50, detectionScore); // Up to -50 points
    }
    
    // In a real implementation, this would be an API call like:
    // const ipRepClient = new IPReputationClient('YOUR_API_KEY');
    // const score = await ipRepClient.getReputation(ip);
    
    // Store result
    reputationStore.set(ip, {
      score: reputationScore,
      lastCheck: now
    });
    
    // Take action based on score
    if (reputationScore < 20) {
      logSecurityEvent(req, 'BAD_REPUTATION_IP', `Bad reputation IP: ${ip}, score: ${reputationScore}`);
      
      // For very bad IPs, delay significantly
      setTimeout(() => {
        next();
      }, 1000);
      return;
    }
    
    // Store reputation in response locals
    res.locals.ipReputation = reputationScore;
    next();
  } catch (error) {
    // If reputation check fails, log and continue
    console.error('IP reputation check failed:', error);
    next();
  }
}

/**
 * Enhanced Security Logging
 * Logs security-relevant events with IP and user context
 */
export function enhancedLogging(req: Request, res: Response, next: NextFunction) {
  const ip = getClientIp(req) || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const referer = req.headers['referer'] || 'direct';
  const method = req.method;
  const url = req.originalUrl || req.url;
  
  // For sensitive routes, do more extensive logging
  if (
    url.includes('/api/') || 
    url.includes('/contact') || 
    url.includes('/login') ||
    url.includes('/register') || 
    url.includes('/admin')
  ) {
    // Log detailed information for these paths
    securityLogger.info({
      type: 'ACCESS_SENSITIVE_ROUTE',
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
      method,
      url,
      sessionId: req.session?.id || 'no-session',
      geoData: res.locals.geo || 'no-geo-data',
      reputation: res.locals.ipReputation || 'unknown'
    });
  }
  
  // Capture response status for error tracking
  const originalEnd = res.end;
  res.end = function(...args) {
    // If this is an error response, log it
    if (res.statusCode >= 400) {
      securityLogger.warn({
        type: 'ERROR_RESPONSE',
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        method,
        url,
        statusCode: res.statusCode,
        responseTime: Date.now() - (req.locals?.startTime || Date.now())
      });
      
      // Track consecutive failures for this IP
      const trafficRecord = trafficStore.get(ip);
      if (trafficRecord) {
        trafficRecord.consecutiveFailures++;
        
        // Flag IPs with multiple consecutive errors (potential scanning)
        if (trafficRecord.consecutiveFailures >= 5) {
          logSecurityEvent(req, 'CONSECUTIVE_ERRORS', `IP ${ip} had ${trafficRecord.consecutiveFailures} consecutive errors`);
          increaseDetectionScore(ip, 'consecutive_errors', 20);
        }
        
        trafficStore.set(ip, trafficRecord);
      }
    } else {
      // Reset consecutive failures on successful request
      const trafficRecord = trafficStore.get(ip);
      if (trafficRecord) {
        trafficRecord.consecutiveFailures = 0;
        trafficStore.set(ip, trafficRecord);
      }
    }
    
    return originalEnd.apply(res, args);
  };
  
  // Store start time for performance monitoring
  req.locals = req.locals || {};
  req.locals.startTime = Date.now();
  
  next();
}

/**
 * Sanitize request parameters to prevent injection attacks
 */
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  // Function to sanitize strings
  const sanitize = (str: string): string => {
    if (!str) return str;
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitize(req.query[key] as string);
      }
    });
  }

  // Sanitize body parameters if content type is JSON
  if (req.is('application/json') && req.body) {
    const sanitizeObject = (obj: any): any => {
      const result: any = {};
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          result[key] = sanitize(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = sanitizeObject(obj[key]);
        } else {
          result[key] = obj[key];
        }
      });
      return result;
    };

    // Don't modify the req.body directly, as it might be a parsed JSON object
    // Instead add a sanitized version to the request object
    (req as any).sanitizedBody = sanitizeObject(req.body);
  }

  next();
}

/**
 * CAPTCHA Verification Middleware
 * This checks for high-risk requests and can be conditionally enabled
 */
export function conditionalCaptcha(req: Request, res: Response, next: NextFunction) {
  const ip = getClientIp(req) || 'unknown';
  const score = getDetectionScore(ip) || 0;
  
  // If this IP has a high detection score
  if (score >= 40 && req.method === 'POST') {
    // In a real implementation, check for a valid CAPTCHA token
    // const captchaToken = req.body.captchaToken;
    
    // For now, we'll just log that a CAPTCHA would be required
    logSecurityEvent(req, 'CAPTCHA_REQUIRED', `CAPTCHA would be required for high-risk IP ${ip}`);
    
    // Continue without blocking in this implementation
    next();
  } else {
    next();
  }
}

/**
 * Form Protection for Login/Registration
 * Applies stricter controls to authentication endpoints
 */
export function formProtection(route = 'default') {
  return bruteforce.getMiddleware({
    key: function(req, res, next) {
      // Use a combination of IP and username if available
      const username = req.body?.username || req.body?.email || '';
      next(null, `${getClientIp(req)}_${username}_${route}`);
    }
  });
}

// Helper Functions

/**
 * Log a security event to the security log and database
 */
async function logSecurityEvent(req: Request, eventType: string, message: string) {
  const ip = getClientIp(req) || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const url = req.originalUrl || req.url;
  const sessionId = req.session?.id || 'no-session';
  const countryCode = (req.headers['cf-ipcountry'] as string) || null;
  
  // Determine severity based on event type
  let severity = 'LOW';
  if (eventType.includes('HIGH_RISK') || 
      eventType === 'BAD_REPUTATION_IP' || 
      eventType === 'RATE_LIMIT_EXCEEDED') {
    severity = 'HIGH';
  } else if (eventType.includes('MEDIUM_RISK') || 
            eventType === 'SUSPICIOUS_BOT' || 
            eventType === 'MULTIPLE_USER_AGENTS') {
    severity = 'MEDIUM';  
  } else if (eventType === 'GEO_ANOMALY') {
    severity = 'CRITICAL';
  }
  
  // Calculate IP reputation score
  const score = getDetectionScore(ip);
  
  // First, log to file
  securityLogger.warn({
    type: eventType,
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    url,
    message,
    sessionId,
    severity
  });

  // Then, store in database
  try {
    await storage.logSecurityEvent({
      eventType,
      severity,
      ipAddress: ip,
      userAgent,
      url,
      message,
      metadata: { 
        headers: req.headers,
        path: req.path,
        method: req.method
      },
      countryCode,
      isTor: false, // Would require lookup
      isProxy: false, // Would require lookup
      ipReputation: score,
      sessionId,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to store security event in database:', error);
    // Continue execution even if DB logging fails
  }
}

/**
 * Get the current detection score for an IP
 */
function getDetectionScore(ip: string): number {
  // In a real implementation, this would be stored in Redis or a database
  // For this example, we'll simulate with decay over time
  const record = trafficStore.get(ip);
  if (!record) return 0;
  
  let score = 0;
  
  // Calculate score based on suspicious flags
  if (record.suspicious) score += 20;
  if (record.userAgents.size > 2) score += (record.userAgents.size * 5);
  if (record.consecutiveFailures > 0) score += (record.consecutiveFailures * 5);
  
  // Decay score based on time elapsed (older events matter less)
  const hoursSinceLastActivity = (Date.now() - record.lastAccess) / (1000 * 60 * 60);
  score = Math.max(0, score - (hoursSinceLastActivity * 5));
  
  return Math.min(100, score); // Cap at 100
}

/**
 * Increase the detection score for an IP address
 */
function increaseDetectionScore(ip: string, reason: string, amount: number) {
  const record = trafficStore.get(ip) || {
    count: 0,
    lastAccess: Date.now(),
    paths: new Map<string, number>(),
    userAgents: new Set<string>(),
    suspicious: false,
    consecutiveFailures: 0
  };
  
  record.suspicious = true;
  trafficStore.set(ip, record);
  
  // In a real implementation, we would store the score in Redis or a database
  // and record the specific reason for the score increase
}

/**
 * Check for geographic anomalies in traffic
 */
async function checkForGeoAnomalies(country: string, hourKey: string) {
  const countryMap = geoStore.get(country);
  if (!countryMap) return;
  
  const currentHourCount = countryMap.get(hourKey) || 0;
  
  // Get average for this country in previous hours
  let totalPrevious = 0;
  let countPrevious = 0;
  
  countryMap.forEach((count, key) => {
    if (key !== hourKey) {
      totalPrevious += count;
      countPrevious++;
    }
  });
  
  // Calculate average if we have previous data
  if (countPrevious > 0) {
    const avgPrevious = totalPrevious / countPrevious;
    
    // If current traffic is 300% above average, that's unusual
    if (currentHourCount > avgPrevious * 3 && currentHourCount > 50) {
      // Calculate percentage increase
      const percentIncrease = ((currentHourCount / avgPrevious) * 100).toFixed(1) + '%';
      
      // Log the anomaly
      console.warn(`Traffic anomaly detected for country ${country}: Current: ${currentHourCount}, Avg: ${avgPrevious.toFixed(2)}`);
      
      // Log to file
      securityLogger.warn({
        type: 'GEO_TRAFFIC_ANOMALY',
        timestamp: new Date().toISOString(),
        country,
        currentHourCount,
        averagePreviousCount: avgPrevious,
        percentIncrease
      });
      
      // Log to database
      try {
        await storage.logSecurityEvent({
          eventType: 'GEO_ANOMALY',
          severity: 'CRITICAL',
          ipAddress: 'multiple', // This is a pattern, not a single IP
          userAgent: 'system',
          url: 'n/a',
          message: `Unusual traffic spike from ${country}: ${currentHourCount} requests (${percentIncrease} above normal)`,
          metadata: { 
            country,
            currentHourCount,
            averagePrevious: avgPrevious,
            percentIncrease,
            hourKey
          },
          countryCode: country,
          isTor: false,
          isProxy: false,
          ipReputation: 50, // Neutral score
          sessionId: 'system',
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Failed to store geo anomaly in database:', error);
      }
    }
  }
}