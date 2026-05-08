import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

export const swaggerDocsRoutePrefix = '/docs';

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Fastify Forge API',
        description: 'Swagger for Fastify Forge',
        version: '0.0.0'
      }
    }
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: swaggerDocsRoutePrefix
  });
});
