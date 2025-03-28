import { type Static, Type } from '@sinclair/typebox';
import envSchema from 'env-schema';

const NodeEnv = {
  development: 'development',
  production: 'production',
  test: 'test',
} as const;

export const LogLevel = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;

const schema = Type.Object({
  POSTGRES_URL: Type.String(),
  POSTGRES_USER: Type.String(),
  POSTGRES_PASSWORD: Type.String(),
  POSTGRES_DB: Type.String(),
  LOG_LEVEL: Type.Enum(LogLevel),
  NODE_ENV: Type.Enum(NodeEnv),
  HOST: Type.String({ default: 'localhost' }),
  PORT: Type.Number({ default: 3000 }),
});

const env = envSchema<Static<typeof schema>>({
  dotenv: true,
  schema,
});

export default {
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === NodeEnv.development,
  isProd: env.NODE_ENV === NodeEnv.production,
  /* c8 ignore next */
  version: process.env.npm_package_version ?? '0.0.0',
  log: {
    level: env.LOG_LEVEL,
  },
  server: {
    host: env.HOST,
    port: env.PORT,
  },
  db: {
    url: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_URL}/${env.POSTGRES_DB}?sslmode=disable`,
  },
};
