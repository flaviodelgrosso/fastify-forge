import { ok } from 'node:assert';
import { test } from 'node:test';

import { buildApp } from '#src/app';

test('should build app correctly', async () => {
  const fastify = await buildApp();

  ok(fastify);
});
