/* c8 ignore start */
import type { InferSelectModel } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export type User = InferSelectModel<typeof users>;

export const UserRoleEnum = pgEnum('UserRole', ['admin', 'user']);

export const users = pgTable('users', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  email: varchar({ length: 50 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  name: varchar('name', { length: 50 }).notNull(),
  role: UserRoleEnum('role').notNull().default('user'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  banned: boolean().notNull().default(false),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
});

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  impersonatedBy: uuid('impersonated_by'),
});

export const accounts = pgTable('accounts', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
