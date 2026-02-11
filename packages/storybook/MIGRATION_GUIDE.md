# 📦 Migration Guide: Moving to packages/frontend/storybook

## Текущая структура → Целевая структура

Все файлы нужно переместить из корня в `packages/frontend/storybook/`.

---

## 🗂️ Файлы для перемещения

### 1. **Source Code**

```bash
# Pages
src/app/pages/directories.tsx
  → packages/frontend/storybook/src/app/pages/directories.tsx

# Components
src/app/components/directory-item-detail.tsx
  → packages/frontend/storybook/src/app/components/directory-item-detail.tsx

src/app/components/directory-item-form.tsx
  → packages/frontend/storybook/src/app/components/directory-item-form.tsx

src/app/components/directory-item-detail.stories.tsx
  → packages/frontend/storybook/src/app/components/directory-item-detail.stories.tsx

src/app/components/app-sidebar.tsx
  → packages/frontend/storybook/src/app/components/app-sidebar.tsx

# UI Components (already exist, no changes needed)
src/app/components/ui/*
  → packages/frontend/storybook/src/app/components/ui/*

# Types
src/@types/directory.ts
  → packages/frontend/storybook/src/@types/directory.ts

# Lib
src/lib/mock-directories.ts
  → packages/frontend/storybook/src/lib/mock-directories.ts

# Styles
src/styles/*
  → packages/frontend/storybook/src/styles/*
```

### 2. **Documentation**

```bash
DESIGN_DOCUMENTATION.md
  → packages/frontend/storybook/DESIGN_DOCUMENTATION.md

UPDATE_SUMMARY.md
  → packages/frontend/storybook/UPDATE_SUMMARY.md

INTEGRATION_GUIDE.md
  → packages/frontend/storybook/INTEGRATION_GUIDE.md

QUICK_REFERENCE.md
  → packages/frontend/storybook/QUICK_REFERENCE.md
```

### 3. **Config Files**

```bash
package.json
  → packages/frontend/storybook/package.json

vite.config.ts
  → packages/frontend/storybook/vite.config.ts

postcss.config.mjs
  → packages/frontend/storybook/postcss.config.mjs

.storybook/* (if exists)
  → packages/frontend/storybook/.storybook/*
```

---

## 🚀 Команды для перемещения

### Вариант 1: Используя существующие файлы (копирование)

```bash
# Создать структуру директорий
mkdir -p packages/frontend/storybook/src/app/{pages,components/ui}
mkdir -p packages/frontend/storybook/src/{lib,styles,'@types'}
mkdir -p packages/frontend/storybook/docs

# Копировать source code
cp -r src/* packages/frontend/storybook/src/

# Копировать документацию
cp DESIGN_DOCUMENTATION.md packages/frontend/storybook/
cp UPDATE_SUMMARY.md packages/frontend/storybook/
cp INTEGRATION_GUIDE.md packages/frontend/storybook/
cp QUICK_REFERENCE.md packages/frontend/storybook/

# Копировать конфиги
cp package.json packages/frontend/storybook/
cp vite.config.ts packages/frontend/storybook/
cp postcss.config.mjs packages/frontend/storybook/
```

### Вариант 2: Git mv (перемещение с сохранением истории)

```bash
# Создать целевую папку
mkdir -p packages/frontend/storybook

# Переместить с сохранением git истории
git mv src packages/frontend/storybook/
git mv DESIGN_DOCUMENTATION.md packages/frontend/storybook/
git mv UPDATE_SUMMARY.md packages/frontend/storybook/
git mv INTEGRATION_GUIDE.md packages/frontend/storybook/
git mv QUICK_REFERENCE.md packages/frontend/storybook/
git mv package.json packages/frontend/storybook/
git mv vite.config.ts packages/frontend/storybook/
git mv postcss.config.mjs packages/frontend/storybook/
```

---

## 📝 Git Commit команды

### После перемещения файлов:

```bash
# Проверить статус
git status

# Добавить все изменения
git add packages/frontend/storybook/

# Создать коммит
git commit -m "feat: migrate directories prototype to packages/frontend/storybook

- Moved all directory management components
- Moved documentation files
- Directory list page with Sheet for creation
- Directory item detail without tabs
- Relations table (full width 3/3) with Sheet for adding
- Separate DirectoryItemForm component
- Updated stories and types
- Ready for integration into archpad portal"

# Отправить в GitHub
git push origin main
```

### Альтернативный вариант (более детальный коммит):

```bash
git commit -m "feat(directories): complete prototype for directory management

## Features
- Directory list page with collapsible sidebar
- Item detail view with unified layout (no tabs)
- Relations management via right Sheet
- Reusable DirectoryItemForm component
- LibraryBig icons, tooltips, hover menus
- Full width relations table (3/3)

## Structure
- Moved to packages/frontend/storybook/
- Added comprehensive documentation
- Storybook stories for all components
- TypeScript types for DirectoryItem and DirectoryRelation

## Integration Ready
- Compatible with archpad patterns
- Ready for RTK Query integration
- Placeholder TODOs for API calls
- Follows shadcn/ui conventions"

git push origin main
```

---

## 🔍 Проверка после миграции

```bash
# Перейти в новую директорию
cd packages/frontend/storybook

# Установить зависимости
pnpm install

# Запустить Storybook
pnpm storybook

# Проверить сборку
pnpm build
```

---

## 📋 Checklist

- [ ] Создана структура `packages/frontend/storybook/`
- [ ] Перемещены все src файлы
- [ ] Перемещены файлы документации
- [ ] Перемещены конфигурационные файлы
- [ ] Обновлены импорты (если нужно)
- [ ] Проверена работа Storybook
- [ ] Создан коммит
- [ ] Push в GitHub
- [ ] Проверка на GitHub что все файлы на месте

---

## ⚠️ Важные заметки

1. **package.json**: Возможно потребуется обновить пути и зависимости
2. **vite.config.ts**: Проверить alias paths для `@/`
3. **Импорты**: Все относительные импорты должны остаться рабочими
4. **Storybook config**: Убедиться что `.storybook/main.ts` указывает на правильные пути

---

## 🎯 Результат

После выполнения миграции у вас будет:

```
packages/
  frontend/
    storybook/
      src/
        app/
          pages/
            directories.tsx
          components/
            directory-item-detail.tsx
            directory-item-form.tsx
            directory-item-detail.stories.tsx
            ui/
              ...
        lib/
          mock-directories.ts
        @types/
          directory.ts
        styles/
          ...
      DESIGN_DOCUMENTATION.md
      UPDATE_SUMMARY.md
      INTEGRATION_GUIDE.md
      QUICK_REFERENCE.md
      package.json
      vite.config.ts
      ...
```

Готово к коммиту! 🚀
