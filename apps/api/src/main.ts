import { logger } from '@fastify-forge/logger';
import closeWithGrace from 'close-with-grace';
import Fastify from 'fastify';
import fp from 'fastify-plugin';

import bootstrap from '#/app.js';

async function startServer() {
  const app = Fastify({
    connectionTimeout: 120_000,
    // 1 minute: suitable for most payloads, including moderate file uploads
    requestTimeout: 60_000,
    // 10 seconds: ensures efficient resource usage for idle connections
    keepAliveTimeout: 10_000,
    http: {
      // 15 seconds: prevents slow clients from holding connections too long
      headersTimeout: 15_000,
    },
    loggerInstance: logger,
  });

  app.register(fp(bootstrap));

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
