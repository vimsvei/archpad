# Integration Guide - ArchPad Frontend Portal

## 🎯 Цель

Интеграция готовых дизайнов страниц **Components** и **Directories** из прототипа в основной проект `archpad/packages/frontend/portal`.

---

## 📦 Что передается в разработку

### 1. **Storybook для демонстрации компонентов**

```bash
# Запустить Storybook локально
pnpm storybook

# Открыть http://localhost:6006
```

**Доступные stories:**
- `Pages/Component Detail` - 3 варианта (Default, With Many Relations, Minimal Data)
- `Pages/Directory Item Detail` - 3 варианта (State Item, No Relations, License Type)

### 2. **Полная документация дизайна**

Файл: `/DESIGN_DOCUMENTATION.md`

Содержит:
- Design System (цвета, типографика, spacing)
- Описание всех страниц с аннотациями
- Layout структуры
- UI компоненты стайл-гайд
- Технические детали реализации
- Migration checklist

---

## 📁 Файлы для переноса

### Основные компоненты

```
src/app/pages/
├── components.tsx              # ✅ Страница списка компонентов
└── directories.tsx             # ✅ Страница списка справочников

src/app/components/
├── component-detail-v3.tsx     # ✅ Карточка компонента (финальная версия)
├── directory-item-detail.tsx   # ✅ Карточка элемента справочника
└── data-table.tsx              # ⚠️  Уже есть в archpad, может потребоваться merge
```

### Mock данные (для тестирования)

```
src/lib/
├── mock-data.ts                # Моки для компонентов
└── mock-directories.ts         # Моки для справочников

src/@types/
├── application-component.ts    # TypeScript типы для компонентов
└── directory.ts                # TypeScript типы для справочников
```

### Storybook конфигурация

```
.storybook/
├── main.ts                     # Конфигурация Storybook
└── preview.tsx                 # Глобальные декораторы

src/app/components/
├── component-detail-v3.stories.tsx
└── directory-item-detail.stories.tsx
```

---

## 🔧 Шаги интеграции

### Шаг 1: Копирование файлов

```bash
# В вашем проекте archpad
cd packages/frontend/portal

# Скопировать основные страницы
cp <prototype>/src/app/pages/components.tsx src/app/pages/
cp <prototype>/src/app/pages/directories.tsx src/app/pages/

# Скопировать компоненты детальных карточек
cp <prototype>/src/app/components/component-detail-v3.tsx src/app/components/
cp <prototype>/src/app/components/directory-item-detail.tsx src/app/components/

# Скопировать типы
cp <prototype>/src/@types/application-component.ts src/@types/
cp <prototype>/src/@types/directory.ts src/@types/

# Скопировать моки (опционально, для тестирования)
cp <prototype>/src/lib/mock-data.ts src/lib/
cp <prototype>/src/lib/mock-directories.ts src/lib/
```

### Шаг 2: Проверка зависимостей

Убедитесь, что в `package.json` установлены:

```json
{
  "dependencies": {
    "@radix-ui/react-*": "все shadcn/ui компоненты",
    "lucide-react": "^0.487.0",
    "sonner": "^2.0.3",
    "react-router": "^7.13.0",
    "react-resizable-panels": "^2.1.7"
  }
}
```

### Шаг 3: Настройка путей импорта

Проверьте, что у вас настроен alias `@/` в `vite.config.ts` или `tsconfig.json`:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Шаг 4: Интеграция с существующей навигацией

Добавьте новые маршруты в ваш роутер:

```tsx
// src/app/routes.tsx или аналогичный файл
import { ComponentsPage } from './pages/components';
import { DirectoriesPage } from './pages/directories';

const routes = [
  {
    path: '/components',
    element: <ComponentsPage />,
  },
  {
    path: '/directories',
    element: <DirectoriesPage />,
  },
  // ... остальные маршруты
];
```

### Шаг 5: Подключение Storybook (опционально)

```bash
# Установить Storybook зависимости
pnpm add -D @storybook/react @storybook/react-vite @storybook/addon-essentials storybook

# Скопировать конфигурацию
cp -r <prototype>/.storybook .storybook/
cp <prototype>/src/app/components/*.stories.tsx src/app/components/

# Добавить скрипты в package.json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Шаг 6: Замена моков на реальные API

В финальной версии замените вызовы к mock-data на реальные API запросы:

```tsx
// Было:
import { mockComponents } from '@/lib/mock-data';

