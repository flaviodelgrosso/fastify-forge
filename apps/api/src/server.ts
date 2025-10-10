import { buildApp } from '#src/app';

import { ajvFilePlugin } from '@fastify/multipart';
import env from '@workspace/env';
import { logger } from '@workspace/logger';
import closeWithGrace from 'close-with-grace';

async function startServer () {
  const app = await buildApp({
    loggerInstance: logger,
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
    await app.listen({ host: env.HOST, port: env.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
