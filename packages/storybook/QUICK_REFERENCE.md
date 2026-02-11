# Quick Reference - ArchPad Design System

## 🎨 CSS Variables

```css
/* Backgrounds */
--background: #0a0a0a;
--card: #111111;
--muted: #1a1a1a;

/* Text */
--foreground: #fafafa;
--muted-foreground: #a1a1aa;

/* Borders */
--border: #262626;

/* Accent */
--primary: #22c55e;
--accent: #14532d;
```

## 📐 Layout Grid

```tsx
/* 2/3 + 1/3 Split (Description + Properties) */
<div className="grid grid-cols-3 gap-8">
  <div className="col-span-2">{/* Description */}</div>
  <div className="col-span-1">{/* Properties */}</div>
</div>
```

## 🔤 Typography Classes

```tsx
/* Page Title */       className="text-lg font-semibold"
/* Section Title */    className="text-sm font-semibold"
/* Body Text */        className="text-sm"
/* Label */            className="text-xs text-muted-foreground"
/* Code */             className="font-mono text-xs"
```

## 📝 Form Components

### Text Input
```tsx
<Input 
  className="h-8 border-border bg-background text-sm" 
  placeholder="Enter value..."
/>
```

### Number Input
```tsx
<Input 
  type="number"
  className="h-8 border-border bg-background text-sm" 
/>
```

### Textarea
```tsx
<Textarea 
  className="border-border bg-background text-sm resize-none font-mono"
  rows={8}
/>
```

### Color Picker
```tsx
<Input 
  type="color"
  className="w-full h-10 p-1 cursor-pointer border-border bg-background"
/>
<Input 
  placeholder="#000000"
  className="h-8 border-border bg-background font-mono text-sm"
/>
```

### Select (Dropdown)
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="h-8 border-border bg-background text-sm">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Readonly Field (Properties Panel)
```tsx
<div className="h-8 px-3 flex items-center text-sm text-foreground bg-muted border border-border rounded-md">
  {value}
</div>
```

## 📊 Table Components

### Table Container
```tsx
<div className="border border-border rounded-lg overflow-hidden">
  <table className="w-full">
    {/* ... */}
  </table>
</div>
```

### Table Header
```tsx
<thead className="bg-muted/30">
  <tr>
    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3">
      Column Name
    </th>
  </tr>
</thead>
```

### Table Row
```tsx
<tbody>
  <tr className="border-t border-border hover:bg-muted/20 group">
    <td className="px-6 py-4 text-sm text-foreground">
      Cell Content
    </td>
  </tr>
</tbody>
```

## 🎯 Buttons

### Primary Button
```tsx
<Button size="sm">
  Save
</Button>
```

### Secondary Button
```tsx
<Button variant="outline" size="sm">
  Cancel
</Button>
```

### Destructive Button
```tsx
<Button variant="outline" size="sm" className="text-destructive">
  <Trash2 className="size-4 mr-2" />
  Delete
</Button>
```

### Icon Button
```tsx
<Button variant="ghost" size="icon-sm">
  <Edit className="size-4" />
</Button>
```

## 🏷️ Badges

### Default Badge
```tsx
<Badge variant="secondary">
  {count}
</Badge>
```

### Outline Badge
```tsx
<Badge variant="outline" className="text-xs font-mono">
  {code}
</Badge>
```

## 📦 Cards & Containers

### Card Container
```tsx
<div className="border border-border rounded-lg overflow-hidden bg-card">
  {/* Content */}
</div>
```

### Section Container
```tsx
<section>
  <h2 className="text-sm font-semibold text-foreground mb-4">
    Section Title
  </h2>
  <div className="space-y-4">
    {/* Content */}
  </div>
</section>
```

### Relation Layer Card
```tsx
<div className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0" style={{ width: '340px' }}>
  <div className="bg-muted/30 px-4 py-2 border-b border-border">
    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
      Layer Name
    </h4>
  </div>
  {/* Relation groups */}
</div>
```

## 🔽 Collapsible Group

```tsx
const [isOpen, setIsOpen] = useState(true);

<div className="border-b border-border/50 last:border-b-0">
  <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-2 py-3 px-1">
    <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    <span className="text-sm font-medium">Group Title</span>
    <span className="text-xs text-muted-foreground">{count}</span>
  </button>
  
  {isOpen && (
    <div className="pb-3 px-1">
      {/* Content */}
    </div>
  )}
</div>
```

## 🎨 Status Indicator

```tsx
<div 
  className="size-2 rounded-full"
  style={{ backgroundColor: state?.color || '#6b7280' }}
/>
```

## 📱 Hover Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="ghost" 
      size="icon-sm"
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <MoreHorizontal className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleAction}>
      <Icon className="size-4 mr-2" />
      Action
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## 🔔 Toast Notifications

```tsx
import { toast } from 'sonner';

// Success
toast.success('Item saved successfully');

// Error
toast.error('Failed to save item');

// Info
toast.info('Feature coming soon');

// Warning
toast.warning('Please confirm this action');
```

## 🎯 Spacing Scale

```
gap-2   = 0.5rem  (8px)
gap-4   = 1rem    (16px)
gap-6   = 1.5rem  (24px)
gap-8   = 2rem    (32px)

p-1     = 0.25rem (4px)
p-2     = 0.5rem  (8px)
p-3     = 0.75rem (12px)
p-4     = 1rem    (16px)
p-6     = 1.5rem  (24px)
```

## 📏 Common Heights

```
h-8     = 2rem    (32px)  - Input fields
h-10    = 2.5rem  (40px)  - Color picker
h-14    = 3.5rem  (56px)  - Header
```

## 🎨 Opacity Values

```
opacity-0                 = 0
opacity-100               = 1
group-hover:opacity-100   = Show on parent hover

bg-muted/20              = 20% opacity
bg-muted/30              = 30% opacity
border-border/50         = 50% opacity
```

## 🖱️ Interactive States

```tsx
/* Hover */
hover:bg-muted/20
hover:bg-accent/10
hover:text-foreground
hover:border-border/50

/* Group Hover */
group
group-hover:opacity-100
group-hover/item:opacity-100

/* Active */
data-[state=active]:bg-muted/30

/* Transitions */
transition-colors
transition-opacity
transition-transform
```

## 📋 Common Patterns

### Form Field Group
```tsx
<div className="grid gap-2">
  <Label htmlFor="field" className="text-xs text-muted-foreground">
    Label
  </Label>
  <Input id="field" className="h-8 border-border bg-background text-sm" />
</div>
```

### Header with Actions
```tsx
<div className="flex items-center justify-between mb-4">
  <h3 className="text-sm font-semibold text-foreground">
    Title
  </h3>
  <Button variant="outline" size="sm">
    <Plus className="size-4 mr-2" />
    Action
  </Button>
</div>
```

### Empty State
```tsx
<div className="py-12 text-center">
  <Icon className="size-12 text-muted-foreground/30 mx-auto mb-3" />
  <p className="text-sm text-muted-foreground">No items</p>
  <p className="text-xs text-muted-foreground mt-1">
    Description of empty state
  </p>
</div>
```

---

## 📦 Icons (lucide-react)

```tsx
import {
  ArrowLeft,      // Back button
  Edit,           // Edit action
  Trash2,         // Delete action
  Save,           // Save action
  Plus,           // Add action
  MoreHorizontal, // More menu
  ChevronDown,    // Collapse/expand
  Link2,          // Relations
  RefreshCw,      // Refresh
  Eye,            // View
  Search,         // Search
} from 'lucide-react';
```

---

**Tip**: Всегда используйте `className` вместо `style` где возможно для consistency!
