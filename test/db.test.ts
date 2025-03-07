import { strictEqual } from 'node:assert';
import { test } from 'node:test';
import sinon from 'sinon';
import { buildApp } from '../src/app.ts';
import { client } from '../src/db/index.ts';

test('should call client.end() on server close', async () => {
  const app = buildApp();
  await app.ready();

  const clientEndStub = sinon.stub(client, 'end').resolves();

  await app.close();

  strictEqual(clientEndStub.calledOnce, true);

  clientEndStub.restore();
});
