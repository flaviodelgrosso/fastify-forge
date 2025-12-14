# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v2.2.2...v2.2.3) (2025-12-14)


### Bug Fixes

* improve error handler check on FST_ERR_BAD_STATUS_CODE instance ([9e731b0](https://github.com/flaviodelgrosso/fastify-forge/commit/9e731b0f74a66c2219bb6caad1a69436625516eb))

### [2.2.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v2.2.1...v2.2.2) (2025-12-13)

### [2.2.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v2.2.0...v2.2.1) (2025-10-14)


### Bug Fixes

* add node conditions flag in dev script for correct resolution ([015d6cd](https://github.com/flaviodelgrosso/fastify-forge/commit/015d6cd6d6c42033e766588b4bf77059e0fe5d0b))

## [2.2.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v2.1.0...v2.2.0) (2025-10-14)


### Features

* add @fastify/env plugin ([2283e54](https://github.com/flaviodelgrosso/fastify-forge/commit/2283e545cad0137b73b53560637abfef72063f89))


### Bug Fixes

* imports fields in api and root package.json files ([d15bfbc](https://github.com/flaviodelgrosso/fastify-forge/commit/d15bfbcb23b706a7fb9ee2cd8c30a14da79c2c4d))

## [2.1.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v2.0.0...v2.1.0) (2025-10-12)


### Features

* add timeouts options ([86b5afa](https://github.com/flaviodelgrosso/fastify-forge/commit/86b5afabe4b1a0e11451f4126c3ca154ebee059d))


### Bug Fixes

* swagger plugin ([cca35d6](https://github.com/flaviodelgrosso/fastify-forge/commit/cca35d69eb032d29c1aaa703b522574aa34dce05))


### Documentation

* update README.md ([7779b47](https://github.com/flaviodelgrosso/fastify-forge/commit/7779b47beed9e081d250d0134fc722412f312735))

## [2.0.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.5...v2.0.0) (2025-10-10)


### Features

* convert to monorepo with Turborepo ([f634989](https://github.com/flaviodelgrosso/fastify-forge/commit/f6349894c2a8ee8cbca781512de841c4087516d0))


### Bug Fixes

* update prepareEnv function to correctly reference the .env.example path ([93aa382](https://github.com/flaviodelgrosso/fastify-forge/commit/93aa38224c6b6c23f7793d292fd8482dc4354ea4))

### [1.4.5](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.4...v1.4.5) (2025-10-02)

### [1.4.4](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.3...v1.4.4) (2025-08-03)

### Bug Fixes

- **security:** use onRequest instead of preHandler request hook in authentication ([55f5000](https://github.com/flaviodelgrosso/fastify-forge/commit/55f5000742d34a2532b1c9635f79d3da505e2563))

### [1.4.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.2...v1.4.3) (2025-07-03)

### [1.4.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.1...v1.4.2) (2025-06-26)

### [1.4.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.4.0...v1.4.1) (2025-06-26)

### Features

- enhance environment configuration and logging setup ([afa9db3](https://github.com/flaviodelgrosso/fastify-forge/commit/afa9db3ac12c255ab41e73a906f5a475562c46ae))

### Bug Fixes

- update fastify autoload dir to use import.meta.dirname ([0069d6e](https://github.com/flaviodelgrosso/fastify-forge/commit/0069d6ed7aede6b1a54ba8a3a12c7018eccfae52))

## [1.4.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.4...v1.4.0) (2025-05-27)

### Features

- add getAuthDecorator from fastify-better-auth ([9776794](https://github.com/flaviodelgrosso/fastify-forge/commit/9776794382a7f0f92782234348a268c5433f61d3))

### [1.3.4](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.3...v1.3.4) (2025-05-26)

### [1.3.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.2...v1.3.3) (2025-05-11)

### Bug Fixes

- **auth:** nest database configuration under advanced settings ([71adb40](https://github.com/flaviodelgrosso/fastify-forge/commit/71adb40a96dd7614a2d8b04a1430906db165e9c5))

### [1.3.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.1...v1.3.2) (2025-04-27)

### [1.3.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.0...v1.3.1) (2025-04-27)

### Bug Fixes

- update fastify-better-auth to version 1.0.2 and improve type definitions for AuthOptions ([86fa266](https://github.com/flaviodelgrosso/fastify-forge/commit/86fa2665b8b3155405bcacd054ea2e85f3211b2c))

## [1.3.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.2.1...v1.3.0) (2025-04-27)

### Features

- add @fastify/sensible dependency and remove errors module ([ef597aa](https://github.com/flaviodelgrosso/fastify-forge/commit/ef597aa93e6da3bec47db7f864d6d08389374876))
- **cli:** enhance project creation flow with dependency installation prompt ([b9772df](https://github.com/flaviodelgrosso/fastify-forge/commit/b9772dfa627386f145b8c94e22f08b0d1968cc72))

### [1.2.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.2.0...v1.2.1) (2025-04-26)

### Features

- **cli:** add prepareEnv function and update create workflow ([d420f16](https://github.com/flaviodelgrosso/fastify-forge/commit/d420f1699f6f034575c25deb2fd1c8dea9d49b25))

## [1.2.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.3...v1.2.0) (2025-04-26)

### Features

- **cli:** add create command for initializing new fastify-forge projects ([f357d3c](https://github.com/flaviodelgrosso/fastify-forge/commit/f357d3cda606e47a1ae28cfb0404781fcc3f78a0))

### [1.1.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.2...v1.1.3) (2025-04-04)

### Bug Fixes

- update autoHooksPattern regex to support multiple file extensions ([c0dea2a](https://github.com/flaviodelgrosso/fastify-forge/commit/c0dea2a22065b8149f00b89c32b37c6e60323351))

### [1.1.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.1...v1.1.2) (2025-03-21)

- refactor: use `tsc` instead of `tsup`. update ts configurations

### [1.1.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.0...v1.1.1) (2025-03-19)

### Features

- add rate limiting with @fastify/rate-limit and update error handling ([1dea33b](https://github.com/flaviodelgrosso/fastify-forge/commit/1dea33b040e135971559c8e776a75314e4d8331d))
- authentication with better-auth, drizzle ORM and scalar openapi swagger ([06c74a0](https://github.com/flaviodelgrosso/fastify-forge/commit/06c74a0055a7f6de6deaf2087de977aa63e6724a))

### Bug Fixes

- send full details of error in server error handler ([1a9bfbf](https://github.com/flaviodelgrosso/fastify-forge/commit/1a9bfbf5d4adafc286cc03a7b693f56373e29ad4))

## [1.1.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.2...v1.1.0) (2025-01-08)

### Features

- add @fastify/under-pressure for enhanced server performance monitoring ([4d4093d](https://github.com/flaviodelgrosso/fastify-forge/commit/4d4093d4edc0704ee702d82b041bb9f37a8f23ba))
- add close-with-grace for graceful server shutdown ([3079d6d](https://github.com/flaviodelgrosso/fastify-forge/commit/3079d6d10730bf3f4ae7ebb282d01e1d2d16bc07))

### [1.0.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.1...v1.0.2) (2025-01-06)

### Bug Fixes

- change log level from error to info on server close ([b8419dc](https://github.com/flaviodelgrosso/fastify-forge/commit/b8419dcaaed713ce95e9ce05028bd127eb3ff201))
- include test files in TypeScript compilation ([387de84](https://github.com/flaviodelgrosso/fastify-forge/commit/387de84249f86ed05ba89b013d47953b9080d225))

### [1.0.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.0...v1.0.1) (2025-01-06)

### Features

- register AutoLoad for plugins directory in app initialization ([a076acf](https://github.com/flaviodelgrosso/fastify-forge/commit/a076acfeaeef64937804c8f755be000fe8cfeacc))

### Bug Fixes

- update Dockerfile command and process.yml script path ([9acfb82](https://github.com/flaviodelgrosso/fastify-forge/commit/9acfb8249f33cc83562623b694459830e1ac9bf8))

## 1.0.0 (2024-12-24)
