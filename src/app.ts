import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Fastify, { type FastifyServerOptions } from 'fastify';

import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import Helmet from '@fastify/helmet';
import UnderPressure from '@fastify/under-pressure';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function buildApp(options?: FastifyServerOptions) {
  const server = Fastify(options);

  // Enables the use of CORS in a Fastify application.
  server.register(Cors, {
    origin: false,
  });

  // Set default security headers.
  server.register(Helmet, {
    global: true,
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", 'cdn.jsdelivr.net/npm/@scalar/api-reference', "'unsafe-inline'"],
      },
    },
  });

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

  server.register(UnderPressure);

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
