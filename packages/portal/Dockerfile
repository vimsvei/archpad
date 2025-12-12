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


FROM base AS dev
WORKDIR /app

# Install only portal deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/portal/package.json packages/portal/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/portal...

# Source (will be bind-mounted in docker-compose for live reload)
COPY packages/portal ./packages/portal

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
