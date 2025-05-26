import type { FastifyRequest } from 'fastify';
import type { Session } from '../auth.ts';

export function getSessionDecorator(request: FastifyRequest) {
  return request.getDecorator<Session>('session');
}
