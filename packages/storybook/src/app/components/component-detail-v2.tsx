import { useState } from 'react';
import { ArrowLeft, Save, Layers, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
import { RelatedItemsList } from '@/app/components/related-items-list';
import type { ApplicationComponent, StakeholderItem } from '@/@types/application-component';
import { mockDirectoryItems, getStakeholdersForComponent } from '@/lib/mock-data';
import { toast } from 'sonner';

type ComponentDetailV2Props = {
  component: ApplicationComponent;
  onBack: () => void;
  onSave: (component: ApplicationComponent) => void;
};

export function ComponentDetailV2({ component: initialComponent, onBack, onSave }: ComponentDetailV2Props) {
  const [component, setComponent] = useState<ApplicationComponent>(initialComponent);
  const [stakeholders] = useState<StakeholderItem[]>(getStakeholdersForComponent(initialComponent.id));
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof ApplicationComponent>(field: K, value: ApplicationComponent[K]) => {
    setComponent(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(component);
    setIsDirty(false);
    toast.success('Component saved successfully');
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>

          <div className="flex items-start gap-3">
            <div className="grid place-items-center rounded-full bg-primary/10 shrink-0 size-12">
              <Layers className="text-primary" size={28} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-foreground">Application Component</h1>
              <p className="text-muted-foreground text-sm">{component.code}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            V2: Grouped
          </Badge>
          {component.state && (
            <Badge
              style={{
                backgroundColor: component.state.color,
                color: '#ffffff',
              }}
            >
              {component.state.name}
            </Badge>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={handleSave} disabled={!isDirty}>
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save Changes</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Tabs - Simplified Structure */}
      <Tabs defaultValue="general" className="flex min-h-0 flex-1 flex-col">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="classification">Classification & Stakeholders</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="flows">Flows</TabsTrigger>
          <TabsTrigger value="diagram">Схема</TabsTrigger>
        </TabsList>

        {/* General Tab - Basic info only */}
        <TabsContent value="general" className="flex-1 min-h-0 overflow-auto mt-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Basic Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={component.code}
                  onChange={(e) => updateField('code', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={component.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={component.state?.id}
                  onValueChange={(value) => {
                    const state = mockDirectoryItems.states.find(s => s.id === value);
                    updateField('state', state);
                  }}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDirectoryItems.states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={component.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                  placeholder="Enter description (Markdown supported)..."
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Classification & Stakeholders Tab */}
        <TabsContent value="classification" className="flex-1 min-h-0 overflow-auto mt-4">
          <div className="grid gap-4">
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Classification</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="license">License Type</Label>
                  <Select
                    value={component.licenseType?.id}
                    onValueChange={(value) => {
                      const item = mockDirectoryItems.licenseTypes.find(l => l.id === value);
                      updateField('licenseType', item);
                    }}
                  >
                    <SelectTrigger id="license">
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDirectoryItems.licenseTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="architecture">Architecture Style</Label>
                  <Select
                    value={component.architectureStyle?.id}
                    onValueChange={(value) => {
                      const item = mockDirectoryItems.architectureStyles.find(a => a.id === value);
                      updateField('architectureStyle', item);
                    }}
                  >
                    <SelectTrigger id="architecture">
                      <SelectValue placeholder="Select architecture style" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDirectoryItems.architectureStyles.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="critical">Critical Level</Label>
                  <Select
                    value={component.criticalLevel?.id}
                    onValueChange={(value) => {
                      const item = mockDirectoryItems.criticalLevels.find(c => c.id === value);
                      updateField('criticalLevel', item);
                    }}
                  >
                    <SelectTrigger id="critical">
                      <SelectValue placeholder="Select critical level" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDirectoryItems.criticalLevels.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Stakeholders */}
            <Card className="flex flex-col">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="font-semibold text-foreground">Stakeholders</h3>
                <Button variant="outline" size="icon">
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="px-6 pb-4">
                {stakeholders.length === 0 ? (
                  <div className="flex items-center justify-center h-24 text-muted-foreground">
                    No stakeholders assigned
                  </div>
                ) : (
                  <table className="w-full text-foreground">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-foreground">Stakeholder</th>
                        <th className="text-left py-3 font-medium text-foreground">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakeholders.map((sh) => (
                        <tr key={sh.id} className="border-b border-border">
                          <td className="py-3 text-foreground">{sh.stakeholderName}</td>
                          <td className="py-3 text-muted-foreground">{sh.roleName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Relationships Tab - All application layer relationships */}
        <TabsContent value="relationships" className="flex-1 min-h-0 overflow-auto mt-4">
          <div className="grid gap-4">
            {/* Functions & Data */}
            <div className="grid grid-cols-2 gap-4">
              <RelatedItemsList
                title="Functions"
                items={component.functions || []}
                emptyMessage="No functions"
                onAdd={() => toast.info('Add function - coming soon')}
              />
              <RelatedItemsList
                title="Data Objects"
                items={component.dataObjects || []}
                emptyMessage="No data objects"
                onAdd={() => toast.info('Add data object - coming soon')}
              />
            </div>

            {/* Interfaces & Events */}
            <div className="grid grid-cols-2 gap-4">
              <RelatedItemsList
                title="Interfaces"
                items={component.interfaces || []}
                emptyMessage="No interfaces"
                onAdd={() => toast.info('Add interface - coming soon')}
              />
              <RelatedItemsList
                title="Events"
                items={component.events || []}
                emptyMessage="No events"
                onAdd={() => toast.info('Add event - coming soon')}
              />
            </div>

            {/* Hierarchy */}
            <div className="grid grid-cols-2 gap-4">
              <RelatedItemsList
                title="Parent Components"
                items={component.parents || []}
                emptyMessage="No parent components"
                onAdd={() => toast.info('Add parent - coming soon')}
              />
              <RelatedItemsList
                title="Child Components"
                items={component.children || []}
                emptyMessage="No child components"
                onAdd={() => toast.info('Add child - coming soon')}
              />
            </div>
          </div>
        </TabsContent>

        {/* Technology Tab - All technology relationships */}
        <TabsContent value="technology" className="flex-1 min-h-0 overflow-auto mt-4">
          <div className="grid gap-4">
            <RelatedItemsList
              title="System Software"
              items={component.systemSoftware || []}
              emptyMessage="No system software"
              onAdd={() => toast.info('Add system software - coming soon')}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <RelatedItemsList
                title="Technology Nodes"
                items={component.technologyNodes || []}
                emptyMessage="No nodes"
                onAdd={() => toast.info('Add node - coming soon')}
              />
              <RelatedItemsList
                title="Technology Networks"
                items={component.technologyNetworks || []}
                emptyMessage="No networks"
                onAdd={() => toast.info('Add network - coming soon')}
              />
            </div>
          </div>
        </TabsContent>

        {/* Flows Tab */}
        <TabsContent value="flows" className="flex-1 min-h-0 overflow-auto mt-4">
          <div className="grid grid-cols-2 gap-4">
            <RelatedItemsList
              title="Incoming Flows"
              items={component.incomingFlows || []}
              emptyMessage="No incoming flows"
              onAdd={() => toast.info('Add flow - coming soon')}
            />
            <RelatedItemsList
              title="Outgoing Flows"
              items={component.outgoingFlows || []}
              emptyMessage="No outgoing flows"
              onAdd={() => toast.info('Add flow - coming soon')}
            />
          </div>
        </TabsContent>

        {/* Diagram Tab */}
        <TabsContent value="diagram" className="flex-1 min-h-0 overflow-auto mt-4">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Component Diagram</h3>
            <div className="flex items-center justify-center h-96 border border-border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Diagram visualization coming soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}