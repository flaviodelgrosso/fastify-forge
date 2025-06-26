import { ajvFilePlugin } from '@fastify/multipart';
import closeWithGrace from 'close-with-grace';

import { buildApp } from './app.ts';
import env from './config/env.config.ts';

async function startServer () {
  const app = await buildApp({
    logger: {
      level: env.log.level,
      redact: ['headers.authorization']
    },
    ignoreDuplicateSlashes: true,
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

  // Start server
  try {
    await app.listen({ host: env.server.host, port: env.server.port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
