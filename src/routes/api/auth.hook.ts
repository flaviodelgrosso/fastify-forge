import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyInstance } from 'fastify';
import type { Session } from '../../auth.ts';
import { UnauthorizedError } from '../../errors/http-error.ts';

declare module 'fastify' {
  interface FastifyRequest {
    session: Session;
  }
}

async function authHook(fastify: FastifyInstance) {
  fastify.decorateRequest('session');

  fastify.addHook('preHandler', async (req, res) => {
    const session = await fastify.auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.send(new UnauthorizedError('You must be logged in to access this resource.'));
    }

    req.session = session;
  });
}

export default authHook;
