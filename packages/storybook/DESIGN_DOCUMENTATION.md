# Enterprise Architecture Management Tool - Design Documentation

## 📋 Overview

Профессиональный B2B инструмент для управления enterprise архитектурой с темной темой, вдохновленный дизайном Atlassian, Linear и SAP Fiori Dark.

**Ключевые характеристики дизайна:**
- Темная тема с зелеными акцентами
- Слоистые поверхности (layered surfaces)
- Тонкие границы между элементами
- Плотные таблицы данных
- Коллапсируемая боковая панель

---

## 🎨 Design System

### Цветовая палитра

```css
/* Background */
--background: #0a0a0a;          /* Основной фон */
--card: #111111;                 /* Фон карточек */
--muted: #1a1a1a;                /* Приглушенный фон для полей */

/* Borders */
--border: #262626;               /* Основные границы */
--border/50: rgba(38,38,38,0.5); /* Полупрозрачные границы */

/* Text */
--foreground: #fafafa;           /* Основной текст */
--muted-foreground: #a1a1aa;     /* Вторичный текст */

/* Accent */
--primary: #22c55e;              /* Зеленый акцент */
--accent: #14532d;               /* Акцент для hover состояний */
```

### Типографика

- **Заголовки**: `font-semibold text-lg` (18px, 600 weight)
- **Подзаголовки**: `text-sm font-semibold` (14px, 600 weight)
- **Основной текст**: `text-sm` (14px)
- **Мелкий текст**: `text-xs` (12px)
- **Labels**: `text-xs text-muted-foreground`
- **Code**: `font-mono`

### Spacing

- **Gaps между секциями**: `gap-8` (32px)
- **Gaps между элементами**: `gap-6` (24px)
- **Gaps в формах**: `gap-4` (16px)
- **Padding контейнеров**: `px-6 py-4` (24px/16px)
- **Padding полей**: `px-3` (12px)

### UI Components Style

#### Input Fields
```tsx
className="h-8 border-border bg-background text-sm"
```

#### Readonly Fields (Properties)
```tsx
className="h-8 px-3 flex items-center bg-muted border border-border rounded-md"
```

#### Textarea
```tsx
className="border-border bg-background text-sm resize-none font-mono"
```

#### Tables
```tsx
// Header
className="bg-muted/30 text-xs font-semibold text-muted-foreground px-6 py-3"

// Row
className="border-t border-border hover:bg-muted/20"

// Cell
className="px-6 py-4 text-sm"
```

---

## 📄 Page: Components List

**File**: `/src/app/pages/components.tsx`

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ App Sidebar (collapsible)                           │
├─────────────────────────────────────────────────────┤
│ Header: "Components" + Actions                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Dense Data Table                                   │
│  ┌──────┬────────────┬──────┬────────┬──────┐      │
│  │ Code │ Name       │ State│ License│ Arch │      │
│  ├──────┼────────────┼──────┼────────┼──────┤      │
│  │ CRM  │ CRM System │ ...  │ ...    │ ...  │      │
│  └──────┴────────────┴──────┴────────┴──────┘      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Key Features

1. **Header**
   - Title: "Components"
   - Search bar
   - "Add Component" button
   - View switcher (v1/v2/v3)

2. **Data Table**
   - Compact row height: `py-3`
   - Hover state: `hover:bg-muted/20`
   - Sortable columns
   - Click row to open detail view

3. **Columns**
   - Code (monospace)
   - Name
   - State (colored badge)
   - License Type
   - Architecture Style
   - Critical Level

---

## 📄 Page: Component Detail (v3)

**File**: `/src/app/components/component-detail-v3.tsx`

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Header: [←] Component Name    [Edit] [Delete]       │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌───────────────────────┬───────────────────────┐  │
│ │ Description (2/3)     │ Properties (1/3)      │  │
│ │                       │ ┌───────────────────┐ │  │
│ │ [Textarea]            │ │ Code              │ │  │
│ │                       │ │ State             │ │  │
│ │                       │ │ License Type      │ │  │
│ │                       │ │ Architecture      │ │  │
│ │                       │ │ Critical Level    │ │  │
│ │                       │ └───────────────────┘ │  │
│ └───────────────────────┴───────────────────────┘  │
│                                                      │
│ Relations (horizontal scroll)                       │
│ ┌──────────┬──────────┬──────────┐                 │
│ │ Business │ App      │ Tech     │ ← Scroll →      │
│ └──────────┴──────────┴──────────┘                 │
│                                                      │
│ Flows Table                                         │
│ ┌──────────────────────────────────────────┐       │
│ │ Direction │ Name │ Source │ Target       │       │
│ └──────────────────────────────────────────┘       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Key Features

