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
# Workspace deps needed for backend compilation (@archpad/contracts is imported by backend libs)
COPY packages/contracts/package.json packages/contracts/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/backend... --filter @archpad/contracts...

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build
COPY packages/backend ./packages/backend
COPY packages/contracts ./packages/contracts
RUN pnpm --filter @archpad/backend build:hasura-repo-sync

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/backend ./packages/backend
COPY packages/contracts ./packages/contracts
RUN pnpm install --frozen-lockfile --prod --filter @archpad/backend... --filter @archpad/contracts...

# ---------- runtime: минимальный образ только для запуска ----------
FROM node:20-alpine AS runtime
WORKDIR /app/packages/backend

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/backend/node_modules ./node_modules
COPY --from=build /app/packages/backend/dist ./dist
# Ensure @archpad/contracts workspace package exists at runtime (backend code requires it).
COPY --from=build /app/packages/contracts/package.json /app/packages/contracts/package.json
COPY --from=build /app/packages/contracts/dist /app/packages/contracts/dist
COPY --from=prod-deps /app/packages/contracts/node_modules /app/packages/contracts/node_modules

USER node

CMD ["node", "dist/apps/hasura-sync-service/main.js"]
