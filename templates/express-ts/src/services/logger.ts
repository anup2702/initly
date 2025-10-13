/* src/services/logger.ts */
import winston from 'winston';
import path from 'path';

// Detect environment
const logLevel =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

// Timestamped log file name (one per app start)
const logFileName = path.join(
  'logs',
  `app-${new Date().toISOString().replace(/:/g, '-')}.log`
);

// Winston logger
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      level: logLevel,
    }),
    // File transport
    new winston.transports.File({
      filename: logFileName,
      level: logLevel,
    }),
  ],
  exitOnError: false,
});

export default logger;
