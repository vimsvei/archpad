import { useState } from 'react';
import { ChevronDown, Plus, Search, MoreHorizontal, Edit, Trash2, RefreshCcw, Upload, LibraryBig } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/app/components/ui/sidebar';
import { AppSidebar } from '@/app/components/app-sidebar';
import { Separator } from '@/app/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import { directoryCategories, getDirectoryById } from '@/lib/mock-directories';
import { DirectoryItemDetail } from '@/app/components/directory-item-detail';
import { DirectoryItemForm, type DirectoryItemFormValues } from '@/app/components/directory-item-form';
import type { Directory, DirectoryItem } from '@/@types/directory';

export function DirectoriesPage() {
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string>('dir-arch-style');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  const selectedDirectory = getDirectoryById(selectedDirectoryId);
  const selectedItem = selectedDirectory?.items.find(i => i.id === selectedItemId);

  // Filter items by search
  const filteredItems = selectedDirectory?.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleRowClick = (item: DirectoryItem) => {
    setSelectedItemId(item.id);
  };

  const handleBackToList = () => {
    setSelectedItemId(null);
  };

  const handleDelete = (item: DirectoryItem) => {
    const ok = window.confirm(`Удалить "${item.name}"?`);
    if (!ok) return;
    toast.success(`Удалено: ${item.name}`);
    // TODO: implement delete API call
  };

  const handleSave = (item: DirectoryItem) => {
    console.log('Saving item:', item);
    toast.success('Изменения сохранены');
    handleBackToList();
  };

  const handleCreateNew = (values: DirectoryItemFormValues) => {
    console.log('Creating new item:', values);
    toast.success('Элемент создан');
    setCreateSheetOpen(false);
    // TODO: implement create API call
  };

  const handleRefresh = () => {
    toast.info('Обновление данных...');
    // TODO: implement refresh
  };

  const handleUpload = () => {
    toast.info('Импорт из файла');
    // TODO: implement file upload (CSV/JSON)
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* If item is selected, show detail view */}
        {selectedItem && selectedDirectory ? (
          <DirectoryItemDetail
            item={selectedItem}
            directory={selectedDirectory}
            onBack={handleBackToList}
            onSave={handleSave}
          />
        ) : (
          <div className="flex h-screen bg-background">
            {/* Left Sidebar - Directory List */}
            <div className="w-80 border-r border-border bg-card flex-shrink-0 overflow-y-auto">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Справочники</h2>
              </div>

              <div className="p-2">
                {directoryCategories.map(category => (
                  <DirectoryCategoryGroup
                    key={category.id}
                    category={category}
                    selectedDirectoryId={selectedDirectoryId}
                    onSelectDirectory={setSelectedDirectoryId}
                  />
                ))}
              </div>
            </div>

            {/* Main Content - Items Table */}
            <div className="flex-1 flex flex-col transition-all duration-200">
              {/* Header with breadcrumb */}
              <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Настройки</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-semibold">Справочники</span>
                </div>
              </header>

              {/* Title and actions */}
              <div className="border-b border-border bg-card px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{selectedDirectory?.name}</h1>
                    {selectedDirectory?.description && (
                      <p className="text-sm text-muted-foreground mt-1">{selectedDirectory.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleRefresh}>
                          <RefreshCcw className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Обновить</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleUpload}>
                          <Upload className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Импорт из файла</TooltipContent>
                    </Tooltip>

                    <Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SheetTrigger asChild>
                            <Button size="icon">
                              <Plus className="size-4" />
                            </Button>
                          </SheetTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Создать</TooltipContent>
                      </Tooltip>

                      <SheetContent side="right" className="w-[500px] sm:w-[600px]">
                        <SheetHeader>
                          <SheetTitle>Создание элемента</SheetTitle>
                          <SheetDescription>{selectedDirectory?.name}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <DirectoryItemForm
                            onSubmit={handleCreateNew}
                            onCancel={() => setCreateSheetOpen(false)}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по коду, названию, описанию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 sticky top-0 z-10">
                    <tr>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border w-12">
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border w-32">
                        Код
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border">
                        Наименование
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border">
                        Описание
                      </th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border w-32">
                        Цвет
                      </th>
                      <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border w-28">
                        По умолчанию
                      </th>
                      <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide px-6 py-3 border-b border-border w-16">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-muted-foreground">
                          {searchQuery ? 'Ничего не найдено' : 'Нет элементов'}
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-border hover:bg-accent/5 cursor-pointer group"
                          onClick={() => handleRowClick(item)}
                        >
                          <td className="px-6 py-4">
                            <LibraryBig className="size-4 text-foreground opacity-80" />
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-sm font-mono text-primary hover:underline">
                              {item.code || '—'}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-foreground">{item.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {item.description || '—'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {item.color ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className="size-3 rounded-full border border-border"
                                  style={{ backgroundColor: item.color }}
                                />
                                <code className="text-xs font-mono">{item.color}</code>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <Checkbox
                                checked={Boolean(item.byDefault)}
                                disabled
                                aria-label="По умолчанию"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="opacity-0 group-hover:opacity-100 h-8 w-8"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleRowClick(item); }}>
                                  <Edit className="size-4 mr-2" />
                                  Редактировать
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                                >
                                  <Trash2 className="size-4 mr-2" />
                                  Удалить
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer with count */}
              <div className="border-t border-border bg-card px-6 py-3">
                <p className="text-sm text-muted-foreground">
                  Всего элементов: <span className="font-semibold text-foreground">{filteredItems.length}</span>
                  {searchQuery && selectedDirectory && filteredItems.length !== selectedDirectory.items.length && (
                    <span> из {selectedDirectory.items.length}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

// Directory category group component
function DirectoryCategoryGroup({
  category,
  selectedDirectoryId,
  onSelectDirectory,
}: {
  category: { id: string; name: string; directories: Directory[] };
  selectedDirectoryId: string;
  onSelectDirectory: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent/10 rounded transition-colors"
      >
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
        <span className="text-sm font-semibold text-foreground">{category.name}</span>
        <span className="text-xs text-muted-foreground ml-auto">{category.directories.length}</span>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-0.5">
          {category.directories.map((dir) => (
            <button
              key={dir.id}
              onClick={() => onSelectDirectory(dir.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 pl-9 rounded transition-colors text-left ${
                selectedDirectoryId === dir.id
                  ? 'bg-primary/10 text-foreground'
                  : 'hover:bg-accent/10 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="size-2 rounded-full bg-primary/50 shrink-0" />
              <span className="text-sm flex-1 truncate">{dir.name}</span>
              <span className="text-xs text-muted-foreground">{dir.items.length}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}