import { buildApp } from './app';
import env from './config/env.config';

async function startServer() {
  const server = buildApp({
    logger: {
      level: env.log.level,
      redact: ['headers.authorization'],
    },
    ignoreDuplicateSlashes: true,
  });

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await server.close();
        server.log.info(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        server.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });

  // Start server
  try {
    await server.listen({ host: env.server.host, port: env.server.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
