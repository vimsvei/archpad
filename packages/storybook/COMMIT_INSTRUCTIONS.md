# 📤 Инструкция для коммита в GitHub

## ✅ Что готово

Я подготовил все файлы для миграции в `packages/frontend/storybook/` и коммита в GitHub.

---

## 🚀 БЫСТРЫЙ СТАРТ (3 команды)

```bash
# 1. Запустить миграцию
chmod +x migrate-to-packages.sh && ./migrate-to-packages.sh

# 2. Закоммитить
git add packages/frontend/storybook/ .gitignore migrate-to-packages.sh MIGRATION_GUIDE.md QUICK_START.md COMMIT_INSTRUCTIONS.md
git commit -m "feat: directories prototype ready for archpad integration"

# 3. Отправить в GitHub
git push origin main
```

**Готово!** 🎉

---

## 📋 Подробные инструкции

### Шаг 1: Миграция файлов

Я создал скрипт `migrate-to-packages.sh` который автоматически:
- ✅ Создаст структуру `packages/frontend/storybook/`
- ✅ Скопирует все source файлы из `src/`
- ✅ Скопирует всю документацию
- ✅ Скопирует конфигурационные файлы
- ✅ Создаст README в целевой директории

**Запустите:**

```bash
chmod +x migrate-to-packages.sh
./migrate-to-packages.sh
```

Вы увидите:
```
🚀 Starting migration to packages/frontend/storybook...
📁 Creating directory structure...
📋 Copying source files...
📚 Copying documentation...
⚙️  Copying config files...
✅ Migration completed!
```

### Шаг 2: Проверка

```bash
# Перейти в новую директорию
cd packages/frontend/storybook

# Проверить структуру
ls -la

# Вернуться в корень
cd ../..
```

### Шаг 3: Добавить в Git

```bash
# Добавить перемещенные файлы
git add packages/frontend/storybook/

# Добавить вспомогательные файлы
git add .gitignore
git add migrate-to-packages.sh
git add MIGRATION_GUIDE.md
git add QUICK_START.md
git add COMMIT_INSTRUCTIONS.md

# Проверить что будет закоммичено
git status
```

### Шаг 4: Создать коммит

#### Вариант A: Короткое сообщение

```bash
git commit -m "feat: directories prototype ready for archpad integration"
```

#### Вариант B: Подробное сообщение (РЕКОМЕНДУЕТСЯ)

```bash
git commit -m "feat(directories): complete prototype for archpad portal integration

## 🎯 Features
- Directory list page with collapsible categories sidebar
- Item detail view with unified layout (no tabs)
- Relations table (full width 3/3) with Sheet for adding
- Reusable DirectoryItemForm component
- LibraryBig icons, tooltips, hover actions
- Removed Material UI (using lucide-react for icons only)

## 📦 Components
- DirectoriesPage: Main list with search, filters, actions
- DirectoryItemDetail: Unified view without tabs
- DirectoryItemForm: Reusable create/edit form
- Relations: Full-width table with Sheet for adding

## 📚 Documentation
- DESIGN_DOCUMENTATION.md: Complete design system docs
- UPDATE_SUMMARY.md: Summary of all changes
- INTEGRATION_GUIDE.md: Step-by-step integration guide
- QUICK_REFERENCE.md: Developer cheatsheet
- Storybook stories for all components

## 🔌 Integration Ready
- Compatible with archpad patterns (shadcn/ui, RTK Query)
- Placeholder TODOs for API integration
- TypeScript types for all entities
- Controlled forms with useState
- Toast notifications (sonner)

## 🗂️ Structure
Moved to: packages/frontend/storybook/
- src/app/pages/directories.tsx
- src/app/components/directory-item-*.tsx
- src/@types/directory.ts
- src/lib/mock-directories.ts
- Complete documentation

Ready for integration into archpad portal! 🚀"
```

### Шаг 5: Отправить в GitHub

```bash
git push origin main
```

Если branch другой:
```bash
git push origin your-branch-name
```

---

## 🔍 Проверка на GitHub

