import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logLevel = process.env.LOG_LEVEL;
const env = process.env.NODE_ENV;

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warn: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

winston.addColors(customLevelsOptions.colors);

const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logs/dev.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});

const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logs/prod.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});

export const logger = env === "development" ? devLogger : prodLogger;
