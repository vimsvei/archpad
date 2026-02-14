# Унифицированная карточка Archimate-объекта

## Цель

Сделать единый подход для карточек объектов в portal без копирования `component-detail-v3` под каждую сущность.

## Базовые building blocks

Файлы в `packages/frontend/portal/src/components/shared/archimate`:

- `archimate-detail-card.tsx` — общий shell карточки
- `detail-layout.tsx` — layout (header/main/sidebar)
- `properties-section.tsx` и `property-fields.tsx` — декларативные поля sidebar
- `relation-group.tsx`, `relation-layer-factory.tsx` — конфигурация relation-слоёв
- `named-object-list-page.tsx` — общий list page
- `named-object-edit-item.tsx` — общий edit flow
- `named-object-detail-v3.tsx` — базовая detail-карточка для named-object

## Быстрое подключение новой простой сущности (named-object)

Пример: `events`, `processes`, `functions`, `networks`, `nodes`.

1. Добавить тип в `src/@types/<entity>.ts` (обычно alias от `NamedObjectRecord`).
2. Добавить REST слой `src/services/<entity>.rest.ts`.
3. Добавить RTK Query API `src/store/apis/<entity>-api.ts`.
4. Подключить API в `src/store/store.ts`.
5. Добавить UI-обёртки:
   - `components/archimate/<entity>/list-page.tsx` на базе `NamedObjectListPage`
   - `components/archimate/<entity>/edit-item.tsx` на базе `NamedObjectEditItem`
6. Добавить маршруты `page.tsx` и `[id]/page.tsx`.
7. Добавить/обновить пункты меню и i18n ключи.

## Кастомная карточка с relation-логикой

Если у сущности есть нетривиальные связи (пример: `system-software`):

1. Использовать `ArchimateDetailCard` как контейнер.
2. Вынести конфиги в локальные файлы:
   - `component-detail-v3/properties-config.ts`
   - `component-detail-v3/relations-config.tsx`
3. В `relations-config.tsx` описать слои через `relationLayer/relationGroupByPrefix`.
4. Для удаления связи добавить backend endpoint и REST/RTK мутацию.
5. В edit-item хранить локальный draft + dirty/valid + guard выхода.

## Минимальный backend контракт для edit flow

Для стабильной работы `NamedObjectEditItem` нужен `PATCH /<entity>/:id`.

Рекомендуемый набор endpoint-ов:

- `GET /<entity>` (pagination + search)
- `GET /<entity>/:id`
- `POST /<entity>`
- `PATCH /<entity>/:id`
- `DELETE /<entity>/:id`

## i18n ключи, которые обычно нужны

- Заголовки меню:
  - `architecture.layer.*`
  - `<domain>.*`
- Пустые состояния таблиц:
  - `table.<entity>.no-results`
  - `table.<entity>.no-results.description`
- Базовые поля/действия уже переиспользуются из общих ключей (`table.code`, `table.name`, `action.save` и т.д.).

## Практические правила

- Не дублировать "edit page shell" под каждую сущность.
- Сначала пытаться решить через `NamedObject*` shared-компоненты.
- Кастомизировать только там, где реально отличается доменная модель (relations/properties).
- При изменении путей в menu/relations сохранять рабочие alias-роуты на переходный период.
