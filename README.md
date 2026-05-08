<div align="center">

# ⚡ Fastify Forge

**A production-ready Fastify monorepo template — scaffold, build, and ship high-performance Node.js APIs in seconds.**

[![npm version](https://img.shields.io/npm/v/fastify-forge?style=flat-square&color=orange)](https://www.npmjs.com/package/fastify-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10-orange?style=flat-square&logo=pnpm)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Fastify](https://img.shields.io/badge/Fastify-5.x-black?style=flat-square&logo=fastify)](https://fastify.dev)

</div>

---

## Why Fastify Forge?

Starting a new Node.js API project means wiring up the same boilerplate every time — auth, validation, logging, CORS, rate-limiting, OpenAPI docs, database migrations… **Fastify Forge ships all of it, pre-configured and production-grade, in a single `npx` command.**

Built on [Fastify 5](https://fastify.dev) — one of the fastest HTTP frameworks for Node.js — and organised as an [Nx](https://nx.dev) monorepo, the template gives you a clean, scalable foundation you can grow into without ever fighting the scaffolding again.

---

## ✨ Features

| Category                 | What's included                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| 🚀 **Performance**       | Fastify 5 + Pino structured logging + `@fastify/under-pressure` overload protection                                    |
| 🔐 **Authentication**    | [Better Auth](https://www.better-auth.com) with email/password, admin plugin, session caching & cookie management      |
| 🗄️ **Database**          | [Drizzle ORM](https://orm.drizzle.team) + PostgreSQL 17 with pre-built `users`, `sessions` & `accounts` schema         |
| ✅ **Validation**        | End-to-end type-safe schemas via [TypeBox](https://github.com/sinclairzx81/typebox) + `@fastify/type-provider-typebox` |
| 📖 **OpenAPI**           | Swagger UI at `/docs` + Better Auth's OpenAPI integration, auto-generated from route schemas                           |
| 🛡️ **Security**          | `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit` (with 404-route scan protection)                             |
| 📁 **Auto-loading**      | Plugin & route discovery via `@fastify/autoload` — drop a file, it's registered                                        |
| 🪝 **Route Hooks**       | Cascading `auth.hook.ts` pattern keeps authentication logic out of route handlers                                      |
| ⚙️ **Config**            | Type-safe environment variables via `@fastify/env` + TypeBox schema                                                    |
| 🐳 **Docker**            | PostgreSQL 17 via `docker-compose.yaml` with health checks and persistent volumes                                      |
| 🔄 **Graceful shutdown** | `close-with-grace` ensures in-flight requests complete before the server exits                                         |
| 🏗️ **Monorepo**          | [Nx](https://nx.dev) workspace with affected-only CI, build caching, and Docker targets                                |
| 🎨 **DX**                | Husky, commitlint (Conventional Commits), Prettier, ESLint 9 flat config, Changesets, syncpack                         |
| 🛠️ **CLI**               | Interactive scaffolder — `npx fastify-forge` to clone, configure, and initialise a new project                         |

---

## 📦 Tech Stack

<div align="center">

| Layer           | Technology         |
| --------------- | ------------------ |
| Runtime         | Node.js ≥ 24       |
| Framework       | Fastify 5          |
| Language        | TypeScript 5       |
| ORM             | Drizzle ORM        |
| Database        | PostgreSQL 17      |
| Auth            | Better Auth        |
| Logging         | Pino + pino-pretty |
| Validation      | TypeBox            |
| Monorepo        | Nx                 |
| Package manager | pnpm 10            |

</div>

---

## 🚀 Quick Start

### Option A — CLI scaffolder (recommended)

```bash
npx fastify-forge --name my-api
```

The interactive CLI will:

1. Clone the template into `./my-api`
2. Strip git history and set up a fresh repo
3. Copy `.env.example` → `.env`
4. Optionally initialise git and install dependencies

### Option B — Clone manually

```bash
git clone https://github.com/flaviodelgrosso/fastify-forge.git my-api
cd my-api
pnpm install
```

---

## 🏁 Getting Started

### 1. Configure environment variables

Copy the example file and fill in your values:

```bash
cp apps/api/.env.example apps/api/.env
```

| Variable             | Description                                                        | Default     |
| -------------------- | ------------------------------------------------------------------ | ----------- |
| `HOST`               | Server bind address                                                | `localhost` |
| `PORT`               | Server port                                                        | `8080`      |
| `LOG_LEVEL`          | Pino log level (`trace` \| `debug` \| `info` \| `warn` \| `error`) | `info`      |
| `POSTGRES_HOST`      | PostgreSQL host                                                    | —           |
| `POSTGRES_PORT`      | PostgreSQL port                                                    | `5432`      |
| `POSTGRES_USER`      | PostgreSQL user                                                    | —           |
| `POSTGRES_PASSWORD`  | PostgreSQL password                                                | —           |
| `POSTGRES_DB`        | PostgreSQL database name                                           | —           |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth (min 32 chars)                          | —           |

### 2. Start the database

```bash
docker compose up -d
```

### 3. Run database migrations

```bash
pnpm --filter @fastify-forge/db db:push
```

### 4. Start the development server

```bash
pnpm start
```

The API is now running at `http://localhost:8080` 🎉

---

## 📁 Project Structure

```
fastify-forge/
├── apps/
│   └── api/                    # Main Fastify application
│       └── src/
│           ├── main.ts         # Server entry point & graceful shutdown
│           ├── app.ts          # Plugin & route registration, error handlers
│           ├── auth.ts         # Better Auth configuration
│           ├── plugins/
│           │   ├── external/   # Third-party Fastify plugins
│           │   │   ├── cors.ts
│           │   │   ├── env.ts          # Type-safe env schema
│           │   │   ├── helmet.ts
│           │   │   ├── multipart.ts
│           │   │   ├── rate-limit.ts
│           │   │   ├── sensible.ts
│           │   │   ├── swagger.ts      # OpenAPI + Swagger UI
│           │   │   └── under-pressure.ts
│           │   └── internal/   # App-specific plugins
│           │       ├── authentication.ts   # Better Auth plugin
│           │       └── db.ts               # Drizzle connection
│           └── routes/
│               ├── health.ts           # GET /health
│               ├── root.route.ts       # Root route
│               └── api/
│                   ├── auth.hook.ts    # Session guard (cascades to child routes)
│                   └── v1/
│                       └── protected.ts    # Example protected endpoint
│
├── packages/
│   ├── db/                     # @fastify-forge/db — Drizzle client & schema
│   │   └── src/
│   │       ├── index.ts        # Drizzle client export
│   │       └── schema.ts       # users, sessions, accounts tables
│   └── logger/                 # @fastify-forge/logger — Pino logger instance
│       └── src/
│           └── index.ts
│
├── cli/                        # npx fastify-forge scaffolder
├── docker-compose.yaml         # PostgreSQL 17 service
├── nx.json                     # Nx workspace configuration
├── pnpm-workspace.yaml         # pnpm catalogs & workspace config
└── eslint.config.js            # ESLint 9 flat config
```

---

## 🔌 Plugins at a Glance

Plugins are auto-discovered from the `plugins/` directory via `@fastify/autoload`. Adding a new plugin is as simple as dropping a file:

```ts
// apps/api/src/plugins/external/my-plugin.ts
import fp from 'fastify-plugin';
import myPlugin from 'fastify-my-plugin';

export default fp(async (fastify) => {
  await fastify.register(myPlugin, {
    /* options */
  });
});
```

### Route hooks & authentication

The `auth.hook.ts` file lives next to the `api/` route folder and cascades down to every child route automatically. Any route placed inside `api/` is protected by session validation — no extra wiring needed.

```
routes/
└── api/
    ├── auth.hook.ts   ← runs for all routes below this directory
    └── v1/
        └── protected.ts   ← session already validated ✓
```

---

## 🗄️ Database

The `@fastify-forge/db` package exports a ready-to-use Drizzle ORM client and a starter schema:

- **`users`** — id, email, name, role (`admin` | `user`), image, ban management, timestamps
- **`sessions`** — token, expiry, user agent, IP address, impersonation support
- **`accounts`** — OAuth provider accounts with access/refresh token storage

### Useful database commands

```bash
# Generate a new migration
pnpm --filter @fastify-forge/db db:generate

# Push schema to database (dev)
pnpm --filter @fastify-forge/db db:push

# Open Drizzle Studio
pnpm --filter @fastify-forge/db db:studio
```

---

## 🔐 Authentication

Authentication is powered by [Better Auth](https://www.better-auth.com) with the following setup out of the box:

- **Email & password** sign-up / sign-in
- **Session caching** (5-minute cookie cache) to reduce database hits
- **Admin plugin** for user management endpoints
- **OpenAPI integration** — auth routes appear in the Swagger UI at `/docs`
- **1-week session expiry** with daily refresh

```ts
// Sign in — POST /api/auth/sign-in/email
{
  "email": "user@example.com",
  "password": "supersecret"
}
```

---

## 📖 API Documentation

Swagger UI is served at **`/docs`** and is automatically populated from TypeBox schemas on your route definitions. Add a `schema` to any route and it appears instantly:

```ts
app.route({
  url: '/users/:id',
  method: 'GET',
  schema: {
    tags: ['Users'],
    params: Type.Object({ id: Type.String({ format: 'uuid' }) }),
    response: { 200: UserSchema }
  },
  handler: async (req) => getUserById(req.params.id)
});
```

---

## 📜 Available Scripts

Run these from the workspace root:

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm start`     | Start all apps in parallel                    |
| `pnpm build`     | Build all packages and apps                   |
| `pnpm lint`      | Lint all projects                             |
| `pnpm typecheck` | Type-check all projects                       |
| `pnpm test`      | Run all tests                                 |
| `pnpm format`    | Format all files with Prettier                |
| `pnpm clean`     | Remove all build artifacts and `node_modules` |

Nx only re-runs tasks for projects affected by your changes, keeping feedback loops fast.

---

## 🛠️ CLI Reference

```bash
npx fastify-forge [options]
```

| Flag            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `--name <name>` | Project name / directory (prompted interactively if omitted) |
| `--no-git`      | Skip git repository initialisation                           |

---

## 🤝 Contributing

Contributions are welcome! Please follow [Conventional Commits](https://www.conventionalcommits.org) for commit messages — the commit-lint hook will remind you.

```bash
# Fork & clone your fork
git clone https://github.com/<your-handle>/fastify-forge.git
cd fastify-forge
pnpm install

# Create a feature branch
git checkout -b feat/my-awesome-feature

# Make your changes, then open a PR 🚀
```

Releases are managed via [Changesets](https://github.com/changesets/changesets). If your PR includes a user-facing change, add a changeset:

```bash
pnpm changeset
```

---

## 📄 License

MIT © [Flavio Del Grosso](https://github.com/flaviodelgrosso)

---

<div align="center">

**[⭐ Star on GitHub](https://github.com/flaviodelgrosso/fastify-forge)** · **[📦 npm](https://www.npmjs.com/package/fastify-forge)** · **[🐛 Report a bug](https://github.com/flaviodelgrosso/fastify-forge/issues)**

</div>
