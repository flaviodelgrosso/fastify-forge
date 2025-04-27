import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI } from 'better-auth/plugins';
import { db } from './db/index.ts';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  plugins: [
    admin(),
    openAPI({
      path: '/docs',
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: 'fastify-forge',
    database: {
      generateId: false,
    },
  },
});

export type AuthType = typeof auth;
export type AuthOptions = AuthType['options'];
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;

export default auth;
