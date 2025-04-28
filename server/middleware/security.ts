import { Request, Response, NextFunction } from 'express';

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
 * Rate limiting middleware to prevent brute force attacks
 * This is a simple implementation - consider using a more robust solution like 'express-rate-limit' in production
 */
const ipRequests = new Map<string, { count: number, timestamp: number }>();

export function simpleRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100; // Max requests per minute per IP
  
  const ipData = ipRequests.get(ip) || { count: 0, timestamp: now };
  
  // Reset count if window expired
  if (now - ipData.timestamp > windowMs) {
    ipData.count = 0;
    ipData.timestamp = now;
  }
  
  // Increment request count
  ipData.count++;
  ipRequests.set(ip, ipData);
  
  // Check if rate limit exceeded
  if (ipData.count > maxRequests) {
    return res.status(429).json({ 
      error: 'Too many requests, please try again later.'
    });
  }
  
  next();
}

/**
 * Sanitize request parameters to prevent injection attacks
 * This is a very basic implementation - consider using a library like 'xss' for production
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