// Стало:
import { useComponents } from '@/api/components';

function ComponentsPage() {
  const { data: components, isLoading } = useComponents();
  // ...
}
```

---

## ⚠️ Важные моменты

### 1. **Совместимость с существующим кодом**

Если в `archpad` уже есть компоненты с такими же именами:

```bash
# Вариант А: Переименовать новые компоненты
component-detail-v3.tsx → component-detail-new.tsx

# Вариант Б: Создать отдельную ветку для тестирования
git checkout -b feature/new-design
```

### 2. **Sidebar интеграция**

Страницы используют `SidebarProvider` из shadcn/ui. Если у вас свой layout:

```tsx
// Обернуть страницы в существующий layout
<YourLayout>
  <SidebarProvider>
    <ComponentsPage />
  </SidebarProvider>
</YourLayout>
```

### 3. **Темная тема**

Дизайн рассчитан на темную тему. Проверьте CSS переменные в `src/styles/theme.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #111111;
  --border: #262626;
  /* ... остальные переменные */
}
```

### 4. **React Router версия**

Проект использует `react-router` v7 (Data mode). Если у вас другая версия:

```tsx
// Адаптировать под react-router-dom v6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

---

## 🧪 Тестирование

### Запуск Storybook

```bash
pnpm storybook
```

Откройте http://localhost:6006 и проверьте:
- ✅ Component Detail отображается корректно
- ✅ Directory Item Detail работает
- ✅ Все интерактивные элементы функционируют
- ✅ Стили применены правильно

### Тестирование в приложении

1. Запустите dev сервер: `pnpm dev`
2. Перейдите на `/components`
3. Проверь��е:
   - Таблица компонентов
   - Клик по строке → открытие карточки
   - Все поля редактируемы
   - Кнопки работают (пока mock actions)

4. Перейдите на `/directories`
5. Проверьте:
   - Левый sidebar со списком справочников
   - Таблица элементов справочника
   - Карточка элемента с Relations

---

## 📋 Чеклист готовности к production

- [ ] Все файлы скопированы
- [ ] Импорты работают без ошибок
- [ ] shadcn/ui компоненты установлены
- [ ] Маршруты добавлены в router
- [ ] Mock данные заменены на API вызовы
- [ ] Добавлены loading состояния
- [ ] Добавлена обработка ошибок
- [ ] Формы отправляют данные на backend
- [ ] Toast уведомления работают
- [ ] Storybook собирается без ошибок
- [ ] TypeScript проверки проходят
- [ ] Тесты написаны (если требуется)

---

## 🐛 Troubleshooting

### Проблема: "Cannot find module '@/app/components/ui/...'"

**Решение:** Проверьте, что все shadcn/ui компоненты установлены:

```bash
npx shadcn-ui@latest add button input label textarea select badge
npx shadcn-ui@latest add dropdown-menu tooltip separator
```

### Проблема: "Styles not applied"

**Решение:** Убедитесь, что `index.css` импортирован в main entry point:

```tsx
// src/main.tsx
import './index.css';
```

### Проблема: "Storybook не запускается"

**Решение:** 
1. Очистите кеш: `rm -rf node_modules .storybook-cache`
2. Переустановите: `pnpm install`
3. Проверьте версии в package.json

---

## 📞 Поддержка

При возникновении вопросов:

1. Проверьте `DESIGN_DOCUMENTATION.md` - там все детали
2. Посмотрите stories в Storybook - live примеры
3. Проверьте console на ошибки импортов
4. Сравните структуру файлов с документацией

---

## 🚀 Следующие шаги

После успешной интеграции:

1. **Backend интеграция**
   - Подключить API endpoints
   - Добавить React Query / SWR для data fetching
   - Реализовать optimistic updates

2. **Расширение функционала**
   - Поиск и фильтрация
   - Bulk операции
   - Export/Import

3. **Оптимизация**
   - Виртуализация таблиц (react-virtual)
   - Lazy loading
   - Code splitting

4. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - Focus management

---

**Удачной интеграции! 🎉**
