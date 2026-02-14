# AGENTS.md - Frontend Portal

## 1) Scope
Эти правила применяются к `packages/frontend/portal` и имеют приоритет над общими правилами репозитория для этого пакета.

## 2) Stack и архитектура
- Next.js App Router.
- Состояние/данные: RTK Query (`src/store/apis/*`).
- Локализация: Tolgee (`messages/*.json`).
- REST-клиенты: `src/services/*.rest.ts`.
- GraphQL read-model (Hasura) использовать для сложных агрегированных карточек.

## 3) Где что лежит
- Роуты: `src/app/(private)/(portfolio)/**`.
- Reusable Archimate UI: `src/components/shared/archimate/**`.
- Специализированные карточки объектов: `src/components/archimate/**`.
- Хуки: `src/hooks/**`.
- GraphQL документы: `src/app/api/graphql/**`.

## 4) Унифицированная карточка Archimate
Базовая композиция:
- `archimate-detail-card.tsx` — общий shell карточки.
- `named-object-list-page.tsx` — универсальный список named-object.
- `named-object-edit-item.tsx` — общий edit flow (dirty state, save, guard).
- `named-object-detail-v3.tsx` — базовая detail-карточка named-object.

Правило:
- Сначала пытаться решить задачу через shared-компоненты.
- Новую специализированную `component-detail-v3` делать только если shared-конфигов недостаточно.

## 5) Связи и map-таблицы
- Блок `Структура и связи` в карточках строится через `relations` в `ArchimateDetailCard`.
- Для связи использовать map-таблицы из `arch-repo-service` как источник данных.
- Если для удаления связи нет API, не показывать destructive action.

## 6) REST vs GraphQL
- List/create/update/delete: обычно REST.
- Полная карточка с несколькими relation group: GraphQL full-query (read-model).
- Если Hasura root field нестабилен, fallback на REST допустим для критичного user flow.

## 7) i18n
- Любой пользовательский текст только через ключи в `messages/*.json`.
- Для новых секций/полей добавлять ключи синхронно во все поддерживаемые локали.

## 8) Проверки перед коммитом
- `pnpm --filter @archpad/portal gql:codegen`
- `pnpm --filter @archpad/portal lint`
- `pnpm --filter @archpad/portal build`

## 9) Полезная дока
- `docs/UNIFIED_ARCHIMATE_DETAIL_CARD.md` — как расширять унифицированную карточку.
