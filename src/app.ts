import path from 'node:path';
import { fileURLToPath } from 'node:url';

import AutoLoad from '@fastify/autoload';
import Fastify, { type FastifyServerOptions } from 'fastify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function buildApp(options?: FastifyServerOptions) {
  const server = Fastify(options);

  // Auto-load plugins
  await server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });

  // Auto-load routes
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    autoHooks: true,
    autoHooksPattern: /\.hook(?:\.ts|\.js|\.cjs|\.mjs)$/i,
    cascadeHooks: true,
  });

  // Set error handler
  server.setErrorHandler((err, request, reply) => {
    server.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      'Unhandled error occurred',
    );

    reply.code(err.statusCode ?? 500);

    let message = 'Internal Server Error';
    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });

  // This is used to avoid attacks to find valid routes
  server.setNotFoundHandler(
    {
      preHandler: server.rateLimit({
        max: 4,
        timeWindow: 500,
      }),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found',
      );

      reply.code(404);

      return { message: 'Not Found' };
    },
  );

  return server;
}
