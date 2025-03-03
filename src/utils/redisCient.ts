import { createClient } from 'redis';

export const redis = createClient({
    username: 'default',
    password: 'uBtyxX89ltEJpk8ilSoaB8AgUCwPIRCq',
    socket: {
        host: 'redis-11152.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11152
    }
});

redis.on('error', err => console.log('Redis Client Error', err));

(async () => {
  try {
      await redis.connect();
      console.log('Redis connected successfully');
  } catch (err) {
      console.error('Redis connection error', err);
  }
})();


