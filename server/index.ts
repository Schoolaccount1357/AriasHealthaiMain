import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { getClientIp } from 'request-ip';
import helmet from "helmet";
import path from "path";
import fs from "fs";
import { 
  additionalSecurityHeaders, 
  simpleRateLimit, 
  sanitizeInputs,
  botDetection,
  checkIpReputation,
  enhancedLogging,
  speedLimiter,
  conditionalCaptcha,
  formProtection
} from './middleware/security';
import { defaultLogger } from './utils/logger';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const app = express();

// Basic Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced logging for all requests
app.use(enhancedLogging);

// Security enhancements - helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'", "https://*", "wss://*", "ws://*"],
      mediaSrc: ["'self'", "blob:"],
      frameSrc: ["'self'"],
    },
  },
  // Set cross-origin options
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Add additional security headers
app.use(additionalSecurityHeaders);

// Bot detection - identify and slow down automation
app.use(botDetection);

// IP reputation checking - assign risk scores to IPs
app.use(checkIpReputation);

// Progressive speed limiting for suspicious behaviors
app.use('/api', speedLimiter);

// Apply standard rate limiting to API endpoints
app.use('/api', simpleRateLimit);

// Apply conditional CAPTCHA to sensitive POST endpoints
app.use('/api/contact', conditionalCaptcha);
app.use('/api/veterans/enroll', conditionalCaptcha);
app.use('/api/waitlist/join', conditionalCaptcha);

// Apply brute force protection to authentication routes
app.use('/api/login', formProtection('login'));
app.use('/api/register', formProtection('register'));

// Apply input sanitization to all routes
app.use(sanitizeInputs);

// HTTPS enforcement in production
app.use((req, res, next) => {
  if (app.get("env") === "production" && req.headers["x-forwarded-proto"] !== "https") {
    const host = req.headers.host || '';
    const url = req.url || '';
    return res.redirect(301, `https://${host}${url}`);
  }
  next();
});

// HTTP Strict Transport Security
app.use((req, res, next) => {
  if (app.get("env") === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});

// Log detailed information about each request
app.use((req, res, next) => {
  const ip = getClientIp(req) || req.ip || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const referer = req.headers['referer'] || 'none';
  
  // Add request start time for response time calculation
  const requestStartTime = Date.now();
  
  // Intercept res.end to calculate response time
  const originalEnd = res.end;
  res.end = function(...args) {
    const responseTime = Date.now() - requestStartTime;
    
    // Only log detailed information for API routes
    if (req.path.startsWith('/api')) {
      defaultLogger.info({
        type: 'REQUEST',
        method: req.method,
        path: req.path,
        ip: ip,
        userAgent: userAgent,
        referer: referer,
        statusCode: res.statusCode,
        responseTime: responseTime
      });
    }
    
    return originalEnd.apply(res, args);
  };
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
