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
# Workspace deps needed for backend build (@archpad/contracts)
COPY packages/contracts/package.json packages/contracts/package.json
RUN pnpm install --frozen-lockfile --filter @archpad/backend... --filter @archpad/contracts...

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build
COPY packages/backend ./packages/backend
COPY packages/contracts ./packages/contracts
RUN pnpm --filter @archpad/backend build:arch-repo


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
# @archpad/contracts is a runtime dependency of backend (required from compiled JS).
# Ensure the workspace package exists in the runtime image (node_modules links point to /app/packages/contracts).
COPY --from=build /app/packages/contracts/package.json /app/packages/contracts/package.json
COPY --from=build /app/packages/contracts/dist /app/packages/contracts/dist
# Also copy contracts node_modules to provide transitive deps (e.g., zod) in isolated pnpm layout.
COPY --from=prod-deps /app/packages/contracts/node_modules /app/packages/contracts/node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/apps/arch-repo-service/backend/apps/arch-repo-service/src/main.js"]
