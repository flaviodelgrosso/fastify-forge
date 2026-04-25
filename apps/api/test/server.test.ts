import { ok } from 'node:assert';
import { test } from 'node:test';

import Fastify from 'fastify';
import bootstrap from '../src/app.ts';
import fp from 'fastify-plugin';

test('should build app correctly', async () => {
  const fastify = Fastify();
  fastify.register(fp(bootstrap));

  ok(fastify);
});
