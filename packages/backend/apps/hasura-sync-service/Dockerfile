FROM node:20-alpine AS base
WORKDIR /app

# Включаем pnpm через corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# ---------- deps: установка зависимостей для сборки ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/contract/package.json packages/contract/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/backend...

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build
COPY packages/backend ./packages/backend
COPY packages/contract ./packages/contract
RUN pnpm --filter @archpad/contract build
RUN pnpm --filter @archpad/backend build:hasura-repo-sync

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/contract/package.json packages/contract/package.json
COPY packages/backend ./packages/backend
COPY packages/contract ./packages/contract
RUN pnpm install --frozen-lockfile --prod --filter @archpad/backend...

# ---------- runtime: минимальный образ только для запуска ----------
FROM node:20-alpine AS runtime
WORKDIR /app/packages/backend

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/backend/node_modules ./node_modules
COPY --from=build /app/packages/contract /app/packages/contract
COPY --from=build /app/packages/backend/dist ./dist

USER node

# Nest monorepo build output keeps sourceRoot folders under dist/
CMD ["node", "dist/apps/hasura-sync-service/apps/hasura-sync-service/src/main.js"]
