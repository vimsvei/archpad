# 📚 Directory Management Prototype - Enterprise Architecture Tool

Прототип модуля управления справочниками для enterprise architecture management tool **ArchPad**.

---

## 🎯 Описание

B2B инструмент с темной темой для управления архитектурными справочниками. Профессиональный дизайн в стиле Atlassian, Linear или SAP Fiori Dark с зелеными акцентами.

### Основные возможности

- ✅ **Страница списка справочников** с коллапсируемой боковой панелью
- ✅ **Карточка элемента** без вкладок (единая страница)
- ✅ **Таблица связей** (full width 3/3) с Sheet для добавления
- ✅ **Переиспользуемая форма** DirectoryItemForm
- ✅ **Storybook stories** для всех компонентов

---

## 🚀 Быстрый старт

```bash
# Установить зависимости
pnpm install

# Запустить Storybook
pnpm storybook

# Собрать проект
pnpm build
```

---

## 🎨 Технологический стек

### UI Framework
- **React 18.3.1** - UI библиотека
- **TypeScript** - типизация

### Component Library
- **shadcn/ui** - компонентная библиотека на базе Radix UI
- **Radix UI** - headless UI primitives
- **lucide-react** - иконки (LibraryBig, Plus, Edit, Trash2, и т.д.)
- ❌ **Material UI** - не используется

### Styling
- **Tailwind CSS v4** - utility-first CSS
- **class-variance-authority** - variant management
- **tailwind-merge** - className merging

### State & Forms
- **react-hook-form** - формы
- **sonner** - toast notifications
- **react-router v7** - навигация

### Development
- **Vite** - build tool
- **Storybook** - документация компонентов
- **pnpm** - package manager

---

## 📁 Структура проекта

```
src/
├── app/
│   ├── pages/
│   │   ├── directories.tsx           # Страница списка справочников
│   │   └── components.tsx            # Страница списка компонентов
│   ├── components/
│   │   ├── directory-item-detail.tsx      # Карточка элемента (без вкладок)
│   │   ├── directory-item-form.tsx        # Форма создания/редактирования
│   │   ├── directory-item-detail.stories.tsx  # Storybook stories
│   │   ├── component-detail-no-stakeholders.tsx  # Карточка компонента без стейкхолдеров
│   │   ├── component-detail-no-stakeholders.stories.tsx  # Stories
│   │   ├── app-sidebar.tsx            # Боковая панель приложения
│   │   └── ui/                        # shadcn/ui компоненты
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── sheet.tsx
│   │       ├── tooltip.tsx
│   │       └── ... (60+ компонентов)
│   ├── App.tsx
│   └── routes.tsx
├── @types/
│   ├── directory.ts                  # TypeScript типы для справочников
│   └── application-component.ts      # TypeScript типы для компонентов
├── lib/
│   ├── mock-directories.ts           # Моковые данные справочников
│   └── mock-data.ts                  # Моковые данные компонентов
├── styles/
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── hooks/
```

---

## 📚 Документация

- **[DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md)** - Полная документация дизайна
- **[UPDATE_SUMMARY.md](./UPDATE_SUMMARY.md)** - Сводка изменений
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Руководство по интеграции
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Быстрая шпаргалка

---

## ✨ Основные компоненты

### 1. DirectoriesPage (`/src/app/pages/directories.tsx`)

Страница списка справочников с:
- Левая панель с категориями справочников (коллапсируемая)
- Центральная таблица с элементами
- Колонки: Icon, Code, Name, Description, Color, ByDefault, Actions
- Tooltips на всех кнопках действий
- Sheet для создания нового элемента
- Поиск по коду, названию, описанию

### 2. DirectoryItemDetail (`/src/app/components/directory-item-detail.tsx`)

Карточка элемента справочника:
- **Без вкладок** - весь контент на одной странице с прокруткой
- Layout: Description (2/3) + Properties (1/3) → Relations table (3/3) → Metadata
- Sheet для добавления связей (правая панель)
- Controlled формы с useState
- Автосохранение при редактировании

### 3. DirectoryItemForm (`/src/app/components/directory-item-form.tsx`)

Переиспользуемая форма для создания/редактирования:
- Поля: Code, Name, Description, Color, Order, ByDefault
- Валидация (Name обязательно)
- Используется в Sheet для создания
- Поддержка Markdown в Description

### 4. ComponentDetailNoStakeholders (`/src/app/components/component-detail-no-stakeholders.tsx`) **NEW!**

Карточка компонента архитектуры без стейкхолдеров:
- **Предупреждение** - Alert с информацией что стейкхолдеры не заданы
- Layout: Description (2/3) + Properties (1/3)
- Relations с горизонтальной прокруткой (Business, Application, Technology layers)
- Flows table (full width)
- **Empty state** для стейкхолдеров с CTA кнопкой
- Доступен из списка компонентов через селектор версий

