# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.2...v1.3.3) (2025-05-11)


### Bug Fixes

* **auth:** nest database configuration under advanced settings ([71adb40](https://github.com/flaviodelgrosso/fastify-forge/commit/71adb40a96dd7614a2d8b04a1430906db165e9c5))

### [1.3.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.1...v1.3.2) (2025-04-27)

### [1.3.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.3.0...v1.3.1) (2025-04-27)


### Bug Fixes

* update fastify-better-auth to version 1.0.2 and improve type definitions for AuthOptions ([86fa266](https://github.com/flaviodelgrosso/fastify-forge/commit/86fa2665b8b3155405bcacd054ea2e85f3211b2c))

## [1.3.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.2.1...v1.3.0) (2025-04-27)


### Features

* add @fastify/sensible dependency and remove errors module ([ef597aa](https://github.com/flaviodelgrosso/fastify-forge/commit/ef597aa93e6da3bec47db7f864d6d08389374876))
* **cli:** enhance project creation flow with dependency installation prompt ([b9772df](https://github.com/flaviodelgrosso/fastify-forge/commit/b9772dfa627386f145b8c94e22f08b0d1968cc72))

### [1.2.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.2.0...v1.2.1) (2025-04-26)


### Features

* **cli:** add prepareEnv function and update create workflow ([d420f16](https://github.com/flaviodelgrosso/fastify-forge/commit/d420f1699f6f034575c25deb2fd1c8dea9d49b25))

## [1.2.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.3...v1.2.0) (2025-04-26)


### Features

* **cli:** add create command for initializing new fastify-forge projects ([f357d3c](https://github.com/flaviodelgrosso/fastify-forge/commit/f357d3cda606e47a1ae28cfb0404781fcc3f78a0))

### [1.1.3](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.2...v1.1.3) (2025-04-04)


### Bug Fixes

* update autoHooksPattern regex to support multiple file extensions ([c0dea2a](https://github.com/flaviodelgrosso/fastify-forge/commit/c0dea2a22065b8149f00b89c32b37c6e60323351))

### [1.1.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.1...v1.1.2) (2025-03-21)

* refactor: use `tsc` instead of `tsup`. update ts configurations

### [1.1.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.1.0...v1.1.1) (2025-03-19)

### Features

* add rate limiting with @fastify/rate-limit and update error handling ([1dea33b](https://github.com/flaviodelgrosso/fastify-forge/commit/1dea33b040e135971559c8e776a75314e4d8331d))
* authentication with better-auth, drizzle ORM and scalar openapi swagger ([06c74a0](https://github.com/flaviodelgrosso/fastify-forge/commit/06c74a0055a7f6de6deaf2087de977aa63e6724a))

### Bug Fixes

* send full details of error in server error handler ([1a9bfbf](https://github.com/flaviodelgrosso/fastify-forge/commit/1a9bfbf5d4adafc286cc03a7b693f56373e29ad4))

## [1.1.0](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.2...v1.1.0) (2025-01-08)

### Features

* add @fastify/under-pressure for enhanced server performance monitoring ([4d4093d](https://github.com/flaviodelgrosso/fastify-forge/commit/4d4093d4edc0704ee702d82b041bb9f37a8f23ba))
* add close-with-grace for graceful server shutdown ([3079d6d](https://github.com/flaviodelgrosso/fastify-forge/commit/3079d6d10730bf3f4ae7ebb282d01e1d2d16bc07))

### [1.0.2](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.1...v1.0.2) (2025-01-06)

### Bug Fixes

* change log level from error to info on server close ([b8419dc](https://github.com/flaviodelgrosso/fastify-forge/commit/b8419dcaaed713ce95e9ce05028bd127eb3ff201))
* include test files in TypeScript compilation ([387de84](https://github.com/flaviodelgrosso/fastify-forge/commit/387de84249f86ed05ba89b013d47953b9080d225))

### [1.0.1](https://github.com/flaviodelgrosso/fastify-forge/compare/v1.0.0...v1.0.1) (2025-01-06)

### Features

* register AutoLoad for plugins directory in app initialization ([a076acf](https://github.com/flaviodelgrosso/fastify-forge/commit/a076acfeaeef64937804c8f755be000fe8cfeacc))

### Bug Fixes

* update Dockerfile command and process.yml script path ([9acfb82](https://github.com/flaviodelgrosso/fastify-forge/commit/9acfb8249f33cc83562623b694459830e1ac9bf8))

## 1.0.0 (2024-12-24)
