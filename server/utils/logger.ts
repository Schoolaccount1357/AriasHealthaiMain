import * as fs from 'fs';
import * as path from 'path';
import * as rfs from 'rotating-file-stream';

type LoggerOptions = {
  path: string;
  interval?: string; // '1d', '1h', etc.
  size?: string;     // '10M', '1G', etc.
  maxFiles?: number;
  compress?: boolean;
};

/**
 * Creates a rotating file logger that writes logs to a file and rotates them based on time or size
 * @param name The logger name
 * @param options Options for the logger
 * @returns A logger object with methods for different log levels
 */
export function createRollingFileLogger(name: string, options: LoggerOptions) {
  // Ensure the directory exists
  const dir = path.dirname(options.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create the rotating file stream
  const stream = rfs.createStream(
    (time, index) => {
      if (!time) return path.basename(options.path);
      
      // Format: name-YYYYMMDD-index.log
      return `${name}-${time.toISOString().slice(0, 10).replace(/-/g, '')}-${index}.log`;
    },
    {
      path: dir,
      interval: options.interval || '1d',
      size: options.size || '10M',
      maxFiles: options.maxFiles || 30,
      compress: options.compress || false,
    }
  );

  // Helper to write to the stream
  const write = (level: string, data: any) => {
    // Format the log entry
    const timestamp = new Date().toISOString();
    let message: string;
    
    if (typeof data === 'string') {
      message = `[${timestamp}] [${level}] ${data}\n`;
    } else {
      const json = JSON.stringify({ ...data, level, timestamp });
      message = `${json}\n`;
    }
    
    stream.write(message);
  };

  // Return logger object with different log level methods
  return {
    info: (data: any) => write('INFO', data),
    warn: (data: any) => write('WARN', data),
    error: (data: any) => write('ERROR', data),
    debug: (data: any) => write('DEBUG', data),
    
    // Clean up resources
    close: () => {
      stream.end();
    }
  };
}

// Simple console logger that can be used for development
export function createConsoleLogger(name: string) {
  return {
    info: (data: any) => console.log(`[${name}] [INFO]`, data),
    warn: (data: any) => console.warn(`[${name}] [WARN]`, data),
    error: (data: any) => console.error(`[${name}] [ERROR]`, data),
    debug: (data: any) => console.debug(`[${name}] [DEBUG]`, data),
    close: () => {} // No-op for console logger
  };
}

// Export a default logger for quick use
export const defaultLogger = createConsoleLogger('app');