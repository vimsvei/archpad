#!/bin/bash

# Migration Script: Move to packages/frontend/storybook
# Usage: bash migrate-to-packages.sh

set -e  # Exit on error

echo "🚀 Starting migration to packages/frontend/storybook..."

# Define target directory
TARGET="packages/frontend/storybook"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p "$TARGET/src/app/pages"
mkdir -p "$TARGET/src/app/components/ui"
mkdir -p "$TARGET/src/app/components/figma"
mkdir -p "$TARGET/src/lib"
mkdir -p "$TARGET/src/styles"
mkdir -p "$TARGET/src/@types"
mkdir -p "$TARGET/src/hooks"
mkdir -p "$TARGET/src/menu"
mkdir -p "$TARGET/.storybook"

# Copy source files
echo "📋 Copying source files..."

# Pages
cp src/app/pages/directories.tsx "$TARGET/src/app/pages/" 2>/dev/null || echo "  ⚠️  directories.tsx not found"
cp src/app/pages/components.tsx "$TARGET/src/app/pages/" 2>/dev/null || echo "  ⚠️  components.tsx not found"

# Components
cp src/app/components/directory-item-detail.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  directory-item-detail.tsx not found"
cp src/app/components/directory-item-form.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  directory-item-form.tsx not found"
cp src/app/components/directory-item-detail.stories.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  directory-item-detail.stories.tsx not found"
cp src/app/components/component-detail-no-stakeholders.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  component-detail-no-stakeholders.tsx not found"
cp src/app/components/component-detail-no-stakeholders.stories.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  component-detail-no-stakeholders.stories.tsx not found"
cp src/app/components/app-sidebar.tsx "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  app-sidebar.tsx not found"

# UI Components
cp -r src/app/components/ui "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  ui/ not found"
cp -r src/app/components/figma "$TARGET/src/app/components/" 2>/dev/null || echo "  ⚠️  figma/ not found"

