import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      const logEntry = `${timestamp} ${level}: ${message}`;
      return logEntry.replace(/\u001b\[0m/g, '');
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, 'info.log'),
      level: 'info'
    })
  ]
});

export const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};
