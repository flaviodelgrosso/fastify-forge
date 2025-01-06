import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import Helmet from '@fastify/helmet';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import Fastify, { type FastifyServerOptions } from 'fastify';

export function buildApp(options?: FastifyServerOptions) {
  const server = Fastify(options);

  server.register(Swagger);
  server.register(SwaggerUI);
  server.register(Cors);
  server.register(Helmet);

  server.register(AutoLoad, {
    dir: `${__dirname}/plugins`,
  });

  server.register(AutoLoad, {
    dir: `${__dirname}/routes`,
  });

  // Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send({ error: 'Something went wrong' });
  });

  return server;
}
