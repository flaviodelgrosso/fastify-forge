import { deepStrictEqual, strictEqual } from 'node:assert';
import { test } from 'node:test';

import { buildApp } from '#src/app';

import Fastify from 'fastify';

test('should return 200 for /GET route', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/'
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
      'Content-Type': 'application/json'
    }
  });

  strictEqual(res.statusCode, 200);
  deepStrictEqual(res.json(), { hello: 'world' });
});

test('should return 200 for /health route', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/health'
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
    url: '/error'
  });

  strictEqual(res.statusCode, 500);
});

test('should handle FST_ERR_BAD_STATUS_CODE with status code >= 500', async () => {
  const fastify = await buildApp();

  fastify.get('/bad-status-500', async () => {
    // Create a proper FST_ERR_BAD_STATUS_CODE instance
    const err = new Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE();
    err.statusCode = 502;
    throw err;
  });

  const res = await fastify.inject({
    method: 'GET',
    url: '/bad-status-500'
  });

  strictEqual(res.statusCode, 502);
  // Should return generic message for status >= 500
  strictEqual(res.json().message, 'Internal Server Error');
});

test('should handle FST_ERR_BAD_STATUS_CODE with status code < 500', async () => {
  const fastify = await buildApp();

  fastify.get('/bad-status-400', async () => {
    // Create a proper FST_ERR_BAD_STATUS_CODE instance with status < 500
    const err = new Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE();
    err.statusCode = 400;
    err.message = 'Bad Request Error';
    throw err;
  });

  const res = await fastify.inject({
    method: 'GET',
    url: '/bad-status-400'
  });

  strictEqual(res.statusCode, 400);
  strictEqual(res.json().message, 'Bad Request Error');
});

test('should handle FST_ERR_BAD_STATUS_CODE without status code', async () => {
  const fastify = await buildApp();

  fastify.get('/bad-status-undefined', async () => {
    // Create FST_ERR_BAD_STATUS_CODE without statusCode
    const err = new Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE();
    err.statusCode = undefined;
    err.message = 'Error without status code';
    throw err;
  });

  const res = await fastify.inject({
    method: 'GET',
    url: '/bad-status-undefined'
  });

  strictEqual(res.statusCode, 500);
  strictEqual(res.json().message, 'Internal Server Error');
});

test('should return 404 for unknown routes', async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/unknown'
  });

  strictEqual(res.statusCode, 404);
});
