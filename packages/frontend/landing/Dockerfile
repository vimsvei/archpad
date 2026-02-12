# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable


FROM base AS deps
WORKDIR /app

# Build from repository root:
# docker build -f packages/frontend/landing/Dockerfile -t archpad-landing:latest .
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/landing/package.json packages/frontend/landing/package.json

# Install only landing workspace deps.
RUN pnpm install --frozen-lockfile --filter @archpad/landing...


FROM deps AS builder
WORKDIR /app

COPY packages/frontend/landing ./packages/frontend/landing

RUN pnpm --filter @archpad/landing build


FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner

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

# Next standalone runtime (small final image).
COPY --from=builder --chown=nonroot:nonroot /app/packages/frontend/landing/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/packages/frontend/landing/.next/static ./packages/frontend/landing/.next/static
COPY --from=builder --chown=nonroot:nonroot /app/packages/frontend/landing/public ./packages/frontend/landing/public

WORKDIR /app/packages/frontend/landing
USER nonroot

EXPOSE 3000

CMD ["server.js"]
