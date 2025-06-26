import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyInstance } from 'fastify';

import { getAuthInstance } from '../../decorators/auth.decorator.ts';

async function authHook (fastify: FastifyInstance) {
  fastify.decorateRequest('session');

  fastify.addHook('preHandler', async (req, res) => {
    const session = await getAuthInstance(fastify).api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session?.user) {
      return res.unauthorized('You must be logged in to access this resource.');
    }

    req.setDecorator('session', session);
  });
}

export default authHook;
