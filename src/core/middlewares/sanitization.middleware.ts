import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes string inputs to prevent XSS attacks
 */
const sanitizeString = (value: any): any => {
  if (typeof value === 'string') {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
  }
  
  if (Array.isArray(value)) {
    return value.map(sanitizeString);
  }
  
  if (typeof value === 'object' && value !== null) {
    const sanitized: any = {};
    for (const key in value) {
      sanitized[key] = sanitizeString(value[key]);
    }
    return sanitized;
  }
  
  return value;
};

export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = sanitizeString(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeString(req.query);
  }
  
  if (req.params) {
    req.params = sanitizeString(req.params);
  }
  
  next();
};