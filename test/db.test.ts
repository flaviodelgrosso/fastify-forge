import { strictEqual } from 'node:assert';
import { test } from 'node:test';

import { buildApp } from '#src/app';
import { db } from '#src/db/index';

import sinon from 'sinon';

test('should call client.end() on server close', async () => {
  const app = await buildApp();
  await app.ready();

  const clientEndStub = sinon.stub(db.$client, 'end').resolves();

  await app.close();

  strictEqual(clientEndStub.calledOnce, true);

  clientEndStub.restore();
});
