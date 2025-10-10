import Swagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import fp from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';

async function swaggerPlugin (fastify: FastifyInstance) {
  await fastify.register(Swagger, {
    openapi: {
      openapi: '3.1.1',
      info: {
        title: 'Fastify Forge API',
        description: 'API Documentation for Fastify Forge',
        version: '1.0.0'
      }
    }
  });

  await fastify.register(ScalarApiReference, {
    routePrefix: '/api/docs'
  });

  fastify.log.info('API Reference is available at /api/docs');
}

export default fp(swaggerPlugin, {
  name: 'swagger-plugin'
});
