"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon, type IconType } from "./icon-mapping"

export type SelectableItem = {
  id: string
  code: string
  name: string
  [key: string]: unknown
}

type AddExistingItemsSheetProps<T extends SelectableItem> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  iconType?: IconType
  items: T[]
  isLoading?: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedItems: Set<string>
  onToggleItem: (itemId: string) => void
  onAdd: () => void
}

export function AddExistingItemsSheet<T extends SelectableItem>({
  open,
  onOpenChange,
  title,
  iconType,
  items,
  isLoading,
  searchQuery,
  onSearchChange,
  selectedItems,
  onToggleItem,
  onAdd,
}: AddExistingItemsSheetProps<T>) {
  const { t } = useTranslate()

  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return items
    
    const query = searchQuery.toLowerCase().trim()
    return items.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  const handleAdd = React.useCallback(() => {
    onAdd()
    onOpenChange(false)
  }, [onAdd, onOpenChange])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {t("sheet.addExisting.description", "Search and select items to add")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder", "Search by code or name...")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Selected items count */}
          {selectedItems.size > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                {t("sheet.selectedCount", "Selected: {{count}}", { count: selectedItems.size })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  selectedItems.forEach((id) => onToggleItem(id))
                }}
              >
                {t("action.clearAll", "Clear all")}
              </Button>
            </div>
          )}

          {/* Items list */}
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                {t("action.loading", "Loading...")}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                {searchQuery.trim()
                  ? t("search.noResults", "No results found")
                  : t("search.noItems", "No items available")}
              </div>
            ) : (
              <div className="space-y-2 pr-4">
                {filteredItems.map((item) => {
                  const isSelected = selectedItems.has(item.id)
                  return (
                    <Card
                      key={item.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => onToggleItem(item.id)}
                    >
                      <div className="flex items-start gap-3">
                        {iconType && (
                          <div className="mt-0.5">
                            <Icon iconType={iconType} className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm text-primary">
                            {item.code}
                          </div>
                          <div className="text-sm font-medium truncate">
                            {item.name}
                          </div>
                        </div>
                        {isSelected && (
                          <Badge variant="default" className="shrink-0">
                            {t("item.selected", "Selected")}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="flex-row justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel", "Cancel")}
          </Button>
          <Button onClick={handleAdd} disabled={selectedItems.size === 0}>
            {t("action.add", "Add")} {selectedItems.size > 0 && `(${selectedItems.size})`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

