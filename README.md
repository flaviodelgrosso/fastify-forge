
# 🛡️ Fastify Forge 🛡️

[![CI](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml)

Typescript based REST API lite boilerplate using [Fastify](https://fastify.dev/) framework.

## Installation

Clone the repo using:

```sh
npx fastify-forge
```

## Features

### Plugins

- [x] Autoload fastify plugins with [@fastify/autoload](https://www.npmjs.com/package/@fastify/autoload)
- [x] Security headers with [@fastify/helmet](https://www.npmjs.com/package/@fastify/helmet)
- [x] CORS with [@fastify/cors](https://www.npmjs.com/package/@fastify/cors)
- [x] [@fastify/rate-limit](https://www.npmjs.com/package/@fastify/rate-limit) for rate limiting requests and preventing attackers to search for valid URLs.
- [x] Process load measuring with [@fastify/under-pressure](https://www.npmjs.com/package/@fastify/under-pressure)
- [x] Fastify multipart for file uploads with [@fastify/multipart](https://www.npmjs.com/package/@fastify/multipart)
- [x] [fastify-better-auth](https://www.npmjs.com/package/fastify-better-auth) plugin for seamless authentication implementation using [better-auth](https://www.npmjs.com/package/better-auth)
  
### Swagger

- [x] Swagger with [@fastify/swagger](https://www.npmjs.com/package/@fastify/swagger)
- [x] Beautiful OpenAPI UI with [@scalar/fastify-api-reference](https://www.npmjs.com/package/@scalar/fastify-api-reference)

![Swagger](https://github.com/user-attachments/assets/0a7a7225-1914-4b53-b199-3b10c91ef65a)

### Type Safety and Schemas

- [x] JSON Schema builder with [TypeBox](https://www.npmjs.com/package/@sinclair/typebox)
- [x] Enhanced support for TypeBox with [@fastify/type-provider-typebox](https://www.npmjs.com/package/@fastify/type-provider-typebox)

### Environment

- [x] Environment utility checker with [env-schema](https://www.npmjs.com/package/env-schema)

### Configurations

#### Linting and Formatting

- The project uses [biome](https://biomejs.dev/) to lint and format the codebase.
- Enforce commit message conventions with [commitlint](https://www.npmjs.com/package/@commitlint/cli).

#### Git Hooks

- [husky](https://www.npmjs.com/package/husky) is used to manage git hooks.

#### PM2

- [pm2](https://www.npmjs.com/package/pm2) is a process manager that provides a simple way to run the server in cluster mode with built-in load balancing feature. You can edit the `process.yml` file to customize the app configuration.

## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`pnpm install`

### 2. Start the Fastify server

Running development server is pretty straightforward. It uses just Node.js with the latest TypeScript configuration support. You need Node v23.x, check `tsconfig.json` for details. Just run the following command in watch mode:

```sh
pnpm dev
```

## 🚀 Building

To generate a production build, the project uses [tsup](https://github.com/egoist/tsup). Build server with command:

```sh
pnpm build
```

## 🧪 Testing

To run tests, use the following command. It will produce a coverage report as well using `c8`.

```sh
pnpm test
```
