import type { FastifyRequest } from 'fastify';
import type { db } from '../db/index.ts';

export function getDbDecorator(request: FastifyRequest) {
  return request.getDecorator<typeof db>('db');
}