После push:

1. Откройте ваш репозиторий на GitHub
2. Перейдите в `packages/frontend/storybook/`
3. Проверьте что все файлы на месте:
   - ✅ `src/app/pages/directories.tsx`
   - ✅ `src/app/components/directory-item-detail.tsx`
   - ✅ `src/app/components/directory-item-form.tsx`
   - ✅ `src/app/components/directory-item-detail.stories.tsx`
   - ✅ `DESIGN_DOCUMENTATION.md`
   - ✅ `UPDATE_SUMMARY.md`
   - ✅ И все остальные файлы

4. Просмотрите коммит в истории
5. Убедитесь что всё корректно

---

## 📁 Что будет в packages/frontend/storybook/

```
packages/frontend/storybook/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── directories.tsx          ← Главная страница
│   │   ├── components/
│   │   │   ├── directory-item-detail.tsx      ← Карточка элемента
│   │   │   ├── directory-item-form.tsx        ← Форма
│   │   │   ├── directory-item-detail.stories.tsx  ← Stories
│   │   │   ├── app-sidebar.tsx
│   │   │   └── ui/                      ← shadcn/ui компоненты
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── @types/
│   │   └── directory.ts                 ← TypeScript типы
│   ├── lib/
│   │   └── mock-directories.ts          ← Моковые данные
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── hooks/
├── DESIGN_DOCUMENTATION.md              ← Дизайн система
├── UPDATE_SUMMARY.md                    ← Сводка изменений
├── INTEGRATION_GUIDE.md                 ← Руководство интеграции
├── QUICK_REFERENCE.md                   ← Быстрая справка
├── README.md                            ← Автосгенерированный README
├── package.json
├── vite.config.ts
└── postcss.config.mjs
```

---

## 🎯 Следующие шаги после коммита

1. **Уведомить команду** о готовом прототипе
2. **Поделиться ссылкой** на GitHub repository
3. **Запланировать ревью** кода с archpad командой
4. **Обсудить интеграцию** в portal приложение

---

## 💡 Полезные команды Git

```bash
# Просмотреть статус
git status

# Просмотреть что будет закоммичено
git diff --staged

# Просмотреть историю
git log --oneline --graph

# Просмотреть конкретный коммит
git show HEAD

# Отменить последний коммит (но сохранить изменения)
git reset --soft HEAD~1

# Изменить последний коммит message
git commit --amend -m "New message"

# Принудительный push (ОСТОРОЖНО!)
git push -f origin main
```

---

## 🆘 Решение проблем

### Проблема: Permission denied при push

```bash
# Проверить remote URL
git remote -v

# Если нужно, переключиться на SSH
git remote set-url origin git@github.com:username/repo.git
```

### Проблема: Конфликт при push

```bash
# Получить последние изменения
git pull origin main --rebase

# Решить конфликты
# Затем
git add .
git rebase --continue
git push origin main
```

### Проблема: Файлы не добавляются

```bash
# Проверить .gitignore
cat .gitignore

# Принудительно добавить
git add -f packages/frontend/storybook/
```

---

## ✅ Checklist перед push

- [ ] Запущен `migrate-to-packages.sh`
- [ ] Все файлы скопированы в `packages/frontend/storybook/`
- [ ] Выполнена команда `git add`
- [ ] Создан коммит с осмысленным сообщением
- [ ] Проверено `git status` - нет лишних файлов
- [ ] Готов к `git push`

---

## 🎉 Финальная команда

**Все в одной строке:**

```bash
chmod +x migrate-to-packages.sh && ./migrate-to-packages.sh && git add packages/frontend/storybook/ .gitignore migrate-to-packages.sh *.md && git commit -m "feat: directories prototype ready for archpad integration" && git push origin main
```

**Готово! Ваш код в GitHub!** 🚀

---

## 📞 Нужна помощь?

Если что-то пошло не так:
1. Проверьте `MIGRATION_GUIDE.md`
2. Смотрите `QUICK_START.md`
3. Используйте `git status` для диагностики

**Удачи!** 🍀