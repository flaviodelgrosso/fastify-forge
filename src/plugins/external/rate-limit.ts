import FastifyRateLimit, { type FastifyRateLimitOptions } from '@fastify/rate-limit';

export const autoConfig: FastifyRateLimitOptions = {
  max: 4,
  timeWindow: '1 minute',
};

export default FastifyRateLimit;
