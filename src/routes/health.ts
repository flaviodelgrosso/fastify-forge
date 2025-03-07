import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const healthRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.route({
    url: '/health',
    method: 'GET',
    schema: {
      tags: ['Health'],
    },
    handler: async () => {
      return { status: 'ok' };
    },
  });
};

export default healthRoute;
