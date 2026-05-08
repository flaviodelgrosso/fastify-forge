import { fromNodeHeaders } from 'better-auth/node';
import { getAuthDecorator } from 'fastify-better-auth';

import type auth from '#/auth.js';
import type { FastifyInstance } from 'fastify';

async function authHook(fastify: FastifyInstance) {
  fastify.decorateRequest('session');

  fastify.addHook('onRequest', async (req, res) => {
    const authOptions = getAuthDecorator<typeof auth.options>(fastify);
    const session = await authOptions.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session?.user) {
      return res.unauthorized('You must be logged in to access this resource.');
    }

    req.setDecorator('session', session);
  });
}

export default authHook;
