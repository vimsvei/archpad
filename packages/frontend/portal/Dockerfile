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
COPY packages/frontend/portal/package.json packages/frontend/portal/package.json
COPY packages/contract/package.json packages/contract/package.json
COPY packages/frontend/lib/logger packages/frontend/lib/logger

# Install dependencies for portal (which includes contract as a dependency)
# Using ... after portal includes all dependencies including contract and its devDependencies
# This is the same approach as backend Dockerfiles
RUN pnpm install --frozen-lockfile --filter @archpad/portal...


FROM deps AS builder
WORKDIR /app

# Build arguments for Next.js public environment variables
# These must be available during build time to be embedded in the client bundle
# NOTE: For Tolgee, we need these in build-time for client-side dynamic loading,
# but they will also be available at runtime for server-side rendering
ARG NEXT_PUBLIC_TOLGEE_API_KEY
ARG NEXT_PUBLIC_TOLGEE_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_HASURA_GRAPHQL_URL
ARG NEXT_PUBLIC_API_GRAPHQL_URI
ARG NEXT_PUBLIC_API_REST_URI

# Set as environment variables for Next.js build process
# Next.js will embed NEXT_PUBLIC_* variables into the client bundle during build
# These are needed for client-side dynamic translation loading via Tolgee API
ENV NEXT_PUBLIC_TOLGEE_API_KEY=$NEXT_PUBLIC_TOLGEE_API_KEY
ENV NEXT_PUBLIC_TOLGEE_API_URL=$NEXT_PUBLIC_TOLGEE_API_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_HASURA_GRAPHQL_URL=$NEXT_PUBLIC_HASURA_GRAPHQL_URL
ENV NEXT_PUBLIC_API_GRAPHQL_URI=$NEXT_PUBLIC_API_GRAPHQL_URI
ENV NEXT_PUBLIC_API_REST_URI=$NEXT_PUBLIC_API_REST_URI

# Copy source code (same approach as backend Dockerfiles)
# This ensures all workspace packages are available with their node_modules
COPY packages/frontend/portal ./packages/frontend/portal
COPY packages/contract ./packages/contract

# Fetch Tolgee translations at build time (always fresh, no manual sync)
RUN echo "Fetching Tolgee translations..." && \
    if [ -n "$NEXT_PUBLIC_TOLGEE_API_KEY" ] && [ -n "$NEXT_PUBLIC_TOLGEE_API_URL" ]; then \
      apt-get update -qq && apt-get install -y -qq --no-install-recommends curl ca-certificates unzip jq >/dev/null && \
      BASE="${NEXT_PUBLIC_TOLGEE_API_URL%/}" && \
      PROJECT_ID=$(curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" "$BASE/v2/api-keys/current" | jq -r '.projectId') && \
      [ -n "$PROJECT_ID" ] && [ "$PROJECT_ID" != "null" ] || { echo "Failed to get Tolgee project ID"; exit 1; } && \
      curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" \
        "$BASE/v2/projects/$PROJECT_ID/export?format=JSON&languages=ru-RU,en,es-ES,sr" \
        -o /tmp/tolgee.zip && \
      unzip -oq /tmp/tolgee.zip -d packages/frontend/portal/messages && \
      rm /tmp/tolgee.zip && \
      echo "Tolgee messages fetched (project $PROJECT_ID): $(ls packages/frontend/portal/messages/)"; \
    else \
      echo "Skipping Tolgee fetch (no API key/URL; using committed messages)" && \
      [ -f packages/frontend/portal/messages/en.json ] || { echo "ERROR: No messages/ found; set NEXT_PUBLIC_TOLGEE_API_KEY"; exit 1; }; \
    fi

# Build contract and logger first (dependencies of portal)
RUN pnpm --filter @archpad/contract build
RUN pnpm --filter @archpad/logger build
# Then build portal
# NEXT_PUBLIC_* variables are now available and will be embedded in the client bundle
# Логируем переменные для отладки (только ключи, не значения)
RUN echo "Building portal with NEXT_PUBLIC_* variables:" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_KEY: ${NEXT_PUBLIC_TOLGEE_API_KEY:+***SET***}" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_URL: ${NEXT_PUBLIC_TOLGEE_API_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_URL: ${NEXT_PUBLIC_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_HASURA_GRAPHQL_URL: ${NEXT_PUBLIC_HASURA_GRAPHQL_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_API_GRAPHQL_URI: ${NEXT_PUBLIC_API_GRAPHQL_URI:+***SET***}" && \
    echo "  NEXT_PUBLIC_API_REST_URI: ${NEXT_PUBLIC_API_REST_URI:+***SET***}"
RUN pnpm --filter @archpad/portal build


FROM base AS dev
WORKDIR /app

# Install portal and contract deps (contract needs typescript for building)
# Using same approach as deps stage
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/portal/package.json packages/frontend/portal/package.json
COPY packages/contract/package.json packages/contract/package.json
COPY packages/frontend/lib/logger packages/frontend/lib/logger
RUN pnpm install --frozen-lockfile --filter @archpad/portal...

# Source (will be bind-mounted in docker-compose for live reload)
COPY packages/frontend/portal ./packages/frontend/portal
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
COPY --from=builder /app/packages/frontend/portal/.next/standalone ./
COPY --from=builder /app/packages/frontend/portal/.next/static ./packages/frontend/portal/.next/static
COPY --from=builder /app/packages/frontend/portal/public ./packages/frontend/portal/public

WORKDIR /app/packages/frontend/portal
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
