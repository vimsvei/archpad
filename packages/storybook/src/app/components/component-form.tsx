import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface ComponentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComponentForm({ isOpen, onClose }: ComponentFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    status: 'Active',
    owner: '',
    description: '',
    version: '',
    criticality: '',
    lifecycle: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Component</SheetTitle>
          <SheetDescription>
            Add a new application component to your enterprise architecture.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Code */}
          <div className="space-y-2">
            <Label htmlFor="code">
              Code *
            </Label>
            <Input
              id="code"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., CRM-001"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Component name"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">
              Type *
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Core System">Core System</SelectItem>
                <SelectItem value="Support System">Support System</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Deprecated">Deprecated</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Owner */}
          <div className="space-y-2">
            <Label htmlFor="owner">
              Owner *
            </Label>
            <Input
              id="owner"
              required
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Team or department"
            />
          </div>

          {/* Lifecycle Stage */}
          <div className="space-y-2">
            <Label htmlFor="lifecycle">
              Lifecycle Stage
            </Label>
            <Select
              value={formData.lifecycle}
              onValueChange={(value) => setFormData({ ...formData, lifecycle: value })}
            >
              <SelectTrigger id="lifecycle">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Emerging">Emerging</SelectItem>
                <SelectItem value="Growing">Growing</SelectItem>
                <SelectItem value="Mature">Mature</SelectItem>
                <SelectItem value="Declining">Declining</SelectItem>
                <SelectItem value="Sunset">Sunset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Criticality */}
          <div className="space-y-2">
            <Label htmlFor="criticality">
              Criticality Level
            </Label>
            <Select
              value={formData.criticality}
              onValueChange={(value) => setFormData({ ...formData, criticality: value })}
            >
              <SelectTrigger id="criticality">
                <SelectValue placeholder="Select criticality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Version */}
          <div className="space-y-2">
            <Label htmlFor="version">
              Version
            </Label>
            <Input
              id="version"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              placeholder="e.g., 2.1.0"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the component's purpose and functionality"
              rows={4}
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
            />
          </div>
        </form>

        <SheetFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Component
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
