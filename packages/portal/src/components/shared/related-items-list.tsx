"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { MoreHorizontal, Plus, RefreshCw, Grid2x2Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon, type IconType } from "./icon-mapping"

export type RelatedItem = {
  id: string
  code: string
  name: string
  description?: string | null
  [key: string]: unknown
}

type RelatedItemsListProps<T extends RelatedItem> = {
  title?: string
  items: T[]
  isLoading?: boolean
  iconType?: IconType
  editPath?: (item: T) => string
  onRefresh?: () => void
  onAdd?: () => void
  onAddExisting?: () => void
  onDelete?: (item: T) => void
  additionalColumns?: ColumnDef<T>[]
  hideHeader?: boolean
  hideActions?: boolean
  onToggleItem?: (itemId: string) => void
  selectedItems?: Set<string>
  showCheckbox?: boolean
}

export function RelatedItemsList<T extends RelatedItem>({
  title,
  items,
  isLoading = false,
  iconType,
  editPath,
  onRefresh,
  onAdd,
  onAddExisting,
  onDelete,
  hideHeader = false,
  hideActions = false,
  onToggleItem,
  selectedItems,
  showCheckbox = false,
}: RelatedItemsListProps<T>) {
  const { t } = useTranslate()

  const content = (
    <>
      {!hideHeader && title && (
        <div className="flex items-center justify-between border-b px-6 py-4 flex-shrink-0">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onRefresh}
                    disabled={isLoading}
                    aria-label={t("action.update", "Обновить")}
                  >
                    <RefreshCw className={isLoading ? "animate-spin" : ""} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("action.update", "Обновить")}</TooltipContent>
              </Tooltip>
            )}
            {onAddExisting && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onAddExisting}
                    aria-label={t("action.add", "Добавить")}
                  >
                    <Grid2x2Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("action.add", "Добавить")}</TooltipContent>
              </Tooltip>
            )}
            {onAdd && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onAdd}
                    aria-label={t("action.create", "Создать")}
                  >
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("action.create", "Создать")}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-auto min-h-0 ${hideHeader ? 'px-0 py-0' : 'px-6 py-4'}`}>
        {items.length === 0 ? (
          <div className="h-24 text-center text-muted-foreground flex items-center justify-center">
            {t("table.noResults", "No results")}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className={`p-4 ${onToggleItem ? 'cursor-pointer hover:bg-accent/50' : ''} ${selectedItems?.has(item.id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={onToggleItem ? () => onToggleItem(item.id) : undefined}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox (for selection) */}
                  {showCheckbox && onToggleItem && (
                    <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedItems?.has(item.id) || false}
                        onCheckedChange={() => onToggleItem(item.id)}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  {iconType && (
                    <div className="flex-shrink-0">
                      <Icon iconType={iconType} className="w-6 h-6" />
                    </div>
                  )}

                  {/* Name and Description */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="font-medium truncate">{item.name || item.code}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!hideActions && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {editPath && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="h-8 w-8"
                            >
                              <Link href={editPath(item)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">{t("action.edit", "Редактировать")}</TooltipContent>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(item)
                              }}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">{t("action.delete", "Удалить")}</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (hideHeader) {
    return <div className="flex flex-col h-full min-h-0">{content}</div>
  }

  return <Card className="flex flex-col h-full min-h-0">{content}</Card>
}

