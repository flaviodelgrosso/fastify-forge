import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const healthRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.route({
    url: '/protected',
    method: 'GET',
    schema: {
      tags: ['Protected'],
    },
    handler: async (_req, res) => {
      res.send({ message: 'Protected route' });
    },
  });
};

export default healthRoute;
