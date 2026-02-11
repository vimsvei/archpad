import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { toast } from 'sonner';

interface DirectoryItemFormProps {
  onSubmit: (values: DirectoryItemFormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<DirectoryItemFormValues>;
}

export interface DirectoryItemFormValues {
  code: string;
  name: string;
  description: string;
  color: string;
  order: number;
  byDefault: boolean;
}

export function DirectoryItemForm({ onSubmit, onCancel, initialValues }: DirectoryItemFormProps) {
  const [formData, setFormData] = useState<DirectoryItemFormValues>({
    code: initialValues?.code || '',
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    color: initialValues?.color || '',
    order: initialValues?.order || 0,
    byDefault: initialValues?.byDefault || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Название обязательно для заполнения');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="space-y-4">
        {/* Code */}
        <div className="grid gap-2">
          <Label htmlFor="code" className="text-xs text-muted-foreground">
            Code
          </Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="h-8 border-border bg-background font-mono text-sm"
            placeholder="Уникальный код"
          />
        </div>

        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-xs text-muted-foreground">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-8 border-border bg-background text-sm"
            placeholder="Название элемента"
            required
          />
        </div>

        {/* Description */}
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-xs text-muted-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="border-border bg-background text-sm resize-none font-mono"
            placeholder="Описание... (Markdown supported)"
          />
        </div>

        {/* Color */}
        <div className="grid gap-2">
          <Label htmlFor="color" className="text-xs text-muted-foreground">
            Color
          </Label>
          <div className="space-y-2">
            <Input
              type="color"
              value={formData.color || '#6b7280'}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full h-10 p-1 cursor-pointer border-border bg-background"
            />
            <Input
              id="color"
              placeholder="#000000"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="h-8 border-border bg-background font-mono text-sm"
            />
          </div>
        </div>

        {/* Order */}
        <div className="grid gap-2">
          <Label htmlFor="order" className="text-xs text-muted-foreground">
            Order
          </Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="h-8 border-border bg-background text-sm"
          />
        </div>

        {/* By Default */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="byDefault"
            checked={formData.byDefault}
            onCheckedChange={(checked) => setFormData({ ...formData, byDefault: Boolean(checked) })}
          />
          <Label htmlFor="byDefault" className="text-xs text-muted-foreground cursor-pointer">
            Set as default
          </Label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Create
        </Button>
      </div>
    </form>
  );
}
