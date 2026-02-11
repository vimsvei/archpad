import { useState } from 'react';
import { ArrowLeft, Save, Layers, UserPlus, AlertCircle, ChevronDown, Plus, Link2, MoreHorizontal, RefreshCw, Trash2, Eye } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/components/ui/dropdown-menu';
import type { ApplicationComponent, RelatedItem } from '@/@types/application-component';
import { mockDirectoryItems } from '@/lib/mock-data';
import { toast } from 'sonner';

type ComponentDetailNoStakeholdersProps = {
  component: ApplicationComponent;
  onBack: () => void;
  onSave: (component: ApplicationComponent) => void;
};

// Compact relation group component
function RelationGroup({ title, items, emptyText }: { title: string; items: RelatedItem[]; emptyText?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <div className="w-full flex items-center justify-between py-3 px-1 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 flex-1 hover:text-foreground transition-colors"
        >
          <ChevronDown className={`size-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">{items.length}</span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success(`Refreshing ${title.toLowerCase()}...`)}>
              <RefreshCw className="size-4 mr-2" />
              Обновить
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info(`Add existing ${title.toLowerCase().slice(0, -1)} - coming soon`)}>
              <Link2 className="size-4 mr-2" />
              Добавить
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info(`Create new ${title.toLowerCase().slice(0, -1)} - coming soon`)}>
              <Plus className="size-4 mr-2" />
              Создать
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && (
        <div className="pb-3 px-1">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{emptyText || 'None'}</p>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const descFirstPart = item.description ? item.description.slice(0, 80) : '';
                const descSecondPart = item.description && item.description.length > 80 
                  ? truncateText(item.description.slice(80), 80) 
                  : '';
                
                return (
                  <div 
                    key={item.id} 
                    className="group/item relative hover:bg-accent/10 px-2 py-2 rounded cursor-pointer border border-transparent hover:border-border/50 transition-colors"
                  >
                    <div className="flex items-start gap-2 pr-14">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-0.5 truncate">
                          <span className="font-mono">{item.code}</span>
                          {descFirstPart && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{descFirstPart}</span>
                            </>
                          )}
                        </div>
                        
                        {descSecondPart && (
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            {descSecondPart}
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute right-2 top-2 flex items-center gap-1.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="size-2 rounded-full shrink-0"
                              style={{ 
                                backgroundColor: item.state?.color || '#6b7280'
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.state?.name || 'Unknown state'}
                          </TooltipContent>
                        </Tooltip>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon-sm"
                              className="opacity-0 group-hover/item:opacity-100 transition-opacity size-6"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="size-3.5 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${item.name}`)}>
                              <Eye className="size-4 mr-2" />
                              Детали
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => toast.error(`Deleting ${item.name}...`)}
                            >
                              <Trash2 className="size-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ComponentDetailNoStakeholders({ component: initialComponent, onBack, onSave }: ComponentDetailNoStakeholdersProps) {
  const [component, setComponent] = useState<ApplicationComponent>(initialComponent);
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

  const handleAddStakeholder = () => {
    toast.info('Добавление стейкхолдера - функция в разработке');
    // TODO: Open stakeholder selection sheet
  };

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-[1800px] mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onBack} className="text-foreground hover:text-foreground">
                  <ArrowLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Назад</TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-3 flex-1">
              <div className="grid place-items-center rounded-lg bg-primary/10 shrink-0 size-10">
                <Layers className="text-primary" size={20} />
              </div>
              <Input
                value={component.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="text-2xl font-semibold border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Component name"
              />
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                No Stakeholders
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
                  <Button size="sm" onClick={handleSave} disabled={!isDirty}>
                    <Save className="size-4 mr-2" />
                    Сохранить
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Сохранить изменения</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Alert: No Stakeholders */}
          <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="size-4 text-amber-500" />
            <AlertDescription className="text-sm">
              <div className="flex items-center justify-between">
                <span className="text-foreground">
                  Для этого компонента не назначены стейкхолдеры. Рекомендуется добавить ответственных лиц.
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddStakeholder}
                  className="ml-4 shrink-0"
                >
                  <UserPlus className="size-4 mr-2" />
                  Добавить
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          {/* Main Layout: 2/3 Left + 1/3 Right */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left 2/3 Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm text-foreground mb-2 block">Описание</Label>
                <Textarea
                  id="description"
                  value={component.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="min-h-[200px] border-border bg-background font-mono text-sm resize-none"
                  placeholder="Добавьте описание компонента..."
                />
              </div>

              {/* Relations Section - Horizontal Scroll */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Связи</h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-2" style={{ minWidth: 'min-content' }}>
                    {/* Business Layer - Shows only if has data */}
                    {((component.businessActors && component.businessActors.length > 0) || 
                      (component.businessProcesses && component.businessProcesses.length > 0)) && (
                      <div className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0" style={{ width: '340px' }}>
                        <div className="bg-muted/30 px-4 py-2 border-b border-border">
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Business</h4>
                        </div>
                        <RelationGroup title="Business Actors" items={component.businessActors || []} emptyText="Нет акторов" />
                        <RelationGroup title="Business Processes" items={component.businessProcesses || []} emptyText="Нет процессов" />
                      </div>
                    )}

                    {/* Application Layer - Always visible (priority) */}
                    <div className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0" style={{ width: '340px' }}>
                      <div className="bg-muted/30 px-4 py-2 border-b border-border">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Application</h4>
                      </div>
                      <RelationGroup title="Functions" items={component.functions || []} emptyText="Нет функций" />
                      <RelationGroup title="Interfaces" items={component.interfaces || []} emptyText="Нет интерфейсов" />
                      <RelationGroup title="Events" items={component.events || []} emptyText="Нет событий" />
                      <RelationGroup title="Parent Components" items={component.parents || []} emptyText="Нет родителей" />
                      <RelationGroup title="Child Components" items={component.children || []} emptyText="Нет потомков" />
                    </div>

                    {/* Technology Layer - Always visible (priority) */}
                    <div className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0" style={{ width: '340px' }}>
                      <div className="bg-muted/30 px-4 py-2 border-b border-border">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Technology</h4>
                      </div>
                      <RelationGroup title="System Software" items={component.systemSoftware || []} emptyText="Нет ПО" />
                      <RelationGroup title="Technology Nodes" items={component.technologyNodes || []} emptyText="Нет узлов" />
                      <RelationGroup title="Technology Networks" items={component.technologyNetworks || []} emptyText="Нет сетей" />
                      <RelationGroup title="Data Objects" items={component.dataObjects || []} emptyText="Нет данных" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flows Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Потоки данных</h3>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Manage flows - coming soon')}>
                    <Plus className="size-4 mr-2" />
                    Добавить поток
                  </Button>
                </div>
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Направление</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Название</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Источник</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Цель</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Описание</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(component.incomingFlows || []).map((flow) => (
                          <tr key={flow.id} className="border-b border-border/50 hover:bg-accent/5 cursor-pointer">
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">Входящий</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{component.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                          </tr>
                        ))}
                        {(component.outgoingFlows || []).map((flow) => (
                          <tr key={flow.id} className="border-b border-border/50 hover:bg-accent/5 cursor-pointer">
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">Исходящий</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{component.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                          </tr>
                        ))}
                        {(!component.incomingFlows || component.incomingFlows.length === 0) && 
                         (!component.outgoingFlows || component.outgoingFlows.length === 0) && (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground italic">
                              Потоки не определены
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1/3 Area - Properties + Empty Stakeholders */}
            <div className="space-y-6">
              <div className="sticky top-6 space-y-6">
                {/* Properties */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Свойства</h3>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code" className="text-xs text-muted-foreground">Код</Label>
                      <Input
                        id="code"
                        value={component.code}
                        onChange={(e) => updateField('code', e.target.value)}
                        className="h-8 border-border bg-background text-sm"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="state" className="text-xs text-muted-foreground">Состояние</Label>
                      <Select
                        value={component.state?.id}
                        onValueChange={(value) => {
                          const state = mockDirectoryItems.states.find(s => s.id === value);
                          updateField('state', state);
                        }}
                      >
                        <SelectTrigger id="state" className="h-8 border-border bg-background text-sm">
                          <SelectValue placeholder="Выберите состояние" />
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
                      <Label htmlFor="license" className="text-xs text-muted-foreground">Тип лицензии</Label>
                      <Select
                        value={component.licenseType?.id}
                        onValueChange={(value) => {
                          const item = mockDirectoryItems.licenseTypes.find(l => l.id === value);
                          updateField('licenseType', item);
                        }}
                      >
                        <SelectTrigger id="license" className="h-8 border-border bg-background text-sm">
                          <SelectValue placeholder="Выберите лицензию" />
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
                      <Label htmlFor="architecture" className="text-xs text-muted-foreground">Архитектурный стиль</Label>
                      <Select
                        value={component.architectureStyle?.id}
                        onValueChange={(value) => {
                          const item = mockDirectoryItems.architectureStyles.find(a => a.id === value);
                          updateField('architectureStyle', item);
                        }}
                      >
                        <SelectTrigger id="architecture" className="h-8 border-border bg-background text-sm">
                          <SelectValue placeholder="Выберите стиль" />
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
                      <Label htmlFor="critical" className="text-xs text-muted-foreground">Уровень критичности</Label>
                      <Select
                        value={component.criticalLevel?.id}
                        onValueChange={(value) => {
                          const item = mockDirectoryItems.criticalLevels.find(c => c.id === value);
                          updateField('criticalLevel', item);
                        }}
                      >
                        <SelectTrigger id="critical" className="h-8 border-border bg-background text-sm">
                          <SelectValue placeholder="Выберите уровень" />
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
                </div>

                {/* Stakeholders - Empty State */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Стейкхолдеры</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon-sm" onClick={handleAddStakeholder}>
                          <Plus className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Добавить стейкхолдера</TooltipContent>
                    </Tooltip>
                  </div>
                  
                  {/* Empty state with prominent CTA */}
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center bg-muted/10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-full bg-muted/50 grid place-items-center">
                        <UserPlus className="size-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Стейкхолдеры не заданы</p>
                        <p className="text-xs text-muted-foreground">
                          Добавьте ответственных лиц и заинтересованные стороны
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddStakeholder}
                        className="mt-2"
                      >
                        <UserPlus className="size-4 mr-2" />
                        Добавить стейкхолдера
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagram Section - Full Width (3/3) */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Схема</h3>
            <div className="flex items-center justify-center h-96 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">Визуализация схемы в разработке</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
