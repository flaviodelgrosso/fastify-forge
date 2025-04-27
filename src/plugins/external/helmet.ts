import FastifyHelmet, { type FastifyHelmetOptions } from '@fastify/helmet';

export const autoConfig: FastifyHelmetOptions = {
  global: true,
  contentSecurityPolicy: {
    directives: {
      'script-src': ["'self'", 'cdn.jsdelivr.net/npm/@scalar/api-reference', "'unsafe-inline'"],
    },
  },
};

export default FastifyHelmet;
