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

# Копируем файлы воркспейса, чтобы pnpm понимал монорепу
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Копируем только package.json нужного пакета (и при необходимости общих либ)
COPY packages/arch-repo/package.json ./packages/arch-repo/package.json
# Если есть общие либы в packages/*, добавь их package.json аналогично
# COPY packages/common-lib/package.json ./packages/common-lib/package.json

# Устанавливаем все зависимости, необходимые для сборки arch-repo
# ВАЖНО: имя в --filter ("arch-repo") должно совпадать с именем пакета в package.json
RUN pnpm install --filter "arch-repo..." --frozen-lockfile

# ---------- build: сборка TypeScript / NestJS ----------
FROM deps AS build

# Копируем весь исходный код (после того как зависимости уже установлены)
COPY . .

# Собираем только arch-repo
RUN pnpm --filter "arch-repo..." build

# ---------- runtime: минимальный образ только для запуска ----------
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Создаём не-root пользователя
RUN addgroup -S nodejs && adduser -S node -G nodejs

# Копируем только то, что нужно для прод-запуска arch-repo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/arch-repo/package.json ./packages/arch-repo/package.json
# Если есть общие либы, добавь их package.json так же, как в deps-стейдже

# Устанавливаем только прод-зависимости arch-repo
RUN pnpm install --filter "arch-repo..." --prod --frozen-lockfile

# Копируем результат сборки
COPY --from=build /app/packages/arch-repo/dist ./packages/arch-repo/dist

# Переходим в каталог пакета
WORKDIR /app/packages/arch-repo

USER node

# Порт по умолчанию для NestJS — 3000 (если у тебя другой, поменяй)
EXPOSE 3000

# Если в package.json есть "start:prod": "node dist/main.js" — этого достаточно
CMD ["pnpm", "start:prod"]
