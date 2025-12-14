import path from 'node:path';

import FastifyAutoLoad from '@fastify/autoload';
import Fastify, { type FastifyHttpOptions, type RawServerDefault } from 'fastify';

export async function buildApp<S extends RawServerDefault> (options?: FastifyHttpOptions<S>) {
  const app = Fastify(options);

  // Auto-load plugins
  await app.register(FastifyAutoLoad, {
    dir: path.join(import.meta.dirname, 'plugins'),
    dirNameRoutePrefix: false
  });

  // Auto-load routes
  app.register(FastifyAutoLoad, {
    dir: path.join(import.meta.dirname, 'routes'),
    autoHooks: true,
    autoHooksPattern: /\.hook(?:\.ts|\.js|\.cjs|\.mjs)$/i,
    cascadeHooks: true
  });

  // Set error handler
  app.setErrorHandler(function (err, request, reply) {
    if (err instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      this.log.error(
        {
          err,
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params
          }
        },
        'Unhandled error occurred'
      );

      reply.code(err.statusCode ?? 500);

      let message = 'Internal Server Error';
      if (err.statusCode && err.statusCode < 500) {
        message = err.message;
      }

      reply.send({ message });
    } else {
      reply.send(err);
    }
  });

  // This is used to avoid attacks to find valid routes
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 4,
        timeWindow: 500
      })
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params
          }
        },
        'Resource not found'
      );

      reply.code(404);

      return { message: 'Not Found' };
    }
  );

  return app;
}
