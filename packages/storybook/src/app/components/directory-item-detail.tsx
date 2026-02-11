import { useState } from 'react';
import { ArrowLeft, Save, Trash2, Plus, Link2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { toast } from 'sonner';
import type { DirectoryItem, Directory } from '@/@types/directory';

interface DirectoryItemDetailProps {
  item: DirectoryItem;
  directory: Directory;
  onBack: () => void;
  onSave: (item: DirectoryItem) => void;
}

export function DirectoryItemDetail({ item, directory, onBack, onSave }: DirectoryItemDetailProps) {
  const [formData, setFormData] = useState({
    code: item.code || '',
    name: item.name || '',
    description: item.description || '',
    color: item.color || '',
    order: item.order || 0,
    byDefault: item.byDefault || false,
  });
  const [addRelationOpen, setAddRelationOpen] = useState(false);

  const handleDelete = () => {
    if (confirm(`Удалить элемент "${item.name}"?`)) {
      toast.success('Элемент удален');
      onBack();
    }
  };

  const handleSave = () => {
    onSave({ ...item, ...formData });
  };

  const handleDeleteRelation = (relationId: string, relationName: string) => {
    if (confirm(`Удалить связь с "${relationName}"?`)) {
      toast.success('Связь удалена');
      // TODO: implement delete relation API call
    }
  };

  const handleAddRelation = (values: { targetDirectory: string; targetItem: string; relationType: string }) => {
    console.log('Adding relation:', values);
    toast.success('Связь добавлена');
    setAddRelationOpen(false);
    // TODO: implement create relation API call
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-6 bg-card">
        <Button variant="ghost" size="icon-sm" onClick={onBack}>
          <ArrowLeft className="size-4" />
        </Button>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h1 className="font-semibold text-lg truncate">{item.name}</h1>
          <span className="text-xs text-muted-foreground font-mono">ID: {item.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/40 hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="size-4 mr-2" />
            Удалить
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="size-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Top Section: Description (2/3) + Properties (1/3) */}
          <div className="grid grid-cols-3 gap-8">
            {/* Description - 2 columns */}
            <section className="col-span-2">
              <h2 className="text-sm font-semibold text-foreground mb-4">Description</h2>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="border-border bg-background text-sm resize-none font-mono"
                placeholder="Add description... (Markdown supported)"
              />
            </section>

            {/* Properties - 1 column */}
            <section className="col-span-1">
              <h2 className="text-sm font-semibold text-foreground mb-4">Properties</h2>
              <div className="space-y-4">
                {/* Directory - readonly */}
                <div className="grid gap-2">
                  <Label className="text-xs text-muted-foreground">Directory</Label>
                  <div className="h-8 px-3 flex items-center text-sm text-foreground bg-muted border border-border rounded-md">
                    {directory.name}
                  </div>
                </div>

                {/* Code */}
                <div className="grid gap-2">
                  <Label htmlFor="code" className="text-xs text-muted-foreground">Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="h-8 border-border bg-background font-mono text-sm"
                  />
                </div>

                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-8 border-border bg-background text-sm"
                  />
                </div>

                {/* Color */}
                <div className="grid gap-2">
                  <Label htmlFor="color" className="text-xs text-muted-foreground">Color</Label>
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
                  <Label htmlFor="order" className="text-xs text-muted-foreground">Order</Label>
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
                    By Default
                  </Label>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Section: Relations Table - Full Width (3/3) */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link2 className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Relations</h2>
                <Badge variant="secondary" className="text-xs">
                  {item.relations?.length || 0}
                </Badge>
              </div>
              
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
                    <SheetDescription>
                      Create a link to another directory item
                    </SheetDescription>
                  </SheetHeader>
                  <AddRelationForm
                    onSubmit={handleAddRelation}
                    onCancel={() => setAddRelationOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {!item.relations || item.relations.length === 0 ? (
              <div className="py-12 text-center border border-border rounded-lg">
                <Link2 className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No relations</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add a relation to show connections between directory items
                </p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3">
                        Directory
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3">
                        Item
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3">
                        Relation Type
                      </th>
                      <th className="text-right text-xs font-semibold text-muted-foreground px-6 py-3 w-16">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.relations.map((relation) => (
                      <tr
                        key={relation.id}
                        className="border-t border-border hover:bg-muted/20 group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-primary/70" />
                            <span className="text-sm text-foreground">{relation.targetDirectoryName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-foreground">{relation.targetItemName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-xs font-mono">
                            {relation.relationType}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="opacity-0 group-hover:opacity-100 h-8 w-8"
                            onClick={() => handleDeleteRelation(relation.id, relation.targetItemName)}
                          >
                            <Trash2 className="size-4 text-muted-foreground" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Metadata */}
          {item.createdAt || item.updatedAt ? (
            <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-1">
              {item.createdAt && <p>Создано: {item.createdAt}</p>}
              {item.updatedAt && <p>Обновлено: {item.updatedAt}</p>}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Add Relation Form Component (for the Sheet)
function AddRelationForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: { targetDirectory: string; targetItem: string; relationType: string }) => void;
  onCancel: () => void;
}) {
  const [targetDirectory, setTargetDirectory] = useState('');
  const [targetItem, setTargetItem] = useState('');
  const [relationType, setRelationType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDirectory || !targetItem || !relationType) {
      toast.error('Заполните все поля');
      return;
    }
    onSubmit({ targetDirectory, targetItem, relationType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="targetDirectory" className="text-xs text-muted-foreground">
            Target Directory
          </Label>
          <Select value={targetDirectory} onValueChange={setTargetDirectory}>
            <SelectTrigger id="targetDirectory" className="h-8">
              <SelectValue placeholder="Select directory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dir-states">States</SelectItem>
              <SelectItem value="dir-license">License Types</SelectItem>
              <SelectItem value="dir-critical">Critical Levels</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="targetItem" className="text-xs text-muted-foreground">
            Target Item
          </Label>
          <Select value={targetItem} onValueChange={setTargetItem} disabled={!targetDirectory}>
            <SelectTrigger id="targetItem" className="h-8">
              <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Item 1</SelectItem>
              <SelectItem value="2">Item 2</SelectItem>
              <SelectItem value="3">Item 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="relationType" className="text-xs text-muted-foreground">
            Relation Type
          </Label>
          <Select value={relationType} onValueChange={setRelationType}>
            <SelectTrigger id="relationType" className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uses">Uses</SelectItem>
              <SelectItem value="has">Has</SelectItem>
              <SelectItem value="depends">Depends On</SelectItem>
              <SelectItem value="association">Association</SelectItem>
              <SelectItem value="hierarchy">Hierarchy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Add Relation
        </Button>
      </div>
    </form>
  );
}