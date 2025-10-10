import type { db } from '@workspace/db';
import type { FastifyRequest } from 'fastify';

export function getDbDecorator (request: FastifyRequest) {
  return request.getDecorator<typeof db>('db');
}
