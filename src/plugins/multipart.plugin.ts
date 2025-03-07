import FastifyMultipart from '@fastify/multipart';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function multipartPlugin(fastify: FastifyInstance) {
  fastify.register(FastifyMultipart, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024,
    },
  });
}

export default fp(multipartPlugin, {
  name: 'multipart-plugin',
});
