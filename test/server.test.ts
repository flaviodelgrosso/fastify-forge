import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import { test } from 'node:test';
import { buildApp } from '../src/app';

test('should build app correctly', async () => {
  const fastify = buildApp();

  ok(fastify);
});

test('should return 200 for /GET route', async () => {
  const fastify = buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/',
  });

  strictEqual(res.statusCode, 200);
});

test('should return 200 for /POST route', async () => {
  const fastify = buildApp();

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

test('should handle errors correctly', async () => {
  const fastify = buildApp();

  fastify.get('/error', async () => {
    throw new Error('Test error');
  });

  const res = await fastify.inject({
    method: 'GET',
    url: '/error',
  });

  deepStrictEqual(res.json(), {
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Test error',
  });
});
