# AI Agents Guide (Archpad)

## Назначение

Этот документ помогает AI-агентам быстро понять, как устроен проект Archpad и как безопасно вносить изменения.

## Монорепо: что где

```text
packages/
  contract/                      # Общие TS-контракты (DTO, enum, схемы)
  backend/                       # NestJS сервисы
    apps/
      arch-repo-service/         # Основной API архитектурных объектов
      auth-service/
      tenant-service/
      hasura-sync-service/
  frontend/
    portal/                      # Основной Next.js UI
    landing/                     # Маркетинговый сайт
infra/timeweb/                   # GitOps манифесты k8s
assets/content/model/            # Archimate модель/артефакты
```

## Ключевые принципы изменений

- Предпочитать изменения исходников, а не сгенерированных артефактов.
- Сохранять совместимость по API и маршрутам UI (если меняется путь, добавлять alias-роут или миграционный шаг).
- Для пользовательского текста использовать Tolgee ключи (`packages/frontend/portal/messages/*.json`).
- Для кросс-сервисных операций сохранять идемпотентность.

## Frontend (portal): фактическая архитектура

- Стек: Next.js App Router + RTK Query + Tolgee.
- Основные доменные экраны находятся в `packages/frontend/portal/src/app/(private)/(portfolio)`.
- Базовые reusable-компоненты для Archimate лежат в:
  - `packages/frontend/portal/src/components/shared/archimate`
- Кастомные hooks лежат в:
  - `packages/frontend/portal/src/hooks`

### Унифицированные карточки объектов

- Основа layout: `ArchimateDetailCard`.
- Для простых named-object используется связка:
  - `named-object-list-page.tsx`
  - `named-object-edit-item.tsx`
  - `named-object-detail-v3.tsx`
- Для сущностей со связями (например, system-software) используется тот же layout + кастомные `properties/relations` конфиги.

## Backend (arch-repo-service): фактическая архитектура

- Generic CRUD named-object: `endpoints/archimate/named-object/*`.
- Для named-object важно наличие как минимум:
  - `GET /<entity>`
  - `GET /<entity>/:id`
  - `POST /<entity>`
  - `PATCH /<entity>/:id`
  - `DELETE /<entity>/:id`
- Новые named-object регистрируются через `named-object.autoregistry.ts`.

## Когда использовать REST vs GraphQL в portal

- Для list/edit flow предпочтителен REST слой (`services/*.rest.ts` + RTK Query API).
- GraphQL использовать как read-model только там, где нужен сложный агрегированный snapshot (например, full-card с множеством relation map).
- Если Hasura-схема изменилась и root field исчез, быстрое восстановление UI лучше делать переводом проблемного кейса на REST.

## Чеклист перед коммитом

1. Локально проверить:
   - `pnpm --filter @archpad/portal lint`
   - `pnpm --filter @archpad/portal build`
   - при backend-изменениях: `pnpm --filter @archpad/backend build:arch-repo`
2. Обновить i18n ключи, если добавлен новый UI copy.
3. Не смешивать несвязанные изменения: делать частичные (логические) коммиты.

## Стиль коммитов

Рекомендуемые группы:

- `feat(contract): ...`
- `feat(arch-repo): ...`
- `feat(portal): ...`
- `fix(portal): ...`
- `chore(portal): ...`

## Риски, на которые смотреть в review

- Потеря tenant-фильтрации в backend запросах.
- Ломка маршрутов, на которые уже ссылаются relation-панели.
- Появление hardcoded текста в UI (без Tolgee ключей).
- Дублирование card/edit logic вместо переиспользования shared компонентов.
