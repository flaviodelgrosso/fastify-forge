import type { FastifyInstance } from 'fastify';
import type auth from '../auth.ts';

export function getAuthDecorator(fastify: FastifyInstance) {
  return fastify.getDecorator<typeof auth>('auth');
}