# Other components
cp src/app/components/*.tsx "$TARGET/src/app/components/" 2>/dev/null || true
cp src/app/components/*.mdx "$TARGET/src/app/components/" 2>/dev/null || true

# Types
cp src/@types/directory.ts "$TARGET/src/@types/" 2>/dev/null || echo "  ⚠️  directory.ts not found"
cp src/@types/*.ts "$TARGET/src/@types/" 2>/dev/null || true

# Lib
cp src/lib/mock-directories.ts "$TARGET/src/lib/" 2>/dev/null || echo "  ⚠️  mock-directories.ts not found"
cp src/lib/*.ts "$TARGET/src/lib/" 2>/dev/null || true

# Styles
cp -r src/styles "$TARGET/src/" 2>/dev/null || echo "  ⚠️  styles/ not found"

# Hooks
cp -r src/hooks "$TARGET/src/" 2>/dev/null || true

# Menu
cp -r src/menu "$TARGET/src/" 2>/dev/null || true

# Root files
cp src/app/App.tsx "$TARGET/src/app/" 2>/dev/null || true
cp src/app/routes.tsx "$TARGET/src/app/" 2>/dev/null || true

# Copy documentation
echo "📚 Copying documentation..."
cp DESIGN_DOCUMENTATION.md "$TARGET/" 2>/dev/null || echo "  ⚠️  DESIGN_DOCUMENTATION.md not found"
cp UPDATE_SUMMARY.md "$TARGET/" 2>/dev/null || echo "  ⚠️  UPDATE_SUMMARY.md not found"
cp INTEGRATION_GUIDE.md "$TARGET/" 2>/dev/null || echo "  ⚠️  INTEGRATION_GUIDE.md not found"
cp QUICK_REFERENCE.md "$TARGET/" 2>/dev/null || echo "  ⚠️  QUICK_REFERENCE.md not found"
cp README.md "$TARGET/" 2>/dev/null || true
cp MIGRATION_GUIDE.md "$TARGET/" 2>/dev/null || true

# Copy config files
echo "⚙️  Copying config files..."
cp package.json "$TARGET/" 2>/dev/null || echo "  ⚠️  package.json not found"
cp vite.config.ts "$TARGET/" 2>/dev/null || echo "  ⚠️  vite.config.ts not found"
cp postcss.config.mjs "$TARGET/" 2>/dev/null || echo "  ⚠️  postcss.config.mjs not found"
cp main.ts "$TARGET/" 2>/dev/null || true
cp preview.tsx "$TARGET/" 2>/dev/null || true

# Storybook config
cp -r .storybook "$TARGET/" 2>/dev/null || echo "  ⚠️  .storybook/ not found"

# Create README in target directory
cat > "$TARGET/README.md" << 'EOF'
# Directory Management Prototype

Enterprise architecture management tool - справочники (directories) module.

## 🎯 Что это?

Прототип модуля управления справочниками для архитектурного инструмента ArchPad.

## 🚀 Быстрый старт

```bash
# Установить зависимости
pnpm install

# Запустить Storybook
pnpm storybook

# Собрать проект
pnpm build
```

## 📁 Структура

```
src/
  app/
    pages/
      directories.tsx          # Страница списка справочников
    components/
      directory-item-detail.tsx   # Карточка элемента (без вкладок)
      directory-item-form.tsx     # Форма создания/редактирования
      directory-item-detail.stories.tsx  # Storybook stories
  @types/
    directory.ts              # TypeScript типы
  lib/
    mock-directories.ts       # Моковые данные
```

## 📚 Документация

- `DESIGN_DOCUMENTATION.md` - Полная документация дизайна
- `UPDATE_SUMMARY.md` - Сводка изменений
- `INTEGRATION_GUIDE.md` - Руководство по интеграции
- `QUICK_REFERENCE.md` - Быстрая шпаргалка

## ✨ Основные фичи

### Страница списка справочников
- Левая панель с категориями справочников
- Центральная таблица с элементами
- Колонки: Icon, Code, Name, Description, Color, ByDefault, Actions
- Tooltips на всех действиях
- Sheet для создания элемента

### Карточка элемента
- **Без вкладок** - весь контент на одной странице
- Layout: Description (2/3) + Properties (1/3)
- Relations table (full width 3/3)
- Sheet для добавления связей (правая панель)
- Metadata footer (created/updated)

## 🔌 Готовность к интеграции

Все компоненты готовы к интеграции в archpad:
- ✅ Используют те же паттерны что и в portal
- ✅ shadcn/ui компоненты
- ✅ Controlled forms с useState
- ✅ Toast notifications (sonner)
- ✅ Tooltips и Sheet для UI
- ✅ TODO комментарии для API интеграции

## 🎨 Storybook

Доступные stories:
- `Pages/Directory Item Detail` - 4 варианта
  - With Relations
  - No Relations
  - License Type (Markdown)
  - Minimal Data

## 🔄 API Integration

Placeholder комментарии в коде:
```tsx
// TODO: implement delete API call
// TODO: implement create API call
// TODO: implement refresh
// TODO: implement file upload (CSV/JSON)
```

Замените на RTK Query mutations:
- `useCreateDirectoryItemMutation`
- `useUpdateDirectoryItemMutation`
- `useDeleteDirectoryItemMutation`
- `useCreateDirectoryLinkMutation`
- `useDeleteDirectoryLinkMutation`

---

**Готово к разработке!** 🎉
EOF

echo "✅ Migration completed!"
echo ""
echo "📍 Files copied to: $TARGET"
echo ""
echo "🔍 Next steps:"
echo "   1. cd $TARGET"
echo "   2. pnpm install"
echo "   3. pnpm storybook"
echo ""
echo "📝 To commit:"
echo "   git add $TARGET/"
echo "   git commit -m \"feat: migrate directories prototype to packages/frontend/storybook\""
echo "   git push origin main"
echo ""
echo "✨ Done!"