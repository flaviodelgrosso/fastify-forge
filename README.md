# ⚡ Fastify Forge ⚡

[![downloads](https://img.shields.io/npm/dt/fastify-forge)](https://www.npmjs.com/package/fastify-forge)
[![npm](https://img.shields.io/npm/v/fastify-forge)](https://www.npmjs.com/package/fastify-forge)
[![license](https://img.shields.io/github/license/flaviodelgrosso/fastify-forge)](https://img.shields.io/github/license/flaviodelgrosso/fastify-forge)
[![CI](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml)

_Fastify Forge_ empowers developers to build **lightning-fast**, **enterprise-grade** REST APIs with zero configuration overhead. Powered by [Fastify](https://fastify.dev/), the best framework in the town for Node.js, TypeScript and battle-tested plugins, this isn't just another boilerplate—it's your secret weapon for backend development.

**Quick Navigation:** [🚀 Quick Start](#quick-start) • [📖 Features](#what-makes-fastify-forge-special) • [🛠️ Development Guide](#development-guide) • [🎯 Examples](#real-world-examples)

## Table of Contents

- [⚡ Why Use Fastify Forge?](#-why-use-fastify-forge)
- [🚀 Quick Start](#-quick-start)
- [🛠️ What Makes Fastify Forge Special](#️-what-makes-fastify-forge-special)
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

- **🔥 Performance First**: Fastify is [the fastest](https://www.fastify.io/benchmarks/) Node.js frameworks
- **🛡️ Enterprise Security**: Built-in CORS, Helmet, Rate Limiting, and Authentication
- **📊 Type Safety**: Full TypeScript support with runtime validation using TypeBox
- **📚 Auto Documentation**: Swagger/OpenAPI docs generated automatically
- **⚙️ Zero Config**: Works out of the box, customize when you need to
- **🐳 Docker Ready**: Production-ready containerization included

### 🌟 Perfect For

- **Startups** building MVPs that need to scale
- **Enterprise teams** requiring robust, maintainable APIs
- **Full-stack developers** who want backend peace of mind
- **DevOps engineers** seeking deployment simplicity

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

# Start the development server with hot-reload
pnpm dev
```

**That's it!** Your API is now running at `http://localhost:3000`

### 🎉 What You Get Instantly

- ✅ **API Documentation**: Visit `http://localhost:3000/documentation`
- ✅ **Health Check**: `GET /health` endpoint ready to use
- ✅ **Type Safety**: Full TypeScript support with auto-completion
- ✅ **Authentication**: Auth system ready to configure
- ✅ **Database**: PostgreSQL integration with Drizzle ORM

### 🔍 Test Your First Endpoint

```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

---

## 🛠️ What Makes Fastify Forge Special

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

Beautiful, interactive API documentation generated automatically from your TypeScript schemas

### 🔧 Developer Experience

- **Hot Reload**: Instant development feedback
- **ESLint + Prettier**: Code quality enforced
- **Husky**: Pre-commit hooks for consistency
- **Jest**: Comprehensive testing setup
- **PM2**: Production process management

## 📖 Development Guide

### 🏗️ Project Structure

```txt
fastify-forge/
├── src/
│   ├── app.ts              # Application setup & plugins
│   ├── server.ts           # Server entry point
│   ├── auth.ts             # Authentication logic
│   ├── config/
│   │   └── env.config.ts   # Environment configuration
│   ├── db/
│   │   ├── index.ts        # Database connection
│   │   └── schema.ts       # Database schema
│   ├── plugins/
│   │   ├── external/       # Third-party plugins
│   │   └── internal/       # Custom plugins
│   └── routes/
│       ├── health.ts       # Health check endpoint
│       └── api/v1/         # Versioned API routes
├── test/                   # Test files
├── docker-compose.yml      # Docker setup
└── process.yml             # PM2 configuration
```

### 🔧 Environment Setup

1. **Copy the environment template:**

   ```bash
   cp .env.example .env
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
   ```

3. **Validate configuration:**

   ```bash
   pnpm dev
   # ✅ Configuration validated automatically on startup
   ```

### 🛣️ Adding New Routes

Create a new route file in `src/routes/`:

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

### 🔌 Creating Custom Plugins

Add custom functionality in `src/plugins/internal/`:

```typescript
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const myPlugin: FastifyPluginAsync = async (app) => {
  app.decorate('myUtility', () => {
    return 'Hello from my plugin!';
  });
};

export default fp(myPlugin);
```

### 🗃️ Database Operations

Using Drizzle ORM for type-safe database operations:

```typescript
import { eq } from 'drizzle-orm';
import { users } from '../db/schema.js';

// In your route handler
const getUsers = async () => {
  return await app.db.select().from(users);
};

const getUserById = async (id: string) => {
  return await app.db.select().from(users).where(eq(users.id, id));
};
```

---

## 🎯 Real-World Examples

### 🔐 Protected Route with Authentication

```typescript
const protectedRoute: FastifyPluginAsyncTypebox = async (app) => {
  // Apply authentication hook to all routes in this plugin
  app.addHook('preHandler', app.authenticate);

  app.route({
    url: '/profile',
    method: 'GET',
    schema: {
      tags: ['User'],
      security: [{ bearerAuth: [] }]
    },
    handler: async (request) => {
      // request.user is available after authentication
      return { user: request.user };
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
          authorId: request.user.id
        })
        .returning();

      return reply.code(201).send(post);
    }
  });
};
```

---

## 🚢 Production Deployment

### 🐳 Docker Deployment

```bash
# Build the image
docker build -t my-api .

# Run with docker-compose
docker-compose up -d
```

### ⚡ PM2 Deployment

```bash
# Build for production
pnpm build

# Start with PM2
pnpm pm2

# Monitor processes
pm2 monit
```

### ☁️ Cloud Deployment

**Vercel/Netlify:**

```bash
pnpm build
# Deploy the `dist` folder
```

**AWS/GCP/Azure:**

- Use the included `Dockerfile`
- Set environment variables
- Configure health checks on `/health`

### 🔍 Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL/TLS certificates in place
- [ ] Rate limiting configured
- [ ] Monitoring and logging set up
- [ ] Health checks responding
- [ ] Load balancer configured (if needed)

---

## 🧪 Testing & Quality Assurance

### 🚀 Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage report
pnpm test:lcov

# Run linting
pnpm lint
```

### 📊 Test Coverage

Fastify Forge aims for 100% test coverage. The test setup includes:

- **Unit Tests**: Individual function testing
- **Integration Tests**: Route and plugin testing
- **E2E Tests**: Full application flow testing

### 🧹 Code Quality Tools

- **ESLint**: Catch code issues early powered by [Neostandard](https://npmjs.com/package/neostandard)
- **Husky**: Pre-commit hooks
- **Commitlint**: Conventional commit messages

---

## 🔧 Advanced Configuration

### 🎛️ Custom Environment Variables

Extend `src/config/env.config.ts`:

```typescript
const schema = Type.Object({
  // Existing variables...
  REDIS_URL: Type.String(),
  SMTP_HOST: Type.String(),
  JWT_SECRET: Type.String({ minLength: 32 }),
  API_RATE_LIMIT: Type.Number({ default: 100 })
});
```

### 🔌 Plugin Customization

Modify plugin settings in `src/app.ts`:

```typescript
// Custom rate limiting
await app.register(rateLimit, {
  max: env.API_RATE_LIMIT,
  timeWindow: '1 minute',
  keyGenerator: (request) => request.ip
});
```

### 📊 Logging Configuration

```typescript
const server = Fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport:
      env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: { colorize: true }
          }
        : undefined
  }
});
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports

1. Check existing issues first
2. Provide detailed reproduction steps
3. Include environment information

### 💡 Feature Requests

1. Open an issue with the `enhancement` label
2. Describe the use case and benefits
3. Consider implementation approaches

### 🔧 Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 📝 Development Setup

```bash
# Clone the repo
git clone https://github.com/flaviodelgrosso/fastify-forge.git
cd fastify-forge

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Fastify Team](https://fastify.dev/) for the amazing framework
- [TypeBox](https://github.com/sinclairzx81/typebox) for type-safe schemas
- All the [contributors](https://github.com/flaviodelgrosso/fastify-forge/graphs/contributors) who make this project better

---

**Ready to forge your next API?** 🔥

```bash
npx fastify-forge@latest
```

Happy coding! 🚀
