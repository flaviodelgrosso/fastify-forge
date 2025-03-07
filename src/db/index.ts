import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema.ts';

export const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, { schema });
