import type { FastifyInstance } from 'fastify';

export default async function sayHello(fastify: FastifyInstance) {
  fastify.register((app) => {
    app.log.info('Hello from Fastify Forge!');
  });
}
