import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const defaultFormat = printf(({ message, level, timestamp: time }) => {
  return `{"timestamp":"${time}","message":"${message}","level":"${level}"}`;
});

const logger = createLogger({
  format: combine(timestamp(), defaultFormat),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
