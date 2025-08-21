
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

/**
 * SANITIZED SECURITY MIDDLEWARE
 * All personal data tracking has been removed for sharing
 * Replace with your production security implementation
 */

/**
 * Basic security headers
 */
export function additionalSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Permissions-Policy', 'camera=self, microphone=self, geolocation=self, interest-cohort=()');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

/**
 * Basic rate limiting (no IP tracking)
 */
export const simpleRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log('Rate limit exceeded');
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }
});

/**
 * Speed limiting
 */
export const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 50,
  delayMs: (hits) => hits * 50,
});

/**
 * Basic bot detection (no data storage)
 */
export async function botDetection(req: Request, res: Response, next: NextFunction) {
  // Simple check without logging personal data
  const isSuspiciousBot = /selenium|webdriver|puppeteer|playwright|headless|zgrab|python-requests|curl|wget/i.test(req.headers['user-agent'] || '');
  
  if (isSuspiciousBot) {
    // Add small delay for suspicious requests
    setTimeout(() => {
      next();
    }, 500);
    return;
  }
  
  next();
}

/**
 * Basic IP reputation check (placeholder)
 */
export async function checkIpReputation(req: Request, res: Response, next: NextFunction) {
  // Placeholder - implement your own IP reputation service
  next();
}

/**
 * Basic logging without personal data
 */
export function enhancedLogging(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path}`);
  next();
}

/**
 * Input sanitization
 */
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  const sanitize = (str: string): string => {
    if (!str) return str;
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitize(req.query[key] as string);
      }
    });
  }

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

    (req as any).sanitizedBody = sanitizeObject(req.body);
  }

  next();
}

/**
 * Placeholder CAPTCHA verification
 */
export async function conditionalCaptcha(req: Request, res: Response, next: NextFunction) {
  // Placeholder - implement your own CAPTCHA system
  next();
}

/**
 * Basic form protection
 */
export function formProtection(route = 'default') {
  return (req: Request, res: Response, next: NextFunction) => {
    // Placeholder - implement your own brute force protection
    next();
  };
}

/**
 * Placeholder country info middleware
 */
export function countryInfoMiddleware(req: Request, res: Response, next: NextFunction) {
  // Placeholder - implement your own geo detection
  next();
}

/**
 * Placeholder visitor activity logger
 */
export async function visitorActivityLogger(req: Request, res: Response, next: NextFunction) {
  // Placeholder - implement your own analytics
  next();
}

// Export placeholder functions for compatibility
export const logSecurityEvent = async () => {
  // Placeholder function
};

export const getDetectionScore = () => 0;
export const increaseDetectionScore = () => {};
export const checkForGeoAnomalies = async () => {};
