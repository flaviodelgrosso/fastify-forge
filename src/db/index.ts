import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import * as schema from './schema.ts';

import env from '../config/env.config.ts';

export const pool = new pg.Pool({
  connectionString: env.db.url,
  max: 10
});

export const db = drizzle({ client: pool, schema });
