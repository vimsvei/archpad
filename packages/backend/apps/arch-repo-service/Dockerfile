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
RUN pnpm install --frozen-lockfile --filter @archpad/backend...

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build
COPY packages/backend ./packages/backend
RUN pnpm --filter @archpad/backend build:arch-repo


FROM deps AS prod-deps
RUN pnpm prune --prod --filter @archpad/backend

# ---------- runtime: минимальный образ только для запуска ----------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/packages/backend/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/apps/arch-repo-service/main.js"]
