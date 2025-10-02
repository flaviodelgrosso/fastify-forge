import env from '#src/config/env.config';
import * as schema from '#src/db/schema';

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: env.db.url,
  max: 10
});

export const db = drizzle({ client: pool, schema });
