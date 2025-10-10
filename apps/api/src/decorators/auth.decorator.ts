import { getAuthDecorator } from 'fastify-better-auth';

import type auth from '#src/auth';
import type { FastifyInstance } from 'fastify';

export function getAuthInstance (fastify: FastifyInstance) {
  return getAuthDecorator<typeof auth.options>(fastify);
}
