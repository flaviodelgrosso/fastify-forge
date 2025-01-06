import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

const rootRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: Type.Object({
          name: Type.String({ default: 'world' }),
        }),
        response: {
          200: Type.Object({
            hello: Type.String(),
          }),
        },
      },
    },
    (req) => {
      const { name } = req.query;
      return { hello: name };
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
        }),
        response: {
          200: Type.Object({
            hello: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const { name } = request.body;
      return { hello: name };
    },
  );
};

export default rootRoute;
