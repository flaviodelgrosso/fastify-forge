import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import * as schema from './schema.ts';

export const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 10
});

export const db = drizzle({ client: pool, schema });
