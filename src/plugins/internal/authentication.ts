import FastifyBetterAuth, { type FastifyBetterAuthOptions } from 'fastify-better-auth';
import auth, { type AuthOptions } from '../../auth.ts';

export const autoConfig: FastifyBetterAuthOptions<AuthOptions> = {
  auth,
};

export default FastifyBetterAuth;
