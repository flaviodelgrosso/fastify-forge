import { strictEqual } from 'node:assert';
import { test } from 'node:test';

import Fastify from 'fastify';
import bootstrap from '../src/app.ts';
import fp from 'fastify-plugin';

import { db } from '@fastify-forge/db';
import sinon from 'sinon';

test('should call client.end() on server close', async () => {
  const app = Fastify();
  app.register(fp(bootstrap));
  await app.ready();

  const clientEndStub = sinon.stub(db.$client, 'end').resolves();

  await app.close();

  strictEqual(clientEndStub.calledOnce, true);

  clientEndStub.restore();
});
