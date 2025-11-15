import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

// create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// define log levels
const levels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// get current timestamp in iso format
const getTimestamp = () => new Date().toISOString();

// log entry to console and/or file
const log = (level, message, meta = {}) => {
  const timestamp = getTimestamp();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(Object.keys(meta).length > 0 && { meta })
  };

  const logString = JSON.stringify(logEntry);

  // write errors and warnings to both console and error.log
  if (level === levels.ERROR || level === levels.WARN) {
    console.error(logString);
    try {
      fs.appendFileSync(path.join(logsDir, 'error.log'), logString + '\n');
    } catch (e) {
      console.error('failed to write error log', e.message);
    }
  } else {
    // write info and debug to console
    console.log(logString);
    // write debug logs only in development environment
    if (process.env.NODE_ENV === 'development') {
      try {
        fs.appendFileSync(path.join(logsDir, 'debug.log'), logString + '\n');
      } catch (e) {
        console.error('failed to write debug log', e.message);
      }
    }
  }
};

// logger interface with methods for each level
export const logger = {
  error: (message, meta) => log(levels.ERROR, message, meta),
  warn: (message, meta) => log(levels.WARN, message, meta),
  info: (message, meta) => log(levels.INFO, message, meta),
  debug: (message, meta) => log(levels.DEBUG, message, meta)
};

export default logger;
