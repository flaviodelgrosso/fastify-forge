import { strictEqual } from 'node:assert';
import { test } from 'node:test';
import { getAuthDecorator } from 'fastify-better-auth';
import sinon from 'sinon';
import { buildApp } from '../src/app.ts';

test("should return 401 for /api/v1 protected route when user isn't logged in", async () => {
  const fastify = await buildApp();

  const res = await fastify.inject({
    method: 'GET',
    url: '/api/v1/protected',
  });

  strictEqual(res.statusCode, 401);
  strictEqual(res.json().message, 'You must be logged in to access this resource.');
});

test('should return 200 for /api/v1 protected route when user is logged in', async () => {
  const fastify = await buildApp();

  await fastify.ready();

  // Mock the getSession method to return a mock user
  const mockSession = {
    session: {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      token: 'test-token',
      ipAddress: '127.0.0.1',
      userAgent: 'test-agent',
    },
    user: {
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      banned: false,
    },
  };

  const authInstance = getAuthDecorator(fastify);
  const getSessionStub = sinon.stub(authInstance.api, 'getSession').resolves(mockSession);

  const res = await fastify.inject({
    method: 'GET',
    url: '/api/v1/protected',
    headers: {
      Authorization: 'Bearer test',
    },
  });

  strictEqual(res.statusCode, 200);

  // Restore the original method
  getSessionStub.restore();
});
