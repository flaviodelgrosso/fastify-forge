import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { db } from '../../db/index.ts';

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof db;
  }
}

async function dbPlugin(fastify: FastifyInstance) {
  fastify.decorate('db', db);
  fastify.addHook('onClose', async () => {
    await db.$client.end();
  });
}

export default fp(dbPlugin, {
  name: 'db-plugin',
});
