import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import env from '../config/env.config';

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(Swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'fastify-forge',
        description: 'The Swagger API documentation.',
        version: env.version,
      },
    },
  });

  await fastify.register(SwaggerUI, {
    routePrefix: '/api-docs',
  });

  fastify.log.info('Swagger is available at /api-docs');
}

export default fp(swaggerPlugin, {
  name: 'swaggerPlugin',
});
