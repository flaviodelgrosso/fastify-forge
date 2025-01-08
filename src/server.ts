import closeWithGrace from 'close-with-grace';

import { buildApp } from './app';
import env from './config/env.config';

async function startServer() {
  const app = buildApp({
    logger: {
      level: env.log.level,
      redact: ['headers.authorization'],
    },
    ignoreDuplicateSlashes: true,
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
