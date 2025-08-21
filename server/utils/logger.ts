// Sanitized logging utility
// Personal data tracking removed for sharing

export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${message}`);
  },
  warn: (message: string) => {
    console.warn(`[WARN] ${message}`);
  },
  error: (message: string) => {
    console.error(`[ERROR] ${message}`);
  },
  // Placeholder for security events
  security: (event: string) => {
    console.log(`[SECURITY] ${event}`);
  }
};