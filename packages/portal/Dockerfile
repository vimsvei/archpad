# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable


FROM base AS deps
WORKDIR /app

# Workspace manifests (for better layer caching)
# We intentionally copy ONLY what affects portal dependency graph,
# so backend/infra changes won't bust Docker cache.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/portal/package.json packages/portal/package.json
COPY packages/contract/package.json packages/contract/package.json

# Install dependencies for portal (which includes contract as a dependency)
# Using ... after portal includes all dependencies including contract and its devDependencies
# This is the same approach as backend Dockerfiles
RUN pnpm install --frozen-lockfile --filter @archpad/portal...


FROM deps AS builder
WORKDIR /app

# Copy source code (same approach as backend Dockerfiles)
# This ensures all workspace packages are available with their node_modules
COPY packages/portal ./packages/portal
COPY packages/contract ./packages/contract

# Build contract first (it's a dependency of portal)
# pnpm will find tsc in node_modules/.bin when running the build script
RUN pnpm --filter @archpad/contract build
# Then build portal
RUN pnpm --filter @archpad/portal build


FROM base AS dev
WORKDIR /app

# Install portal and contract deps (contract needs typescript for building)
# Using same approach as deps stage
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/portal/package.json packages/portal/package.json
COPY packages/contract/package.json packages/contract/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/portal...

# Source (will be bind-mounted in docker-compose for live reload)
COPY packages/portal ./packages/portal
COPY packages/contract ./packages/contract

RUN pnpm --filter @archpad/contract build

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["pnpm", "--filter", "@archpad/portal", "dev", "--port", "3000", "--hostname", "0.0.0.0"]


FROM node:20-bookworm-slim AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

# non-root user
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid 1001 nextjs

# Next.js standalone output (small runtime image)
COPY --from=builder /app/packages/portal/.next/standalone ./
COPY --from=builder /app/packages/portal/.next/static ./packages/portal/.next/static
COPY --from=builder /app/packages/portal/public ./packages/portal/public

WORKDIR /app/packages/portal
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
