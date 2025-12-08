# Мультистейдж: сборка зависимостей -> билд -> рантайм
# Базовый образ
FROM node:20-alpine AS base
WORKDIR /app

# Включаем pnpm через corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# ---------- deps: установка зависимостей для сборки ----------
FROM base AS deps
COPY package.json ./
RUN pnpm install --prod=false

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build
COPY . .
RUN pnpm run build

# ---------- runtime: минимальный образ только для запуска ----------
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

USER node

EXPOSE 3000

CMD ["pnpm", "start:prod"]
