// Add missing type declarations
declare module 'ip-reputation-js-client';

// Extend Express Request to include session
declare namespace Express {
  interface Request {
    session?: {
      id: string;
      [key: string]: any;
    };
  }
  
  interface Response {
    locals: {
      [key: string]: any;
      geoData?: {
        countryCode: string;
        countryName: string;
      };
    };
  }
}