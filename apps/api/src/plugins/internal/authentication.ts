import auth from '#src/auth';

import FastifyBetterAuth, { type FastifyBetterAuthOptions } from 'fastify-better-auth';

export const autoConfig: FastifyBetterAuthOptions = {
  auth
};

export default FastifyBetterAuth;
