import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import { logger } from './utils/logger.js';
import { csrfMiddleware, verifyCsrfToken } from './utils/csrf.js';
import {
  requestIdMiddleware,
  requestValidationMiddleware,
  requestTimeoutMiddleware
} from './utils/request.js';
import { errorHandler, asyncHandler } from './utils/errors.js';

dotenv.config();
const app = express();
app.set('trust proxy', 1);

app.use((req, res, next) => {
  try {
    const currentQuery = req.query || {};
    Object.defineProperty(req, 'query', {
      value: currentQuery,
      writable: true,
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    logger.warn('Could not redefine req.query', { error: e.message });
  }
  next();
});

connectDB();

logger.info('Server initialization started', { environment: process.env.NODE_ENV });

// ✅ CORS origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(requestIdMiddleware);
app.use(requestTimeoutMiddleware(30000));

// cors configuration with proper origin handling
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl requests, or local files)
    if (!origin) return callback(null, true);
    // allow requests from specified allowed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // log blocked requests for debugging
    logger.warn('cors blocked request', { origin, allowedOrigins });
    return callback(new Error('not allowed by cors'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'X-Request-ID', 'X-Requested-With'],
  maxAge: 86400
}));

const cspDirectives = {
  defaultSrc: ["'self'"]
};

cspDirectives.styleSrc = ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"];
cspDirectives.fontSrc = ["'self'", 'https://fonts.gstatic.com'];
cspDirectives.imgSrc = ["'self'", 'data:'];

const connectSrc = ["'self'"];
allowedOrigins.forEach(o => {
  if (!connectSrc.includes(o)) connectSrc.push(o);
});
cspDirectives.connectSrc = connectSrc;
cspDirectives.objectSrc = ["'none'"];
cspDirectives.frameAncestors = ["'none'"];
cspDirectives.baseUri = ["'self'"];

app.use(helmet({
  contentSecurityPolicy: { directives: cspDirectives },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(requestValidationMiddleware);
app.use(mongoSanitize());
app.use(xss());
app.use(csrfMiddleware);

// CSRF Token endpoint
app.get('/api/csrf-token', (req, res) => {
  logger.debug('CSRF token requested', { requestId: req.id });
  res.json({ 
    success: true,
    csrfToken: req.csrfToken ? req.csrfToken() : null 
  });
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again in 15 minutes.'
    });
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/contact', contactLimiter);
app.use('/api', apiLimiter);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// POST routes with CSRF verification
app.use('/api/contact', verifyCsrfToken);
app.use('/api', contactRoutes);

app.get('/health', (req, res) => {
  logger.debug('Health check', { requestId: req.id });
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

app.use((req, res) => {  
  logger.warn('Route not found', { method: req.method, path: req.path, requestId: req.id });
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info('Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV,
    allowedOrigins
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at', { promise, reason });
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});