1. **Top Section (Grid 3 columns)**
   - **Left 2/3**: Description
     - Large textarea
     - Monospace font
     - Min height: 200px
   
   - **Right 1/3**: Properties
     - Sticky positioning
     - Read-only selects
     - Compact height: `h-8`

2. **Relations Section**
   - Horizontal scroll container
   - Priority layers: Application, Technology always visible
   - Conditional layers: Business (if has data)
   - Each layer card: 340px width
   - Collapsible relation groups with counts
   - 3-line compact item display:
     - Line 1: Name
     - Line 2: Code + Description start
     - Line 3: Description continuation
   - Status indicator (colored dot)
   - Hover menu on each item

3. **Flows Section**
   - Full width table
   - Badge for direction (Incoming/Outgoing)
   - Hover state on rows

### Component Interaction Patterns

```tsx
// Collapsible relation group
const [isOpen, setIsOpen] = useState(true);

// Item with status indicator
<div style={{ backgroundColor: item.state?.color }} />

// Hover menu
<DropdownMenu>
  <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100">
    <MoreHorizontal />
  </DropdownMenuTrigger>
</DropdownMenu>
```

---

## 📄 Page: Directories List

**File**: `/src/app/pages/directories.tsx`

### Layout Structure

```
┌──────────┬─────────────────────┬────────────────────┐
│ App      │ Directories         │ Items Table        │
│ Sidebar  │ Sidebar (left)      │ (center)           │
│          │                     │                    │
│          │ [Search]            │ Header + Actions   │
│          │                     │                    │
│          │ Categories:         │ ┌──────┬────────┐ │
│          │ • Core Dicts        │ │ Code │ Name   │ │
│          │ • Attributes        │ ├──────┼────────┤ │
│          │ • References        │ │ ...  │ ...    │ │
│          │                     │ └──────┴────────┘ │
└──────────┴─────────────────────┴────────────────────┘
```

### Key Features

1. **Left Sidebar (Directories List)**
   - Width: 280px
   - Collapsible categories
   - Count badges
   - Active state highlighting
   - Search filter

2. **Center Table (Directory Items)**
   - Columns: Code, Name, Color, Order
   - Color preview dot
   - Click row to open detail

3. **Integration**
   - Uses same `SidebarProvider` as components page
   - Consistent header style
   - Same action buttons pattern

---

## 📄 Page: Directory Item Detail

**File**: `/src/app/components/directory-item-detail.tsx`

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Header: [←] Item Name (ID)    [Delete] [Save]      │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌───────────────────────┬───────────────────────┐  │
│ │ Description (2/3)     │ Properties (1/3)      │  │
│ │                       │ ┌───────────────────┐ │  │
│ │ [Textarea - Markdown] │ │ Directory (readonly)│ │  │
│ │                       │ │ Code              │ │  │
│ │                       │ │ Name              │ │  │
│ │                       │ │ Color (picker)    │ │  │
│ │                       │ │ Order             │ │  │
│ │                       │ │ [✓] By Default    │ │  │
│ │                       │ └───────────────────┘ │  │
│ └───────────────────────┴───────────────────────┘  │
│                                                      │
│ Relations (Full Width 3/3)                          │
│ ┌──────────────────────────────────────────────┐   │
│ │ Relations (2) [+ Add relation]               │   │
│ ├──────────────────────────────────────────────┤   │
│ │ Directory │ Item │ Type │ [×]                │   │
│ │ States    │ Act. │ uses │ [×]                │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ Metadata (Created/Updated)                          │
│                                                      │
└─────────────────────────────────────────────────────┘

