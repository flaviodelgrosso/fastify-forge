import fp from 'fastify-plugin';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Fastify Forge API',
        description: 'API Documentation for Fastify Forge',
        version: '0.0.0',
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
  });
});
