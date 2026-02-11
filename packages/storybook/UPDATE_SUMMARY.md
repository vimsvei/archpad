# ✅ Обновление: Интеграция с реальными компонентами archpad

## Что сделано

Обновил прототип с учетом реальных компонентов и паттернов из вашего проекта `archpad/packages/frontend/portal`.

## 🎯 Ключевые технологии

- ✅ **shadcn/ui** - все UI компоненты (@radix-ui)
- ✅ **lucide-react** - иконки
- ✅ **Tailwind CSS v4** - стилизация
- ✅ **React Router v7** - навигация
- ✅ **Sonner** - toast notifications
- ✅ **Storybook** - документация компонентов
- ❌ **Material UI** - удалён (не используется)

---

## 🎯 Ключевые изменения

### 1. **Страница списка справочников** (`/src/app/pages/directories.tsx`)

**Добавлено:**
- ✅ Иконка `LibraryBig` для каждой строки (как в `DirectoryListPage`)
- ✅ Колонка "По умолчанию" с Checkbox (disabled)
- ✅ Tooltips на кнопках действий (Refresh, Upload, Create)
- ✅ Sheet для создания элемента вместо inline диалога
- ✅ Кнопка Import/Upload с placeholder функционалом
- ✅ Улучшенные стили таблицы (opacity-0 на hover меню, h-8 для кнопок)

**Паттерны из archpad:**
```tsx
// Tooltip + Button pattern
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <RefreshCcw className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Обновить</TooltipContent>
</Tooltip>

// Sheet для создания
<Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
  <SheetTrigger asChild>
    <Button size="icon"><Plus /></Button>
  </SheetTrigger>
  <SheetContent>...</SheetContent>
</Sheet>

// Hover menu в таблице
<Button className="opacity-0 group-hover:opacity-100 h-8 w-8">
  <MoreHorizontal />
</Button>
```

---

### 2. **Карточка элемента справочника** (`/src/app/components/directory-item-detail.tsx`)

**Новая архитектура:**
- ❌ **Убраны вкладки** (General/Relations)
- ✅ **Единая страница** с прокруткой
- ✅ **Layout структура**:
  1. Top: Description (2/3) + Properties (1/3) grid
  2. Middle: Relations table (full width 3/3)
  3. Bottom: Metadata (created/updated)

**Добавление связей через Sheet:**
- ✅ Кнопка "Add relation" открывает **правую панель** (Sheet)
- ✅ Sheet с формой:
  - Target Directory (Select)
  - Target Item (Select - disabled until directory selected)
  - Relation Type (Select: uses, has, depends, association, hierarchy)
  - Actions: Cancel / Add Relation
- ✅ Width: 400-500px

**Паттерны из archpad:**
```tsx
// Sheet для добавления связи
<Sheet open={addRelationOpen} onOpenChange={setAddRelationOpen}>
  <SheetTrigger asChild>
    <Button variant="outline" size="sm">
      <Plus className="size-4 mr-2" />
      Add relation
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="w-[400px] sm:w-[500px]">
    <SheetHeader>
      <SheetTitle>Add Relation</SheetTitle>
      <SheetDescription>Create a link to another directory item</SheetDescription>
    </SheetHeader>
    <AddRelationForm onSubmit={handleAddRelation} onCancel={...} />
  </SheetContent>
</Sheet>

// Controlled form with state
const [formData, setFormData] = useState({
  code: item.code || '',
  name: item.name || '',
  // ...
});
```

---

### 3. **Типы** (`/src/@types/directory.ts`)

**Обновлено:**
```typescript
export type DirectoryItem = {
  id: string;
  code: string;
  name: string;
  description?: string;
  color?: string;
  order?: number;
  byDefault?: boolean;      // ✅ NEW
  createdAt?: string;       // ✅ NEW
  updatedAt?: string;       // ✅ NEW
  relations?: DirectoryRelation[];
};

export type DirectoryRelation = {
  id: string;
  targetDirectoryName: string;  // Simplified from your schema
  targetItemName: string;
  relationType: string;  // 'uses', 'has', 'depends', etc.
};
```

---

### 4. **Storybook Stories**

**Обновлено** `directory-item-detail.stories.tsx`:
- ✅ 4 варианта: WithRelations, NoRelations, LicenseType, MinimalData
- ✅ Добавлены `createdAt`, `updatedAt`, `byDefault` в моки
- ✅ Actions для `onBack`, `onSave`
- ✅ Улучшенные названия stories

---

## 📊 Архитектура: До и После

### До (с вкладками)
```
┌────────────────────────┐
│ [General] [Relations]  │ ← Tabs
├────────────────────────┤
│ Description │ Props    │
│─────────────┴──────────│
│ (Active tab content)   │
└────────────────────────┘
```

### После (без вкладок, Sheet для добавления)
```
┌────────────────────────┐
│ Description │ Props    │ ← 2/3 + 1/3
├────────────────────────┤
│ Relations Table (3/3)  │ ← Full width
│ [+ Add] → Sheet opens  │
├────────────────────────┤
│ Metadata               │
└────────────────────────┘

Sheet (right side):
┌──────────────┐
│ Add Relation │
│ [Dir ▼]      │
│ [Item ▼]     │
│ [Type ▼]     │
│ [Cancel][Add]│
└──────────────┘
```

