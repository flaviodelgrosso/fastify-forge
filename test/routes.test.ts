import { deepStrictEqual, strictEqual } from 'node:assert';
import { test } from 'node:test';
import { buildApp } from '../src/app.ts';

test('should return 200 for /GET route', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/',
  });

  strictEqual(res.statusCode, 200);
});

test('should return 200 for /POST route', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'POST',
    url: '/',
    payload: JSON.stringify({ name: 'world' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  strictEqual(res.statusCode, 200);
  deepStrictEqual(res.json(), { hello: 'world' });
});

test('should return 200 for /health route', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/health',
  });

  strictEqual(res.statusCode, 200);
  deepStrictEqual(res.json(), { status: 'ok' });
});

test('should handle errors correctly', async () => {
  const fastify = await buildApp();

  fastify.get('/error', async () => {
    throw new Error('Test error');
  });

  const res = await fastify.inject({
    method: 'GET',
    url: '/error',
  });

  strictEqual(res.statusCode, 500);
});

test('should return 404 for unknown routes', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/unknown',
  });

  strictEqual(res.statusCode, 404);
});
