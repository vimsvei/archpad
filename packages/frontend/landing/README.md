# ArchPad Landing

Лендинг-страница для ArchPad на базе Next.js 16, Velite и Tolgee.

## Стек

- **Next.js 16** — App Router
- **Velite** — контент из MDX/YAML
- **Tolgee** — i18n (ключи в Tolgee, контент в MDX хранит только ключи)
- **shadcn/ui** — компоненты (Button, Card, Accordion)
- **Tailwind CSS 4** — стили

## Локализация

Локаль не в URL — всё на `/`. Язык определяется по:
1. IP (на Vercel — `x-vercel-ip-country`): RU→ru-RU, ES→es-ES, RS→sr
2. Иначе — заголовок `Accept-Language`
3. Иначе — английский
4. Cookie `archpad_locale` сохраняет выбор пользователя

## Структура контента

```
content/
├── site/
│   └── landing.yml       # Порядок секций лендинга
├── landing/
│   ├── sections/        # MDX-секции (hero, capabilities, faq, ...)
│   └── data/            # YAML: capabilities, personas, faq
├── use-cases/           # Страницы use-cases
├── integrations/        # Страницы интеграций
└── legal/              # Юридические страницы
```

## Запуск

```bash
# Из корня монорепы
pnpm --filter @archpad/landing dev

# Или из packages/frontend/landing
pnpm dev
```

## Переменные окружения

Скопируйте из portal или укажите:

- `NEXT_PUBLIC_TOLGEE_API_KEY` — ключ Tolgee
- `NEXT_PUBLIC_TOLGEE_API_URL` — URL Tolgee API
- `NEXT_PUBLIC_SITE_URL` — базовый URL сайта (для Open Graph, по умолчанию `https://archpad.pro`)

## Tolgee: переводы (messages/)

Файлы `messages/*.json` **генерируются при сборке Docker-образа** из Tolgee API — не нужно синхронизировать вручную.

- **CI/CD**: при `docker build` вызывается экспорт Tolgee (`/v2/projects/3/export`) и распаковка в `messages/`
- **Локально**: `pnpm fetch-tolgee` — обновить messages (нужны `NEXT_PUBLIC_TOLGEE_API_KEY`, `NEXT_PUBLIC_TOLGEE_API_URL`)
- **При локальной разработке** `loadRequired()` подтягивает актуальные переводы из Tolgee API при каждом запросе — staticData лишь fallback при недоступности API (prod K8s)

Коммитить `messages/` в git не обязательно — они перезаписываются при каждой сборке. Оставлены как fallback для локальной разработки без API.

## Tolgee-ключи

Добавьте в Tolgee ключи для лендинга:

- `landing.hero.title`, `landing.hero.subtitle`
- `site.cta.openPortal`, `site.cta.requestDemo`, `site.cta.openDocs`
- `landing.capabilities.*`, `landing.personas.*`, `landing.faq.*`
- и др. по структуре в `content/`
