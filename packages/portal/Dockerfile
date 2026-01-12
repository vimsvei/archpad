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

# Install dependencies for both contract and portal
# Contract needs typescript (devDependency) for building
# Portal depends on contract, so both need to be installed
# We install contract first explicitly to ensure its devDependencies (typescript) are installed
# Then install portal which will reuse contract from the workspace
RUN pnpm install --frozen-lockfile --filter @archpad/contract && \
    pnpm install --frozen-lockfile --filter @archpad/portal...


FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy package files to ensure pnpm workspace structure is correct
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
# Copy source code
COPY . .

# Build contract first (it's a dependency of portal)
# pnpm will find tsc in node_modules/.bin
RUN pnpm --filter @archpad/contract build
# Then build portal
RUN pnpm --filter @archpad/portal build


FROM base AS dev
WORKDIR /app

# Install portal and contract deps (contract needs typescript for building)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/portal/package.json packages/portal/package.json
COPY packages/contract/package.json packages/contract/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/contract --filter @archpad/portal...

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
