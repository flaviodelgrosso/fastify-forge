import { buildApp } from '#src/app';

import { ajvFilePlugin } from '@fastify/multipart';
import { logger } from '@workspace/logger';
import closeWithGrace from 'close-with-grace';

async function startServer () {
  const app = await buildApp({
    connectionTimeout: 120_000,
    // 1 minute: suitable for most payloads, including moderate file uploads
    requestTimeout: 60_000,
    // 10 seconds: ensures efficient resource usage for idle connections
    keepAliveTimeout: 10_000,
    http: {
      // 15 seconds: prevents slow clients from holding connections too long
      headersTimeout: 15_000
    },
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
    await app.listen({ host: app.config.HOST, port: app.config.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
