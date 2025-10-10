# Fastify Forge - AI Coding Agent Instructions

## Architecture Overview

**Fastify Forge** is a TypeScript monorepo template for building Fastify APIs with authentication, using pnpm workspaces and Turbo for orchestration.

### Core Structure
- **`apps/api/`**: Main Fastify application with auto-loaded plugins/routes
- **`packages/`**: Shared packages (`db`, `env`, `logger`) 
- **`cli/`**: Project generator CLI tool
- **`config/`**: Shared ESLint/TypeScript configurations

### Key Architectural Patterns

#### Plugin-Based Architecture
- **External plugins**: Security, CORS, rate limiting, Swagger (`src/plugins/external/`)
- **Internal plugins**: Core business logic like DB connection, authentication (`src/plugins/internal/`)
- **Auto-loading**: Plugins auto-loaded from directories using `@fastify/autoload`

#### Route Organization
- Routes auto-loaded from `src/routes/` with hook support
- Authentication hooks applied at directory level (e.g., `auth.hook.ts`)
- Versioned API structure: `routes/api/v1/`

#### Dependency Injection
- Fastify decorators for shared dependencies (`fastify.decorate()`)
- Database instance available as `fastify.db`
- Auth instance via `getAuthInstance(fastify)` decorator

## Authentication & Security

### Better Auth Integration
- Uses `better-auth` with Drizzle adapter for PostgreSQL
- Session-based authentication with cookie caching
- Admin plugin enabled for user management
- OpenAPI documentation at `/docs`

### Route Protection
```typescript
// Apply auth to entire route tree
fastify.addHook('onRequest', async (req, res) => {
  const session = await getAuthInstance(fastify).api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  if (!session?.user) {
    return res.unauthorized('You must be logged in...');
  }
  req.setDecorator('session', session);
});
```

## Database & Data Layer

### Drizzle ORM Setup
- PostgreSQL with connection pooling (max 10 connections)
- Schema defined in `packages/db/src/schema.ts`
- Auto-generated migrations in `packages/db/migrations/`

### Environment Configuration
- TypeBox schemas for validation (`packages/env/`)
- Database URL constructed from individual env vars
- SSL disabled for local development

## Development Workflows

### Essential Commands
```bash
# Development server with hot reload
pnpm dev

# Build all packages
pnpm build

# Run tests with coverage
pnpm test

# Lint and type check
pnpm lint
pnpm check-types

# Clean build artifacts
pnpm clean
```

### Local Development
- **Docker Compose**: PostgreSQL + API containers
- **Database migrations**: `drizzle-kit generate` then `drizzle-kit migrate`
- **Environment**: Copy `.env.example` to `.env`

### Testing
- Node.js native test runner (`node --test`)
- Coverage via `c8` (100% threshold)
- Tests in `test/` directories alongside source

## Code Patterns & Conventions

### Import Aliases
```typescript
// Use import maps for clean imports
import { buildApp } from '#src/app';
import env from '@workspace/env';
```

### Fastify Plugins
```typescript
// Always use fastify-plugin for encapsulation
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.decorate('myService', new MyService());
}, {
  name: 'my-plugin'
});
```

### Route Definitions
```typescript
// TypeBox schemas with @fastify/type-provider-typebox
app.route({
  url: '/protected',
  method: 'GET',
  schema: {
    tags: ['Protected']
  },
  handler: async (req, res) => {
    res.send({ message: 'Protected route' });
  }
});
```

### Error Handling
- Centralized error handler in `app.ts`
- Rate limiting on 404s to prevent route enumeration
- Structured logging with request context

## Monorepo Management

### Turbo Tasks
- `build`: TypeScript compilation with dependency ordering
- `dev`: Development servers (cache disabled, persistent)
- `test`: Run tests across all packages
- `lint`/`check-types`: Code quality checks

### Package Catalogs
- Shared dependency versions in `pnpm-workspace.yaml`
- Separate catalogs for different environments (node, etc.)

## Deployment & Production

### Docker Setup
- Multi-stage Dockerfile in `apps/api/`
- Production builds use `dist/server.js`
- Health checks and graceful shutdown with `close-with-grace`

### Logging
- Pino logger with ISO timestamps
- Pretty printing in development, JSON in production
- Configurable log levels via environment

## Common Pitfalls

- **Plugin loading order**: Internal plugins depend on external ones
- **Database connections**: Always close connections on app shutdown
- **Environment variables**: All required vars must be present at startup
- **Route hooks**: Authentication hooks run before route handlers
- **TypeScript paths**: Use `#src/*` aliases, not relative imports

## Key Files to Reference

- `apps/api/src/app.ts`: Application setup and plugin loading
- `apps/api/src/auth.ts`: Better Auth configuration
- `packages/db/src/schema.ts`: Database schema definitions
- `packages/env/src/index.ts`: Environment configuration
- `turbo.json`: Build pipeline configuration
- `docker-compose.yml`: Local development environment</content>
<parameter name="filePath">/Users/flaviodelgrosso/Development/fastify-forge/.github/copilot-instructions.md