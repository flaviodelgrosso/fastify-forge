import type { db } from '#src/db/index';
import type { FastifyRequest } from 'fastify';

export function getDbDecorator (request: FastifyRequest) {
  return request.getDecorator<typeof db>('db');
}