---

## 🎨 Ключевые стили из archpad

### Таблица

```tsx
// Icon column
<th className="w-12">
<LibraryBig className="size-4 text-foreground opacity-80" />

// Code column (clickable, primary color)
<code className="text-sm font-mono text-primary hover:underline">
  {item.code || '—'}
</code>

// Checkbox column
<div className="flex items-center justify-center">
  <Checkbox checked={value} disabled />
</div>

// Hover menu button
<Button className="opacity-0 group-hover:opacity-100 h-8 w-8">
```

### Форма

```tsx
// Readonly field (bg-muted)
<div className="h-8 px-3 flex items-center bg-muted border border-border rounded-md">
  {value}
</div>

// Color picker
<Input type="color" className="w-full h-10 p-1 cursor-pointer" />
<Input placeholder="#000000" className="h-8 font-mono" />

// Checkbox with label
<Checkbox id="byDefault" checked={value} />
<Label htmlFor="byDefault" className="cursor-pointer">
  By Default
</Label>
```

### Sheet для форм

```tsx
<SheetContent side="right" className="w-[400px] sm:w-[500px]">
  <SheetHeader>
    <SheetTitle>Title</SheetTitle>
    <SheetDescription>Description</SheetDescription>
  </SheetHeader>
  <form className="space-y-6 mt-6">
    {/* Form fields */}
    <div className="flex justify-end gap-2 pt-4 border-t">
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Submit</Button>
    </div>
  </form>
</SheetContent>
```

---

## 🔄 API Integration Placeholders

В коде добавлены TODO комментарии для интеграции с API:

```tsx
// directory-item-detail.tsx
const handleDeleteRelation = (relationId: string, relationName: string) => {
  if (confirm(`Удалить связь с "${relationName}"?`)) {
    toast.success('Связь удалена');
    // TODO: implement delete relation API call
  }
};

const handleAddRelation = (values: { ... }) => {
  console.log('Adding relation:', values);
  toast.success('Связь добавлена');
  setAddRelationOpen(false);
  // TODO: implement create relation API call
};
```

---

## 📝 Документация

Все обновления отражены в:
- ✅ `DESIGN_DOCUMENTATION.md` - полностью переписан раздел "Directory Item Detail"
- ✅ `directory-item-detail.stories.tsx` - обновлены названия и структура stories
- ✅ Типы в `/src/@types/directory.ts`

---

## 🚀 Что дальше

### Для интеграции в archpad:

1. **Скопировать обновленные компоненты:**
   ```bash
   cp src/app/pages/directories.tsx packages/frontend/portal/src/app/pages/
   cp src/app/components/directory-item-detail.tsx packages/frontend/portal/src/app/components/
   ```

2. **Заменить моки на RTK Query:**
   ```tsx
   // Было:
   const selectedDirectory = getDirectoryById(selectedDirectoryId);
   
   // Стало:
   const { data: items } = useGetDirectoryItemsQuery(selectedDirectoryId);
   ```

3. **Добавить реальные мутации:**
   ```tsx
   const [createItem] = useCreateDirectoryItemMutation();
   const [updateItem] = useUpdateDirectoryItemMutation();
   const [deleteItem] = useDeleteDirectoryItemMutation();
   const [createLink] = useCreateDirectoryLinkMutation();
   const [deleteLink] = useDeleteDirectoryLinkMutation();
   ```

4. **Подключить i18n:**
   ```tsx
   // Добавить переводы для новых ключей:
   - table.by-default
   - action.refresh
   - action.upload
   - sheet.add-relation.title
   - sheet.add-relation.description
   ```

---

## 📦 Готовые к копированию файлы

```
src/app/pages/directories.tsx                  # ✅ Готов
src/app/components/directory-item-detail.tsx   # ✅ Готов (без вкладок, с Sheet)
src/app/components/directory-item-detail.stories.tsx  # ✅ Готов
src/@types/directory.ts                        # ✅ Готов
```

---

## 💡 Ключевые улучшения

### UX
- ✅ Нет переключения вкладок - весь контент на одной странице
- ✅ Sheet не блокирует основной контент (можно видеть таблицу при добавлении)
- ✅ Меньше кликов для просмотра всех данных
- ✅ Естественный flow: читаем → редактируем → добавляем связи

### Developer Experience
- ✅ Проще state management (нет состояния активной вкладки)
- ✅ Меньше условной логики
- ✅ Четкое разделение: основная форма + Sheet для добавления
- ✅ Легче тестировать (один компонент вместо двух режимов)

---

## 💡 Совместимость

Все компоненты используют те же паттерны, что и в вашем archpad:
- ✅ Tooltip + Button pattern
- ✅ Sheet для side panels
- ✅ Controlled forms с useState
- ✅ Toast notifications (sonner)
- ✅ shadcn/ui компоненты
- ✅ Consistent styling (h-8, bg-muted, border-border)

---

**Готово к передаче в разработку! 🎉**