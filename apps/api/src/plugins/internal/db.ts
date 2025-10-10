import { db } from '@workspace/db';
import fp from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';

async function dbPlugin (fastify: FastifyInstance) {
  fastify.decorate('db', db);
  fastify.addHook('onClose', async () => {
    await db.$client.end();
  });
}

export default fp(dbPlugin, {
  name: 'db-plugin'
});
