const winston = require("winston");
const morgan = require("morgan");
const path = require("path");

const logger = winston.createLogger({
  level: "info", // Default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => 
      `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: path.join(__dirname, "../logs/combined.log") }), 
    new winston.transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" }), 
  ],
});

const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()), 
  },
});

const logError = (err, req) => {
  logger.error(`ERROR: ${err.message} | Route: ${req.method} ${req.url} | Status: ${err.status || 500}`);
};

module.exports = { logger, morganMiddleware, logError };
