# 🛡️ Fastify Forge 🛡️

[![CI](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/flaviodelgrosso/fastify-forge/actions/workflows/ci.yaml)

Typescript based REST API lite boilerplate using [Fastify](https://fastify.dev/) framework.

## Features

### Plugins

- [x] Autoload fastify plugins with [@fastify/autoload](https://www.npmjs.com/package/@fastify/autoload)
- [x] Security headers with [@fastify/helmet](https://www.npmjs.com/package/@fastify/helmet)
- [x] CORS with [@fastify/cors](https://www.npmjs.com/package/@fastify/cors)

### Type Safety and Schemas

- [x] JSON Schema builder with [TypeBox](https://www.npmjs.com/package/@sinclair/typebox)
- [x] Enhanced support for TypeBox with [@fastify/type-provider-typebox](https://www.npmjs.com/package/@fastify/type-provider-typebox)

### Swagger

- [x] Swagger with [@fastify/swagger](https://www.npmjs.com/package/@fastify/swagger)
- [x] Swagger UI with [@fastify/swagger-ui](https://www.npmjs.com/package/@fastify/swagger-ui)

![swagger-ui](https://github.com/user-attachments/assets/18f84260-358d-4f80-ac71-34c0c124908a)

### Environment

- [x] Environment variables with [dotenv](https://www.npmjs.com/package/dotenv)
- [x] Environment variables validation with [joi](https://www.npmjs.com/package/joi)

## Linting and Formatting

- [x] The project uses [biome](https://biomejs.dev/) to lint and format the codebase.

## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`pnpm install`

### 2. Start the Fastify server

Running development server is pretty straightforward. It uses [tsx](https://www.npmjs.com/package/tsx), the easiest way to run Typescript in Node.js. Just run the following command in watch mode:

```sh
pnpm dev
```

## 🚀 Building

To generate a production build, the project uses [tsup](https://github.com/egoist/tsup). Build server with command:

```sh
pnpm build
```

## 🧪 Testing

To run tests, the project uses [borp](https://www.npmjs.com/package/borp) that is a typescript-aware test runner for Node.js built-in testing library. It also supports `c8` coverage. Borp is very usefull if you want avoid struggling with loaders and false positives uncovered code.

```sh
pnpm test
```
