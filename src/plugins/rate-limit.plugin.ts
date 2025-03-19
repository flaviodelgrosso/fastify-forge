import FastifyRateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function rateLimitPlugin(fastify: FastifyInstance) {
  fastify.register(FastifyRateLimit, {
    max: 4,
    timeWindow: '1 minute',
  });
}

export default fp(rateLimitPlugin, {
  name: 'rate-limit-plugin',
});
