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

# Install only portal deps (not backend/infra workspace packages)
RUN pnpm install --frozen-lockfile --filter @archpad/portal...


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm --filter @archpad/portal build


FROM node:20-bookworm-slim AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

# non-root user
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid 1001 nextjs

# Runtime needs built output + node_modules (no `output: 'standalone'` configured)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/portal ./packages/portal

WORKDIR /app/packages/portal
USER nextjs

EXPOSE 3000

CMD ["node", "../../node_modules/next/dist/bin/next", "start", "-p", "3000"]
