import Swagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import packageJson from '../../package.json' with { type: 'json' };

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(Swagger, {
    openapi: {
      openapi: '3.1.1',
      info: {
        title: 'Swagger Fastify Forge - OpenAPI 3.1',
        description: 'API Documentation for Fastify Forge',
        version: packageJson.version,
      },
    },
  });

  await fastify.register(ScalarApiReference, {
    routePrefix: '/docs',
  });

  fastify.log.info('API Reference is available at /docs');
}

export default fp(swaggerPlugin, {
  name: 'swagger-plugin',
});
