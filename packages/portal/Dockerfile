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

# Build arguments for Next.js public environment variables
# These must be available during build time to be embedded in the client bundle
ARG NEXT_PUBLIC_TOLGEE_API_KEY
ARG NEXT_PUBLIC_TOLGEE_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_ORY_SDK_URL
ARG NEXT_PUBLIC_API_GRAPHQL_ENDPOINT

# Set as environment variables for Next.js build process
# Next.js will embed NEXT_PUBLIC_* variables into the client bundle during build
ENV NEXT_PUBLIC_TOLGEE_API_KEY=$NEXT_PUBLIC_TOLGEE_API_KEY
ENV NEXT_PUBLIC_TOLGEE_API_URL=$NEXT_PUBLIC_TOLGEE_API_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_ORY_SDK_URL=$NEXT_PUBLIC_ORY_SDK_URL
ENV NEXT_PUBLIC_API_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_API_GRAPHQL_ENDPOINT

# Copy source code (same approach as backend Dockerfiles)
# This ensures all workspace packages are available with their node_modules
COPY packages/portal ./packages/portal
COPY packages/contract ./packages/contract

# Build contract first (it's a dependency of portal)
# pnpm will find tsc in node_modules/.bin when running the build script
RUN pnpm --filter @archpad/contract build
# Then build portal
# NEXT_PUBLIC_* variables are now available and will be embedded in the client bundle
# Логируем переменные для отладки (только ключи, не значения)
RUN echo "Building portal with NEXT_PUBLIC_* variables:" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_KEY: ${NEXT_PUBLIC_TOLGEE_API_KEY:+***SET***}" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_URL: ${NEXT_PUBLIC_TOLGEE_API_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_URL: ${NEXT_PUBLIC_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: ${NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT:+***SET***}" && \
    echo "  NEXT_PUBLIC_ORY_SDK_URL: ${NEXT_PUBLIC_ORY_SDK_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_API_GRAPHQL_ENDPOINT: ${NEXT_PUBLIC_API_GRAPHQL_ENDPOINT:+***SET***}"
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

# Build metadata
ARG BUILD_COMMIT_SHA
ARG BUILD_VERSION
ARG BUILD_BRANCH

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV BUILD_COMMIT_SHA=${BUILD_COMMIT_SHA}
ENV BUILD_VERSION=${BUILD_VERSION}
ENV BUILD_BRANCH=${BUILD_BRANCH}

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
