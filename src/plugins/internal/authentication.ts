import FastifyBetterAuth, { type FastifyBetterAuthOptions } from 'fastify-better-auth';
import auth from '../../auth.ts';

export const autoConfig: FastifyBetterAuthOptions<typeof auth.options> = {
  auth,
};

export default FastifyBetterAuth;
