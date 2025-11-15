import { logger } from './logger.js';

// generate unique request identifier
const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// middleware to attach unique request id
export const requestIdMiddleware = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
};

// middleware to validate request format
export const requestValidationMiddleware = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  
  // validate content-type for post requests
  if (req.method === 'POST' && !contentType.includes('application/json')) {
    logger.warn('invalid content-type received', {
      requestId: req.id,
      contentType,
      method: req.method,
      path: req.path
    });
    return res.status(415).json({
      success: false,
      error: 'content-type must be application/json'
    });
  }

  // validate request body format
  if (req.body && typeof req.body !== 'object') {
    logger.warn('invalid request body', {
      requestId: req.id,
      method: req.method,
      path: req.path
    });
    return res.status(400).json({
      success: false,
      error: 'request body must be a valid json object'
    });
  }

  next();
};

// middleware to enforce request timeout
export const requestTimeoutMiddleware = (timeout = 30000) => {
  return (req, res, next) => {
    const timeoutId = setTimeout(() => {
      logger.warn('request timeout', {
        requestId: req.id,
        method: req.method,
        path: req.path,
        duration: timeout
      });
      
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          error: 'request timeout'
        });
      }
    }, timeout);

    // clear timeout when response is sent
    res.on('finish', () => clearTimeout(timeoutId));
    res.on('close', () => clearTimeout(timeoutId));
    
    next();
  };
};

export default {
  requestIdMiddleware,
  requestValidationMiddleware,
  requestTimeoutMiddleware
};
