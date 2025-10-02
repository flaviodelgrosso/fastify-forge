import type { Session } from '#src/auth';
import type { FastifyRequest } from 'fastify';

export function getSessionDecorator (request: FastifyRequest) {
  return request.getDecorator<Session>('session');
}