---

## 🎨 Storybook

Доступные stories для просмотра:

```bash
pnpm storybook
# Откроется http://localhost:6006
```

### Stories:
- **Pages/Directory Item Detail**
  - With Relations - элемент с несколькими связями
  - No Relations - элемент без связей
  - License Type (Markdown) - элемент с Markdown описанием
  - Minimal Data - минимальные данные

---

## 🔌 Готовность к интеграции в ArchPad

Все компоненты готовы к интеграции:

### ✅ Используют те же паттерны что и в portal:
- shadcn/ui компоненты
- Controlled forms с useState
- Toast notifications (sonner)
- Tooltips и Sheet для UI
- lucide-react для иконок
- Consistent styling (h-8, bg-muted, border-border)

### 🔄 Placeholder комментарии для API:
```tsx
// TODO: implement delete API call
// TODO: implement create API call
// TODO: implement refresh
// TODO: implement file upload (CSV/JSON)
// TODO: implement create relation API call
// TODO: implement delete relation API call
```

### 🔄 Замените на RTK Query mutations:
- `useGetDirectoryItemsQuery(selectedDirectoryId)`
- `useCreateDirectoryItemMutation()`
- `useUpdateDirectoryItemMutation()`
- `useDeleteDirectoryItemMutation()`
- `useCreateDirectoryLinkMutation()`
- `useDeleteDirectoryLinkMutation()`

---

## 📦 Основные зависимости

```json
{
  "lucide-react": "0.487.0",           // Иконки
  "@radix-ui/react-*": "^1.x - ^2.x", // UI primitives
  "sonner": "2.0.3",                   // Toast notifications
  "react-router": "7.13.0",            // Навигация
  "react-hook-form": "7.55.0",         // Формы
  "tailwind-merge": "3.2.0",           // CSS utilities
  "class-variance-authority": "0.7.1"  // Variants
}
```

**Удалённые зависимости:**
- ❌ `@mui/material` - не используется
- ❌ `@mui/icons-material` - заменён на lucide-react
- ❌ `@emotion/react` - был нужен только для MUI
- ❌ `@emotion/styled` - был нужен только для MUI

---

## 🎯 TypeScript Types

### DirectoryItem
```typescript
export type DirectoryItem = {
  id: string;
  code: string;
  name: string;
  description?: string;
  color?: string;
  order?: number;
  byDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
  relations?: DirectoryRelation[];
};
```

### DirectoryRelation
```typescript
export type DirectoryRelation = {
  id: string;
  targetDirectoryName: string;
  targetItemName: string;
  relationType: string; // 'uses', 'has', 'depends', 'association', 'hierarchy'
};
```

---

## 🚢 Миграция в packages/frontend/storybook

Для перемещения в структуру ArchPad:

```bash
# Запустить автоматический скрипт миграции
chmod +x migrate-to-packages.sh
./migrate-to-packages.sh

# Или следовать инструкциям
cat MIGRATION_GUIDE.md
cat QUICK_START.md
```

---

## 🆘 Troubleshooting

### Проблема: Storybook не запускается
```bash
# Переустановить зависимости
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm storybook
```

### Проблема: TypeScript ошибки
```bash
# Проверить версии
pnpm list react react-dom typescript
```

### Проблема: Стили не применяются
```bash
# Проверить Tailwind config
cat vite.config.ts
# Убедитесь что @tailwindcss/vite плагин подключен
```

---

## 📝 Команды разработки

```bash
# Разработка
pnpm storybook          # Запустить Storybook (рекомендуется)

# Production
pnpm build              # Собрать проект
pnpm build-storybook    # Собрать Storybook статику

# Управление пакетами
pnpm install            # Установить зависимости
pnpm add <package>      # Добавить пакет
pnpm remove <package>   # Удалить пакет
```

---

## 🤝 Интеграция с archpad/packages/frontend/portal

1. Скопировать компоненты в portal:
   ```bash
   cp -r src/app/pages/directories.tsx ../portal/src/app/pages/
   cp -r src/app/components/directory-* ../portal/src/app/components/
   ```

2. Обновить импорты на RTK Query
3. Добавить переводы для i18n (@tolgee/react)
4. Подключить реальные API endpoints

Подробнее в **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)**

---

## 📄 Лицензия

Private - для внутреннего использования в проекте ArchPad.

---

## 🎉 Статус

✅ **Готово к интеграции в archpad portal!**

- Все компоненты протестированы в Storybook
- Документация полная
- API placeholders подготовлены
- Паттерны совместимы с archpad
- Material UI удалён, используется только lucide-react

---

**Разработано для ArchPad Enterprise Architecture Management Tool** 🚀