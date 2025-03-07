import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Fastify, { type FastifyServerOptions } from 'fastify';

import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import Helmet from '@fastify/helmet';
import UnderPressure from '@fastify/under-pressure';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function buildApp(options?: FastifyServerOptions) {
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
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });

  // Auto-load routes
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    autoHooks: true,
    autoHooksPattern: /\.hook.ts$/i,
    cascadeHooks: true,
  });

  server.register(UnderPressure);

  // Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send(error);
  });

  return server;
}
