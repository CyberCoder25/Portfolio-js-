import { logger } from './logger.js';

// custom application error class
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// global error handler middleware
export const errorHandler = (err, req, res, next) => {
  const requestId = req.id || 'unknown';
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.error('request error', {
    requestId,
    method: req.method,
    path: req.path,
    statusCode: err.statusCode || 500,
    message: err.message,
    ...(isDevelopment && { stack: err.stack })
  });

  const statusCode = err.statusCode || 500;
  const message = isDevelopment ? err.message : 'internal server error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(isDevelopment && { requestId, stack: err.stack })
  });
};

// async error handler wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default { AppError, errorHandler, asyncHandler };
