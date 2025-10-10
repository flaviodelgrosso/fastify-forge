import { type Static, Type } from '@sinclair/typebox';
import envSchema from 'env-schema';

export const LogLevel = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
} as const;

const NodeEnv = {
  production: 'production',
  test: 'test',
  development: 'development'
} as const;

const schema = Type.Object({
  POSTGRES_HOST: Type.String(),
  POSTGRES_USER: Type.String(),
  POSTGRES_PASSWORD: Type.String(),
  POSTGRES_DB: Type.String(),
  POSTGRES_PORT: Type.Number({ default: 5432 }),
  LOG_LEVEL: Type.Enum(LogLevel),
  HOST: Type.String({ default: 'localhost' }),
  PORT: Type.Number({ default: 3000 }),
  NODE_ENV: Type.Enum(NodeEnv, { default: NodeEnv.development })
});

export default envSchema<Static<typeof schema>>({
  dotenv: true,
  schema
});
