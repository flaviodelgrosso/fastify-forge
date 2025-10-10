import pino, { type Logger, type LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTimeNano,
  transport:
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
};

export const logger: Logger = pino(loggerOptions);
