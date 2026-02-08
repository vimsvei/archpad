# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable


FROM base AS deps
WORKDIR /app

# Workspace manifests (landing has no contract dependency)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/landing/package.json packages/frontend/landing/package.json
COPY packages/frontend/lib/logger packages/frontend/lib/logger

# Install dependencies for landing
RUN pnpm install --frozen-lockfile --filter @archpad/landing...


FROM deps AS builder
WORKDIR /app

# Build arguments for Next.js public environment variables (Tolgee)
ARG NEXT_PUBLIC_TOLGEE_API_KEY
ARG NEXT_PUBLIC_TOLGEE_API_URL
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_TOLGEE_API_KEY=$NEXT_PUBLIC_TOLGEE_API_KEY
ENV NEXT_PUBLIC_TOLGEE_API_URL=$NEXT_PUBLIC_TOLGEE_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy source code
COPY packages/frontend/landing ./packages/frontend/landing
RUN mkdir -p packages/frontend/landing/public packages/frontend/landing/messages

# Fetch Tolgee translations at build time (always fresh, no manual sync)
RUN echo "Fetching Tolgee translations..." && \
    if [ -n "$NEXT_PUBLIC_TOLGEE_API_KEY" ] && [ -n "$NEXT_PUBLIC_TOLGEE_API_URL" ]; then \
      apt-get update -qq && apt-get install -y -qq --no-install-recommends curl ca-certificates unzip >/dev/null && \
      BASE="${NEXT_PUBLIC_TOLGEE_API_URL%/}" && \
      curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" \
        "$BASE/v2/projects/3/export?format=JSON&languages=ru-RU,en,es-ES,sr" \
        -o /tmp/tolgee.zip && \
      unzip -oq /tmp/tolgee.zip -d packages/frontend/landing/messages && \
      rm /tmp/tolgee.zip && \
      echo "Tolgee messages fetched: $(ls packages/frontend/landing/messages/)"; \
    else \
      echo "Skipping Tolgee fetch (no API key/URL; using committed messages)" && \
      [ -f packages/frontend/landing/messages/en.json ] || { echo "ERROR: No messages/ found; set NEXT_PUBLIC_TOLGEE_API_KEY"; exit 1; }; \
    fi

# Build logger first (dependency of landing)
RUN pnpm --filter @archpad/logger build

# Build landing (Velite runs automatically during next build)
RUN echo "Building landing with NEXT_PUBLIC_* variables:" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_KEY: ${NEXT_PUBLIC_TOLGEE_API_KEY:+***SET***}" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_URL: ${NEXT_PUBLIC_TOLGEE_API_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:+***SET***}"
RUN pnpm --filter @archpad/landing build


FROM base AS dev
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/landing/package.json packages/frontend/landing/package.json
COPY packages/frontend/lib/logger packages/frontend/lib/logger
RUN pnpm install --frozen-lockfile --filter @archpad/landing...

COPY packages/frontend/landing ./packages/frontend/landing

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["pnpm", "--filter", "@archpad/landing", "dev", "--port", "3000", "--hostname", "0.0.0.0"]


FROM node:20-bookworm-slim AS runner

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

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid 1001 nextjs

# Next.js standalone output
COPY --from=builder /app/packages/frontend/landing/.next/standalone ./
COPY --from=builder /app/packages/frontend/landing/.next/static ./packages/frontend/landing/.next/static
COPY --from=builder /app/packages/frontend/landing/public ./packages/frontend/landing/public
# Velite content (required for dynamic import @/.velite)
COPY --from=builder /app/packages/frontend/landing/.velite ./packages/frontend/landing/.velite

WORKDIR /app/packages/frontend/landing
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
