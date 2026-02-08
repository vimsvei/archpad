# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable


FROM base AS deps
WORKDIR /app

# Workspace manifests (landing has no contract dependency)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/landing/package.json packages/landing/package.json

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
COPY packages/landing ./packages/landing
RUN mkdir -p packages/landing/public

# Build landing (Velite runs automatically during next build)
RUN echo "Building landing with NEXT_PUBLIC_* variables:" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_KEY: ${NEXT_PUBLIC_TOLGEE_API_KEY:+***SET***}" && \
    echo "  NEXT_PUBLIC_TOLGEE_API_URL: ${NEXT_PUBLIC_TOLGEE_API_URL:+***SET***}" && \
    echo "  NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:+***SET***}"
RUN pnpm --filter @archpad/landing build


FROM base AS dev
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/landing/package.json packages/landing/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/landing...

COPY packages/landing ./packages/landing

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
COPY --from=builder /app/packages/landing/.next/standalone ./
COPY --from=builder /app/packages/landing/.next/static ./packages/landing/.next/static
COPY --from=builder /app/packages/landing/public ./packages/landing/public
# Velite content (required for dynamic import @/.velite)
COPY --from=builder /app/packages/landing/.velite ./packages/landing/.velite

WORKDIR /app/packages/landing
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
