import type { FastifyInstance } from 'fastify';
import FastifyBetterAuth from 'fastify-better-auth';
import fp from 'fastify-plugin';
import auth from '../../auth.ts';

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate('auth', auth);
  await fastify.register(FastifyBetterAuth, { auth });
}

export default fp(authPlugin, {
  name: 'auth-plugin',
});
