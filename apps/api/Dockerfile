FROM node:24-alpine AS base

ARG REPO_NAME=api

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app
RUN apk update && apk add --no-cache jq libc6-compat
RUN npm i -g corepack@latest && corepack enable
RUN pnpm add -g turbo

# -----------------------------------------------------------------------------
# Extract the target application package
# -----------------------------------------------------------------------------
FROM base AS pruner
WORKDIR /app
COPY --chown=node:node . .
RUN turbo prune --scope=${REPO_NAME} --docker

# -----------------------------------------------------------------------------
# Add lockfile and package.json's of isolated subworkspace
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/full/ ./
RUN pnpm pkg delete scripts.prepare
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN turbo run build --filter=${REPO_NAME}...

# Prune pnpm package, then install dependencies for production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter=${REPO_NAME} --prod deploy --legacy pruner

# -----------------------------------------------------------------------------
# Production image, copy all the files and run the application
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=9464

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ${REPO_NAME}
USER ${REPO_NAME}

COPY --from=builder --chown=${REPO_NAME}:nodejs /app/pruner/package.json ./package.json
COPY --from=builder --chown=${REPO_NAME}:nodejs /app/pruner/node_modules ./node_modules
COPY --from=builder --chown=${REPO_NAME}:nodejs /app/pruner/dist ./dist

EXPOSE 9464

ENTRYPOINT ["node", "dist/server.js"]
