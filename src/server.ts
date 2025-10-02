import { buildApp } from '#src/app';
import env from '#src/config/env.config';

import { ajvFilePlugin } from '@fastify/multipart';
import closeWithGrace from 'close-with-grace';

import type { FastifyServerOptions } from 'fastify';

async function startServer () {
  const envToLogger: Record<typeof env.nodeEnv, FastifyServerOptions['logger']> = {
    production: true,
    test: false,
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  };

  const app = await buildApp({
    logger: envToLogger[env.nodeEnv],
    ajv: {
      // Adds the file plugin to help @fastify/swagger schema generation
      plugins: [ajvFilePlugin]
    }
  });

  closeWithGrace(async ({ signal, err }) => {
    if (err) {
      app.log.error({ err }, 'server closing with error');
    } else {
      app.log.info(`${signal} received, server closing`);
    }
    await app.close();
  });

  await app.ready();

  // Start server
  try {
    await app.listen({ host: env.server.host, port: env.server.port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
