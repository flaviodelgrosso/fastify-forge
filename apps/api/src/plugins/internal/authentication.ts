import auth from '#/auth.js';

import FastifyBetterAuth, {
  type FastifyBetterAuthOptions,
} from 'fastify-better-auth';

export const autoConfig: FastifyBetterAuthOptions = {
  auth,
};

export default FastifyBetterAuth;
