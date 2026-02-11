# 🚀 Quick Start: Migration & Commit

## Быстрая миграция в packages/frontend/storybook и коммит в GitHub

---

## Вариант 1: Автоматический скрипт (РЕКОМЕНДУЕТСЯ)

```bash
# Сделать скрипт исполняемым
chmod +x migrate-to-packages.sh

# Запустить миграцию
./migrate-to-packages.sh

# Результат: все файлы скопированы в packages/frontend/storybook/
```

Затем:

```bash
# Добавить в git
git add packages/frontend/storybook/

# Создать коммит
git commit -m "feat: migrate directories prototype to packages/frontend/storybook

- Directory list page with collapsible sidebar
- Item detail view without tabs (unified layout)
- Relations management via right Sheet
- Reusable DirectoryItemForm component
- Full documentation and Storybook stories
- Ready for archpad portal integration"

# Отправить в GitHub
git push origin main
```

---

## Вариант 2: Ручное копирование

### 1. Создать структуру

```bash
mkdir -p packages/frontend/storybook/src/{app/{pages,components/ui},lib,styles,'@types'}
```

### 2. Копировать ключевые файлы

```bash
# Source
cp -r src/* packages/frontend/storybook/src/

# Docs
cp DESIGN_DOCUMENTATION.md packages/frontend/storybook/
cp UPDATE_SUMMARY.md packages/frontend/storybook/
cp INTEGRATION_GUIDE.md packages/frontend/storybook/
cp QUICK_REFERENCE.md packages/frontend/storybook/

# Config
cp package.json packages/frontend/storybook/
cp vite.config.ts packages/frontend/storybook/
cp postcss.config.mjs packages/frontend/storybook/
```

### 3. Коммит

```bash
git add packages/frontend/storybook/
git commit -m "feat: directories prototype ready for integration"
git push origin main
```

---

## Вариант 3: Git mv (с сохранением истории)

```bash
# Переместить с сохранением git истории
git mv src packages/frontend/storybook/
git mv *.md packages/frontend/storybook/
git mv package.json packages/frontend/storybook/
git mv vite.config.ts packages/frontend/storybook/

git commit -m "feat: move directories prototype to packages/frontend/storybook"
git push origin main
```

---

## ✅ Проверка после миграции

```bash
cd packages/frontend/storybook

# Установить зависимости
pnpm install

# Запустить Storybook
pnpm storybook

# Должен открыться на http://localhost:6006
```

---

## 📦 Что будет перенесено

### Исходный код (src/)
- ✅ `src/app/pages/directories.tsx` - Страница списка
- ✅ `src/app/components/directory-item-detail.tsx` - Карточка
- ✅ `src/app/components/directory-item-form.tsx` - Форма
- ✅ `src/app/components/directory-item-detail.stories.tsx` - Stories
- ✅ `src/@types/directory.ts` - Типы
- ✅ `src/lib/mock-directories.ts` - Моки

### Документация
- ✅ `DESIGN_DOCUMENTATION.md`
- ✅ `UPDATE_SUMMARY.md`
- ✅ `INTEGRATION_GUIDE.md`
- ✅ `QUICK_REFERENCE.md`

### Конфиги
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `postcss.config.mjs`

---

## 🎯 После пуша в GitHub

Проверьте на GitHub:
1. Откройте репозиторий
2. Перейдите в `packages/frontend/storybook/`
3. Убедитесь что все файлы на месте
4. Проверьте что коммит виден в истории

---

## 💡 Полезные команды

```bash
# Просмотреть статус
git status

# Просмотреть что будет закоммичено
git diff --staged

# Отменить последний коммит (если ошиблись)
git reset --soft HEAD~1

# Просмотреть историю
git log --oneline
```

---

## 🆘 Если что-то пошло не так

### Проблема: Файлы не копируются

```bash
# Проверить что файлы существуют
ls -la src/app/pages/directories.tsx
ls -la src/app/components/directory-item-detail.tsx

# Создать директории вручную
mkdir -p packages/frontend/storybook/src/app/pages
```

### Проблема: Git не видит изменения

```bash
# Принудительно добавить
git add -f packages/frontend/storybook/

# Проверить .gitignore
cat .gitignore
```

### Проблема: Конфликт при push

```bash
# Получить последние изменения
git pull origin main

# Решить конфликты
# Затем
git add .
git commit -m "fix: resolve conflicts"
git push origin main
```

---

## 📝 Рекомендуемое сообщение коммита

```bash
git commit -m "feat(directories): complete prototype for archpad integration

## 🎯 Features
- Directory list page with collapsible categories sidebar
- Item detail view with unified layout (no tabs)
- Relations table (full width 3/3) with Sheet for adding
- Reusable DirectoryItemForm component
- LibraryBig icons, tooltips, hover menus

## 📦 Structure
- Moved to packages/frontend/storybook/
- Comprehensive documentation included
- Storybook stories for all components
- TypeScript types for all entities

## 🔌 Integration Ready
- Compatible with archpad patterns (shadcn/ui, RTK Query)
- Placeholder TODOs for API calls
- Ready for portal integration

Closes #XXX"
```

---

**Выберите любой вариант и следуйте инструкциям!** 🚀

Рекомендую **Вариант 1** (автоматический скрипт) для быстроты и надежности.
