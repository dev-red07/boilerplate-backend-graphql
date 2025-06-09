import { QueueOptions } from 'bull';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    //@ts-ignore
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
};

export default redisOptions;
