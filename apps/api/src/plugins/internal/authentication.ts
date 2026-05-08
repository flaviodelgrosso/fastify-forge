import FastifyBetterAuth, { type FastifyBetterAuthOptions } from 'fastify-better-auth';

import auth from '#/auth.js';

export const autoConfig: FastifyBetterAuthOptions = {
  auth
};

export default FastifyBetterAuth;
