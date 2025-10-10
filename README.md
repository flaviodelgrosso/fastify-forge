# ⚡ Fastify Forge ⚡

[![downloads](https://img.shields.io/npm/dt/fastify-forge)](https://www.npmjs.com/package/fastify-forge)
[![npm](https://img.shields.io/npm/v/fastify-forge)](https://www.npmjs.com/package/fastify-forge)
[![license](https://img.shields.io/github/license/flaviodelgrosso/fastify-forge)](https://img.shields.io/github/license/flaviodelgrosso/fastify-forge)
[![CI](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml)

A production-ready **monorepo template** for building **lightning-fast**, **enterprise-grade** REST APIs with [Fastify](https://fastify.dev/). Powered by [Turborepo](https://turbo.build/) for blazing-fast builds, native Node.js 23+ TypeScript type stripping for zero-overhead development, and battle-tested plugins for authentication, validation, and documentation.

**Quick Navigation:** [🚀 Quick Start](#quick-start) • [📖 Features](#what-makes-fastify-forge-special) • [🛠️ Development Guide](#development-guide) • [🎯 Examples](#real-world-examples)

## Table of Contents

- [⚡ Why Use Fastify Forge?](#-why-use-fastify-forge)
- [🚀 Quick Start](#-quick-start)
- [🛠️ What Makes Fastify Forge Special](#️-what-makes-fastify-forge-special)
- [📦 Monorepo Architecture](#-monorepo-architecture)
- [📖 Development Guide](#-development-guide)
- [🎯 Real-World Examples](#-real-world-examples)
- [🚢 Production Deployment](#-production-deployment)
- [🧪 Testing & Quality Assurance](#-testing--quality-assurance)
- [🔧 Advanced Configuration](#-advanced-configuration)
- [🤝 Contributing](#-contributing)

---

## ⚡ Why Use Fastify Forge?

> **"From idea to production in under 5 minutes"** - That's the Fastify Forge promise.

### 🎯 Built for Modern Development

- **🔥 Performance First**: Fastify is [the fastest](https://www.fastify.io/benchmarks/) Node.js framework
- **⚡ Native TypeScript**: Node.js 23+ type stripping enabled - run TypeScript directly without transpilation overhead
- **📦 Monorepo Architecture**: Turborepo-powered workspace for scalable, modular development
- **🛡️ Enterprise Security**: Built-in CORS, Helmet, Rate Limiting, and Authentication with Better Auth
- **📊 Type Safety**: Full TypeScript support with runtime validation using TypeBox
- **📚 Auto Documentation**: Swagger/OpenAPI docs generated automatically with Scalar UI
- **🗃️ Database Ready**: PostgreSQL with Drizzle ORM for type-safe database operations
- **🐳 Docker Ready**: Production-ready containerization included

### 🌟 Perfect For

- **Startups** building MVPs that need to scale
- **Enterprise teams** requiring robust, maintainable APIs with shared packages
- **Full-stack developers** who want backend peace of mind
- **DevOps engineers** seeking deployment simplicity
- **Teams** needing multiple services in a single repository

---

## 🚀 Quick Start

### ⚡ One-Command Setup

Create a new project in seconds:

```bash
npx fastify-forge@latest
cd my-api
```

### 🏃‍♂️ Start Developing

```bash
# Install dependencies
pnpm install

# Start the development server with hot-reload (uses Turborepo)
pnpm dev
```

**That's it!** Your API is now running at `http://localhost:3000`

The development server leverages **Node.js 23+ native TypeScript type stripping** - no build step needed, just pure hot-reload development.

### 🎉 What You Get Instantly

- ✅ **Monorepo Structure**: Apps and packages organized with pnpm workspaces
- ✅ **Turborepo Orchestration**: Lightning-fast builds and task execution
- ✅ **API Documentation**: Visit `http://localhost:3000/docs` for beautiful Scalar UI
- ✅ **Health Check**: `GET /health` endpoint ready to use
- ✅ **Type Safety**: Full TypeScript support with import aliases
- ✅ **Authentication**: Better Auth integration with session management
- ✅ **Database**: PostgreSQL with Drizzle ORM and migrations
- ✅ **Shared Packages**: Reusable `@workspace/db`, `@workspace/env`, `@workspace/logger`

### 🔍 Test Your First Endpoint

```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

---

## 🛠️ What Makes Fastify Forge Special

### ⚡ Native TypeScript Execution

Fastify Forge leverages **Node.js 23+ native TypeScript type stripping**, allowing you to run TypeScript files directly without a build step during development:

```bash
# No transpilation needed! Just run TypeScript directly
node --watch src/server.ts
```

This means:
- **Instant startup** - no compilation wait times
- **True hot-reload** - see changes immediately
- **Simplified debugging** - debug TypeScript directly in Node.js
- **Reduced tooling complexity** - fewer build tools to configure

### 📦 Turborepo Monorepo Architecture

Built on [Turborepo](https://turbo.build/) for maximum developer productivity:

```bash
# Run tasks across all packages in parallel
pnpm build    # Builds all apps and packages with caching
pnpm test     # Tests everything in the right order
pnpm lint     # Lints all workspaces simultaneously
```

Benefits:
- **Incremental builds** - only rebuild what changed
- **Task orchestration** - run tasks in dependency order automatically
- **Remote caching** - share build artifacts across your team
- **Pipeline optimization** - parallel execution where possible

### 🛡️ Enterprise Security

```typescript
// Built-in security headers, CORS, and rate limiting
// Zero configuration required!
app.register(helmet);
app.register(cors);
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
});
```

### 📊 Type-Safe Development

```typescript
// Define your API with full type safety
const UserSchema = Type.Object({
  id: Type.String(),
  email: Type.String({ format: 'email' }),
  name: Type.String({ minLength: 1 })
});

app.post(
  '/users',
  {
    schema: {
      body: UserSchema,
      response: {
        201: UserSchema
      }
    }
  },
  async (request, reply) => {
    // request.body is fully typed!
    const user = await createUser(request.body);
    return reply.code(201).send(user);
  }
);
```

### 📚 Auto-Generated Documentation

![API Documentation](https://github.com/user-attachments/assets/0a7a7225-1914-4b53-b199-3b10c91ef65a)

Beautiful, interactive API documentation powered by Scalar, generated automatically from your TypeScript schemas.

---

## 📦 Monorepo Architecture

Fastify Forge uses a modular monorepo structure powered by **pnpm workspaces** and **Turborepo**:

```txt
fastify-forge/
├── apps/
│   └── api/                    # Main Fastify application
│       ├── src/
│       │   ├── app.ts          # Application setup & plugins
│       │   ├── server.ts       # Server entry point (runs with Node.js type stripping)
│       │   ├── auth.ts         # Better Auth configuration
│       │   ├── decorators/     # Fastify decorators
│       │   ├── plugins/
│       │   │   ├── external/   # Third-party plugins (CORS, Helmet, etc.)
│       │   │   └── internal/   # Custom business logic plugins
│       │   └── routes/
│       │       └── api/v1/     # Versioned API routes
│       ├── test/               # API tests
│       └── package.json
│
├── packages/
│   ├── db/                     # Shared database package
│   │   ├── src/
│   │   │   ├── index.ts        # Database connection & client
│   │   │   └── schema.ts       # Drizzle ORM schema
│   │   └── migrations/         # Database migrations
│   │
│   ├── env/                    # Environment configuration package
│   │   └── src/
│   │       └── index.ts        # TypeBox schema validation
│   │
│   ├── logger/                 # Logging package
│   │   └── src/
│   │       └── index.ts        # Pino logger configuration
│   │
│   ├── eslint-config/          # Shared ESLint configuration
│   └── typescript-config/      # Shared TypeScript configuration
│
├── cli/                        # Project generator CLI
├── turbo.json                  # Turborepo pipeline configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── docker-compose.yaml         # Docker development environment
```

### 🎯 Workspace Benefits

**Shared Packages:**
- **`@workspace/db`** - Database connection and schema shared across services
- **`@workspace/env`** - Centralized environment validation
- **`@workspace/logger`** - Consistent logging across all packages
- **`@workspace/eslint-config`** - Unified code style rules
- **`@workspace/typescript-config`** - Shared TypeScript compiler options

**Turborepo Tasks:**
```json
{
  "build": "Compile TypeScript in dependency order",
  "dev": "Start development servers with hot-reload",
  "test": "Run tests across all packages",
  "lint": "Check code quality everywhere",
  "clean": "Remove build artifacts from all workspaces"
}
```

### 📦 Adding New Packages

Create a new shared package:

```bash
mkdir packages/my-package
cd packages/my-package
pnpm init
```

Use it in your app:

```json
{
  "dependencies": {
    "@workspace/my-package": "workspace:*"
  }
}
```

---

## 📖 Development Guide

### 🏗️ Prerequisites

- **Node.js 23+** - Required for native TypeScript type stripping support
- **pnpm 10+** - Package manager for monorepo management
- **PostgreSQL** - Database (or use Docker Compose)

Check your Node.js version:
```bash
node --version  # Should be v23.0.0 or higher
```

### 🔧 Environment Setup

1. **Copy the environment template:**

   ```bash
   cp apps/api/.env.example apps/api/.env
   ```

2. **Configure your environment variables:**

   ```env
   # Database
   POSTGRES_HOST=localhost
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_database
   POSTGRES_PORT=5432

   # Server
   HOST=localhost
   PORT=3000
   NODE_ENV=development
   LOG_LEVEL=info

   # Better Auth
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. **Start with Docker Compose (recommended):**

   ```bash
   docker-compose up -d
   ```

4. **Run database migrations:**

   ```bash
   cd packages/db
   pnpm db:generate  # Generate migrations
   pnpm db:migrate   # Apply migrations
   ```

5. **Start development:**

   ```bash
   pnpm dev
   # ✅ Configuration validated automatically on startup
   # ✅ TypeScript runs natively without transpilation
   ```

### 🚀 Available Commands

#### Monorepo Commands (from root)

```bash
# Development
pnpm dev              # Start all apps in dev mode with hot-reload
pnpm build            # Build all apps and packages (cached by Turborepo)
pnpm start            # Start all apps in production mode

# Code Quality
pnpm lint             # Lint all workspaces
pnpm format           # Format code with Prettier
pnpm test             # Run all tests

# Maintenance
pnpm clean            # Remove all build artifacts and node_modules
pnpm syncpack:list    # Check for dependency version mismatches
pnpm syncpack:fix     # Fix dependency version mismatches
```

#### Package-Specific Commands

```bash
# From apps/api directory
cd apps/api

pnpm dev              # Start API server with hot-reload
pnpm build            # Compile TypeScript to dist/
pnpm start            # Run production build
pnpm test             # Run tests with 100% coverage threshold
pnpm lint             # Lint this package only
```

#### Database Commands

```bash
# From packages/db directory
cd packages/db

pnpm db:generate      # Generate migration files from schema
pnpm db:migrate       # Apply migrations to database
pnpm db:push          # Push schema changes directly (dev only)
pnpm db:studio        # Open Drizzle Studio (database GUI)
```

### 🛣️ Adding New Routes

Create a new route file in `apps/api/src/routes/`:

```typescript
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' })
});

const usersRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.route({
    url: '/users',
    method: 'GET',
    schema: {
      tags: ['Users'],
      response: {
        200: Type.Array(UserSchema)
      }
    },
    handler: async () => {
      return [{ id: '1', name: 'John Doe', email: 'john@example.com' }];
    }
  });
};

export default usersRoute;
```

Routes are auto-loaded by `@fastify/autoload` - just create the file and it's available!

### 🔌 Creating Custom Plugins

Add custom functionality in `apps/api/src/plugins/internal/`:

```typescript
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const myPlugin: FastifyPluginAsync = async (app) => {
  app.decorate('myUtility', () => {
    return 'Hello from my plugin!';
  });
};

export default fp(myPlugin, {
  name: 'my-plugin'
});
```

### 🗃️ Database Operations

Using Drizzle ORM for type-safe database operations:

```typescript
import { eq } from 'drizzle-orm';
import { users } from '@workspace/db/schema';

// In your route handler
const getUsers = async () => {
  return await app.db.select().from(users);
};

const getUserById = async (id: string) => {
  return await app.db.select().from(users).where(eq(users.id, id));
};

const createUser = async (data: NewUser) => {
  return await app.db.insert(users).values(data).returning();
};
```

### 📦 Working with Shared Packages

Import from workspace packages using the `@workspace/` alias:

```typescript
import { logger } from '@workspace/logger';
import env from '@workspace/env';
import { db } from '@workspace/db';

logger.info('Using shared logger');
console.log('Port:', env.PORT);
const users = await db.select().from(users);
```

### 🎯 Import Aliases

Use import aliases for cleaner imports within packages:

```typescript
// In apps/api/src/**/*.ts
import { buildApp } from '#src/app';
import type { MyType } from '#src/types';
```

---

## 🎯 Real-World Examples

### 🔐 Protected Route with Authentication

```typescript
import { getAuthInstance } from '#src/auth';
import { fromNodeHeaders } from 'better-auth';

const protectedRoute: FastifyPluginAsyncTypebox = async (app) => {
  // Apply authentication hook to all routes in this plugin
  app.addHook('onRequest', async (req, res) => {
    const session = await getAuthInstance(app).api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    
    if (!session?.user) {
      return res.unauthorized('You must be logged in');
    }
    
    req.setDecorator('session', session);
  });

  app.route({
    url: '/profile',
    method: 'GET',
    schema: {
      tags: ['User'],
      security: [{ cookieAuth: [] }]
    },
    handler: async (request) => {
      // request.session is available after authentication
      return { user: request.session.user };
    }
  });
};
```

### 📤 File Upload Endpoint

```typescript
const uploadRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.route({
    url: '/upload',
    method: 'POST',
    schema: {
      tags: ['Files'],
      consumes: ['multipart/form-data']
    },
    handler: async (request, reply) => {
      const data = await request.file();

      if (!data) {
        return reply.badRequest('No file uploaded');
      }

      // Process the file...
      return { filename: data.filename, size: data.file.readableLength };
    }
  });
};
```

### 🔍 Database Integration Example

```typescript
import { posts } from '@workspace/db/schema';

const postsRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.route({
    url: '/posts',
    method: 'POST',
    schema: {
      tags: ['Posts'],
      body: Type.Object({
        title: Type.String({ minLength: 1 }),
        content: Type.String({ minLength: 1 })
      }),
      response: {
        201: Type.Object({
          id: Type.String(),
          title: Type.String(),
          content: Type.String(),
          createdAt: Type.String()
        })
      }
    },
    handler: async (request, reply) => {
      const { title, content } = request.body;

      const [post] = await app.db
        .insert(posts)
        .values({
          title,
          content,
          authorId: request.session.user.id
        })
        .returning();

      return reply.code(201).send(post);
    }
  });
};
```

### 🔄 Creating a Shared Service Package

```typescript
// packages/email/src/index.ts
export class EmailService {
  async send(to: string, subject: string, body: string) {
    // Implementation
  }
}

// apps/api/src/routes/notifications.ts
import { EmailService } from '@workspace/email';

const notificationRoute: FastifyPluginAsyncTypebox = async (app) => {
  const emailService = new EmailService();
  
  app.route({
    url: '/send-notification',
    method: 'POST',
    handler: async (request) => {
      await emailService.send(
        request.body.email,
        'Notification',
        request.body.message
      );
      return { success: true };
    }
  });
};
```

---

## 🚢 Production Deployment

### 🐳 Docker Deployment

The monorepo includes production-ready Docker configuration:

```bash
# Build the API image
cd apps/api
docker build -t my-api .

# Or use docker-compose for full stack
docker-compose -f docker-compose.prod.yaml up -d
```

The production build uses compiled TypeScript from `dist/` for optimal performance.

### ☁️ Turborepo Remote Caching

Enable remote caching to speed up builds in CI/CD:

```bash
# Link to Vercel for remote caching
npx turbo login
npx turbo link
```

Now all builds are cached and shared across your team and CI pipeline.

### ⚡ Build Optimization

```bash
# Build everything with Turborepo caching
pnpm build

# Only changed packages will rebuild
pnpm build --filter=api  # Build only the API app
```

### ☁️ Cloud Deployment Options

**Vercel (API Routes):**
```bash
pnpm build
vercel deploy
```

**Docker on AWS/GCP/Azure:**
- Use multi-stage Dockerfile in `apps/api/`
- Configure environment variables
- Set health check endpoint: `/health`
- Enable container orchestration (ECS, Cloud Run, AKS)

**Kubernetes:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fastify-api
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: my-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
```

### 🔍 Production Checklist

- [ ] Node.js 23+ installed on production servers
- [ ] Environment variables configured (use secrets management)
- [ ] Database migrations applied
- [ ] SSL/TLS certificates in place
- [ ] Rate limiting tuned for production load
- [ ] Monitoring and logging configured (APM tools)
- [ ] Health checks responding on `/health`
- [ ] Load balancer configured with sticky sessions (for auth)
- [ ] Turborepo remote cache enabled for faster builds
- [ ] Database connection pooling configured

---

## 🧪 Testing & Quality Assurance

### 🚀 Running Tests

```bash
# Run all tests across the monorepo
pnpm test

# Run tests for a specific package
pnpm --filter api test

# Run tests with coverage (100% threshold)
cd apps/api
pnpm test:lcov

# Run linting across all packages
pnpm lint
```

### 🧬 Test Architecture

Tests are co-located with source code using Node.js native test runner:

```txt
apps/api/
├── src/
│   └── routes/
│       └── users.ts
└── test/
    └── routes/
        └── users.test.ts
```

Example test:

```typescript
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '#src/app';

describe('Users API', () => {
  it('should return users list', async () => {
    const app = await buildApp();
    
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/users'
    });
    
    assert.strictEqual(response.statusCode, 200);
    await app.close();
  });
});
```

### 📊 Test Coverage

Fastify Forge enforces 100% test coverage using c8:

```json
{
  "scripts": {
    "test": "c8 --100 node --test test/**/*.test.ts"
  }
}
```

Coverage report is generated in `coverage/` directory.

### 🧹 Code Quality Tools

- **ESLint**: Catch code issues with Neostandard presets
- **Prettier**: Consistent code formatting
- **TypeScript**: Type checking with `tsc --noEmit`
- **Husky**: Pre-commit hooks for quality gates
- **lint-staged**: Only lint changed files
- **Commitlint**: Conventional commit messages

### 🔄 CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '23'
          
      - uses: pnpm/action-setup@v4
        with:
          version: 10
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build  # Turborepo cache works in CI
        
      - name: Lint
        run: pnpm lint
        
      - name: Test
        run: pnpm test
```

---

## 🔧 Advanced Configuration

### 🎛️ Turborepo Configuration

Customize build pipeline in `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**"],   // Cache these outputs
      "inputs": ["src/**", "package.json"]
    },
    "dev": {
      "cache": false,          // Don't cache dev server
      "persistent": true       // Keep running
    }
  }
}
```

### 🎯 TypeScript Configuration

Shared TypeScript config in `packages/typescript-config/`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

Extend it in your packages:

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

### 🎛️ Custom Environment Variables

Extend `packages/env/src/index.ts`:

```typescript
import { Type, Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const EnvSchema = Type.Object({
  // Existing variables...
  REDIS_URL: Type.String(),
  SMTP_HOST: Type.String(),
  JWT_SECRET: Type.String({ minLength: 32 }),
  API_RATE_LIMIT: Type.Number({ default: 100 })
});

export type Env = Static<typeof EnvSchema>;

const env = Value.Decode(EnvSchema, process.env);
export default env;
```

### 🔌 Plugin Customization

Modify plugin settings in `apps/api/src/app.ts`:

```typescript
// Custom rate limiting per environment
await app.register(rateLimit, {
  max: env.NODE_ENV === 'production' ? 100 : 1000,
  timeWindow: '1 minute',
  keyGenerator: (request) => request.ip,
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.after}`
    };
  }
});
```

### 📊 Logger Configuration

Customize logger in `packages/logger/src/index.ts`:

```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname'
          }
        }
      : undefined,
  // Production: JSON logs for log aggregation
  timestamp: () => `,"time":"${new Date().toISOString()}"`
});
```

### 🗄️ Database Connection Pooling

Configure in `packages/db/src/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import env from '@workspace/env';

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  max: env.NODE_ENV === 'production' ? 20 : 10,  // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);
```

### 📦 pnpm Catalogs

Manage shared dependency versions in `pnpm-workspace.yaml`:

```yaml
catalog:
  fastify: ^5.5.0
  typescript: ^5.9.2
  drizzle-orm: ^0.44.5
  
packages:
  - "apps/*"
  - "packages/*"
```

Then use in package.json:

```json
{
  "dependencies": {
    "fastify": "catalog:"
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports

1. Check existing issues first
2. Provide detailed reproduction steps
3. Include environment information (Node.js version, OS, etc.)
4. Share relevant logs or error messages

### 💡 Feature Requests

1. Open an issue with the `enhancement` label
2. Describe the use case and benefits
3. Consider implementation approaches
4. Discuss how it fits the monorepo architecture

### 🔧 Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the code style
4. Run tests: `pnpm test`
5. Run linting: `pnpm lint`
6. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request with clear description

### 📝 Development Setup

```bash
# Clone the repo
git clone https://github.com/flaviodelgrosso/fastify-forge.git
cd fastify-forge

# Install dependencies (monorepo)
pnpm install

# Start development (all apps and packages)
pnpm dev

# Run tests
pnpm test

# Build everything
pnpm build
```

### 🎯 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 🧪 Adding Tests

All new features must include tests:

```typescript
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('My Feature', () => {
  it('should work correctly', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Fastify Team](https://fastify.dev/) for the amazing framework
- [Turborepo](https://turbo.build/) for monorepo orchestration
- [TypeBox](https://github.com/sinclairzx81/typebox) for type-safe schemas
- [Drizzle Team](https://orm.drizzle.team/) for the excellent ORM
- [Better Auth](https://www.better-auth.com/) for modern authentication
- All the [contributors](https://github.com/flaviodelgrosso/fastify-forge/graphs/contributors) who make this project better

---

## 🚀 What's New in v2.0

### Major Changes

- **🏗️ Monorepo Architecture**: Refactored to Turborepo-powered monorepo with pnpm workspaces
- **⚡ Native TypeScript**: Node.js 23+ type stripping support - run TypeScript without build steps
- **📦 Shared Packages**: Modular architecture with `@workspace/db`, `@workspace/env`, `@workspace/logger`
- **🚀 Better Auth**: Upgraded to Better Auth for modern session-based authentication
- **📚 Scalar UI**: Beautiful API documentation with Scalar instead of Swagger UI
- **🗃️ Enhanced Database**: Full Drizzle ORM integration with migrations and schema management
- **⚡ Turborepo**: Lightning-fast builds with intelligent caching and task orchestration

### Migration from v1.x

If upgrading from v1.x, key changes include:

1. Project structure moved to `apps/api/` instead of root
2. Shared packages available in `packages/`
3. Scripts now use Turborepo (e.g., `pnpm build` runs across all packages)
4. Node.js 23+ required for type stripping support
5. Better Auth replaces previous auth implementation

---

**Ready to forge your next API?** 🔥

```bash
npx fastify-forge@latest
```

Built with ❤️ using Node.js 23+, Turborepo, and Fastify

Happy coding! 🚀
