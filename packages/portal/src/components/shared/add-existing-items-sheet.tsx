"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { BrushCleaning, Search, X } from "lucide-react"
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
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icon, type IconType } from "./icon-mapping"

export type SelectableItem = {
  id: string
  code: string
  name: string
  description?: string | null
  [key: string]: unknown
}

export type PageSizeOption = 10 | 25 | 50 | 100

type AddExistingItemsSheetProps<T extends SelectableItem> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  iconType?: IconType
  icon?: React.ComponentType<{ width?: number; height?: number; className?: string }>
  items: T[]
  isLoading?: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedItems: Set<string>
  onToggleItem: (itemId: string) => void
  onAdd: () => void
  pagination?: {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
    pageSize: PageSizeOption
    onPageSizeChange: (size: PageSizeOption) => void
  }
}

function getPaginationItems(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const out: Array<number | "ellipsis"> = []
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  out.push(1)
  if (left > 2) out.push("ellipsis")
  for (let p = left; p <= right; p++) out.push(p)
  if (right < total - 1) out.push("ellipsis")
  out.push(total)

  return out
}

export function AddExistingItemsSheet<T extends SelectableItem>({
  open,
  onOpenChange,
  title,
  iconType,
  icon: IconComponent,
  items,
  isLoading,
  searchQuery,
  onSearchChange,
  selectedItems,
  onToggleItem,
  onAdd,
  pagination,
}: AddExistingItemsSheetProps<T>) {
  const { t } = useTranslate()

  const selectedCountLabel = React.useMemo(() => {
    const count = selectedItems.size
    // Protect UI from malformed ICU strings in translations (Tolgee will throw).
    try {
      return t("sheet.selected.count", "Выбрано: {count}", { count })
    } catch {
      return `Выбрано: ${count}`
    }
  }, [selectedItems.size, t])

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
            {t("action.add.description")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0 pt-4 px-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder", "Поиск...")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => onSearchChange("")}
                aria-label={t("action.clear", "Очистить")}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>

          {/* Selected items count */}
          {selectedItems.size > 0 && (
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCountLabel}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("action.clear.all", "Очистить всё")}
                title={t("action.clear.all", "Очистить всё")}
                onClick={() => {
                  selectedItems.forEach((id) => onToggleItem(id))
                }}
              >
                <BrushCleaning className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Items list */}
          {/* This area owns the vertical scroll so pagination/footer never overlap the list */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
                <Spinner className="h-5 w-5" />
                <span>{t("action.loading")}</span>
              </div>
            ) : items.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                {searchQuery.trim()
                  ? t("search.no-results", "Ничего не найдено")
                  : t("search.no-items", "Нет элементов")}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const selected = selectedItems.has(item.id)
                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          onToggleItem(item.id)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={[
                        "w-full rounded-md border bg-card px-3 py-2 text-left",
                        "hover:bg-accent/50 transition-colors",
                        "flex items-center gap-3",
                        // Use inset ring so it doesn't get clipped by the scroll container
                        selected ? "ring-2 ring-inset ring-primary bg-primary/5" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="shrink-0"
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => onToggleItem(item.id)}
                        />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {item.name || item.code}
                      </span>
                      <span className="shrink-0 text-muted-foreground">
                        {IconComponent ? (
                          <IconComponent width={24} height={24} className="w-6 h-6" />
                        ) : iconType ? (
                          <Icon iconType={iconType} className="w-6 h-6" />
                        ) : null}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Pagination (before footer buttons) */}
          {pagination ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end gap-2">
                <div className="text-muted-foreground text-sm whitespace-nowrap">
                  {t("table.page.size", "Строк на странице")}
                </div>
                <Select
                  value={String(pagination.pageSize)}
                  onValueChange={(v) => pagination.onPageSizeChange(Number(v) as PageSizeOption)}
                >
                  <SelectTrigger size="sm" className="w-[90px] justify-between">
                    <SelectValue placeholder={String(pagination.pageSize)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Pagination className="mx-0 w-auto justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          pagination.onPageChange(Math.max(1, pagination.page - 1))
                        }}
                        aria-disabled={pagination.page <= 1}
                        className={pagination.page <= 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>

                    {getPaginationItems(pagination.page, Math.max(1, pagination.pageCount)).map((p, idx) =>
                      p === "ellipsis" ? (
                        <PaginationItem key={`e-${idx}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === pagination.page}
                            onClick={(e) => {
                              e.preventDefault()
                              pagination.onPageChange(p)
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          pagination.onPageChange(Math.min(Math.max(1, pagination.pageCount), pagination.page + 1))
                        }}
                        aria-disabled={pagination.page >= Math.max(1, pagination.pageCount)}
                        className={
                          pagination.page >= Math.max(1, pagination.pageCount)
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          ) : null}
        </div>

        <SheetFooter className="flex-row justify-end gap-2 px-4 pb-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={Boolean(isLoading)}>
            {t("action.cancel")}
          </Button>
          <Button onClick={handleAdd} disabled={selectedItems.size === 0 || Boolean(isLoading)}>
            {t("action.add")} {selectedItems.size > 0 && `(${selectedItems.size})`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