Right Sheet (Add Relation):
┌──────────────────┐
│ Add Relation     │
├──────────────────┤
│ Target Directory │
│ [Select ▼]       │
│                  │
│ Target Item      │
│ [Select ▼]       │
│                  │
│ Relation Type    │
│ [Select ▼]       │
│                  │
│ [Cancel] [Add]   │
└──────────────────┘
```

### Key Features

1. **No tabs - single page layout**
   - All content on one scrollable page
   - Description + Properties at top (2/3 + 1/3 grid)
   - Relations table below (full width 3/3)

2. **Always editable**
   - No separate edit/view modes
   - Save button in header
   - All fields are controlled inputs

3. **Top Grid Layout**
   - **Left 2/3**: Description
     - Markdown support
     - Monospace font for editing
     - 8 rows height
   
   - **Right 1/3**: Properties
     - **Directory**: Readonly with `bg-muted` style
     - **Code**: Text input, monospace
     - **Name**: Text input
     - **Color**: 
       - Color picker (height: 40px)
       - Hex text input
     - **Order**: Number input
     - **By Default**: Checkbox

4. **Relations Section (Full Width)**
   - Section header:
     - Link2 icon + "Relations" title
     - Badge with count
     - "Add relation" button → opens Sheet
   
   - **Sheet for adding relations** (right side):
     - Width: 400-500px
     - Title: "Add Relation"
     - Description: "Create a link to another directory item"
     - Form fields:
       - Target Directory (Select)
       - Target Item (Select, disabled until directory selected)
       - Relation Type (Select): uses, has, depends, association, hierarchy
     - Actions: Cancel / Add Relation
   
   - **Relations Table**:
     - Full width
     - Columns: Directory, Item, Relation Type, Actions
     - Delete button on hover (opacity-0 → opacity-100)
     - Empty state with icon and description

5. **Properties Field Styles**
   ```tsx
   // Readonly
   <div className="h-8 px-3 flex items-center bg-muted border border-border rounded-md">
     {value}
   </div>
   
   // Editable
   <Input className="h-8 border-border bg-background" />
   
   // Checkbox
   <Checkbox checked={value} onCheckedChange={...} />
   <Label className="text-xs text-muted-foreground cursor-pointer">
     By Default
   </Label>
   ```

6. **Sheet Component Pattern**
   ```tsx
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
         <SheetDescription>...</SheetDescription>
       </SheetHeader>
       <AddRelationForm ... />
     </SheetContent>
   </Sheet>
   ```

7. **Metadata Footer**
   - Created/Updated timestamps
   - Border-top separator
   - Muted text styling
   - At the bottom after Relations

---

## 🔧 Technical Implementation Notes

### File Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── components.tsx           # Components list page
│   │   └── directories.tsx          # Directories list page
│   ├── components/
│   │   ├── component-detail-v3.tsx  # Component detail card
│   │   ├── directory-item-detail.tsx # Directory item card
│   │   ├── data-table.tsx           # Reusable table component
│   │   └── ui/                      # shadcn/ui components
│   └── styles/
│       ├── theme.css                # CSS variables
│       └── fonts.css                # Font imports
├── lib/
│   ├── mock-data.ts                 # Component mock data
│   └── mock-directories.ts          # Directory mock data
└── @types/
    ├── application-component.ts     # Component types
    └── directory.ts                 # Directory types
```

### Key Dependencies

```json
{
  "@radix-ui/react-*": "shadcn/ui components",
  "lucide-react": "Icons",
  "sonner": "Toast notifications",
  "react-router": "Routing",
  "tailwindcss": "v4.0 styling"
}
```

### State Management

- Local state with `useState` for editing
- Props drilling for data flow
- Mock data from lib files
- Toast notifications for actions

### Responsive Behavior

- Grid layouts: `grid-cols-3` (desktop)
- Sidebar: Collapsible on mobile
- Tables: Horizontal scroll on overflow
- Relations: Always scrollable horizontally

---

## 🚀 Running Storybook

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### Available Stories

1. **Component Detail V3**
   - Default state
   - With many relations
   - Minimal data

2. **Directory Item Detail**
   - State item with relations
   - No relations
   - License type with markdown

---

## 📝 Design Principles

### 1. **Consistency**
- All forms use same input heights (h-8)
- All tables use same padding (px-6 py-4)
- All borders use same color (border-border)

### 2. **Hierarchy**
- Headers: Bold, larger font
- Labels: Uppercase, small, muted
- Content: Regular weight, readable size

### 3. **Density**
- Compact tables for data density
- Efficient use of space
- Scrolling over pagination where appropriate

### 4. **Accessibility**
- Clear hover states
- Keyboard navigation support
- Semantic HTML
- Proper labels for inputs

### 5. **Professional B2B**
- Dark theme reduces eye strain
- Green accents for positive actions
- Subtle animations
- No playful elements

---

## 🎯 Migration Checklist

When integrating into your GitHub project:

- [ ] Copy all component files
- [ ] Copy mock data files
- [ ] Copy type definitions
- [ ] Update import paths (@/ alias)
- [ ] Verify shadcn/ui components installed
- [ ] Update theme.css if needed
- [ ] Test Storybook stories
- [ ] Replace mock data with real API calls
- [ ] Add error handling
- [ ] Add loading states
- [ ] Implement real save/delete actions

---

## 📞 Questions & Customization

This documentation covers the current implementation. For customization:

1. **Colors**: Update CSS variables in `theme.css`
2. **Spacing**: Adjust Tailwind classes
3. **Typography**: Modify font-size utilities
4. **Layout**: Change grid-cols values
5. **Behavior**: Update React state logic

---

**Last Updated**: February 11, 2026
**Version**: 1.0.0