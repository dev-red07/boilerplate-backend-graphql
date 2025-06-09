import winston from 'winston';
import dayjs from 'dayjs';

const logger = winston.createLogger({
  level: 'info',
});

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info =>
      `${info.level} | ${dayjs(info.timestamp).toLocaleString()} | ${info.deploymentId || 'N/A - Deployment Id'} | ${
        info.message
      }`
  )
);

logger.add(
  new winston.transports.Console({
    format: logFormat,
  })
);

const customLogger = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(_requestContext) {
    return {
      async didEncounterErrors(requestContext) {
        logger.error('Exception on query : ' + requestContext.request.query);
        logger.error(requestContext.errors, {
          requestId: requestContext.contextValue.requestId,
        });
      },
      async willSendResponse(_requestContext) {
        // Skipping this for now
      },
    };
  },
};

export { customLogger, logger };
