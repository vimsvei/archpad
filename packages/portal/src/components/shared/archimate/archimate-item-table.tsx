"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import Link from "next/link"
import { Plus, RefreshCw, Grid2x2Plus, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { RelatedItem } from "@/components/shared/related-items-list"
import { cn } from "@/lib/utils"

export type ArchimateItemTableProps<T extends RelatedItem> = {
  items: T[]
  isLoading?: boolean
  icon?: React.ComponentType<{ className?: string }>
  editPath?: (item: T) => string
  onRefresh?: () => void
  onCreate?: () => void
  onAddExisting?: () => void
  onDelete?: (item: T) => void
  selectedItems?: Set<string>
  onToggleItem?: (itemId: string) => void
  hideHeader?: boolean
  componentName?: string
  itemTypeKey?: string
  customColumns?: React.ReactNode
  renderCustomCells?: (item: T) => React.ReactNode
}

// Memoized table row component to prevent unnecessary re-renders
const TableRowMemo = React.memo(function TableRowMemo<T extends RelatedItem>({
  item,
  isSelected,
  Icon,
  editPath,
  onDelete,
  onToggleItem,
  customCells,
  t,
}: {
  item: T
  isSelected: boolean
  Icon?: React.ComponentType<{ className?: string }>
  editPath?: (item: T) => string
  onDelete?: (item: T) => void
  onToggleItem?: (itemId: string) => void
  customCells?: React.ReactNode
  t: (key: string, defaultValue?: string) => string
}) {
  // Memoize handlers to prevent creating new functions on each render
  const handleToggle = React.useMemo(
    () => (onToggleItem ? () => onToggleItem(item.id) : undefined),
    [onToggleItem, item.id]
  )
  
  const handleDelete = React.useMemo(
    () => (onDelete ? () => onDelete(item) : undefined),
    [onDelete, item]
  )

  // Memoize edit URL to prevent Link re-renders
  const editUrl = React.useMemo(() => editPath?.(item), [editPath, item])

  return (
    <TableRow>
      {/* Checkbox */}
      {onToggleItem && (
        <TableCell>
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleToggle}
          />
        </TableCell>
      )}
      {/* Icon */}
      {Icon && (
        <TableCell>
          <Icon className="w-6 h-6" />
        </TableCell>
      )}
      {/* Code */}
      <TableCell className="font-mono text-xs">{item.code}</TableCell>
      {/* Name */}
      <TableCell className="font-medium">{item.name}</TableCell>
      {/* Custom cells */}
      {customCells}
      {/* Description */}
      <TableCell className="text-muted-foreground">
        {item.description ? (
          <div className="max-w-md truncate">{item.description}</div>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        )}
      </TableCell>
      {/* Actions */}
      <TableCell>
        <div className="flex items-center gap-1">
          {editUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <Link href={editUrl}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t("action.edit")}</TooltipContent>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t("action.delete")}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Only re-render if item data or selection state changes
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.code === nextProps.item.code &&
    prevProps.item.name === nextProps.item.name &&
    prevProps.item.description === nextProps.item.description &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.editPath === nextProps.editPath &&
    prevProps.onDelete === nextProps.onDelete &&
    prevProps.onToggleItem === nextProps.onToggleItem &&
    prevProps.Icon === nextProps.Icon
  )
}) as <T extends RelatedItem>(props: {
  item: T
  isSelected: boolean
  Icon?: React.ComponentType<{ className?: string }>
  editPath?: (item: T) => string
  onDelete?: (item: T) => void
  onToggleItem?: (itemId: string) => void
  customCells?: React.ReactNode
  t: (key: string, defaultValue?: string) => string
}) => React.ReactElement

function ArchimateItemTableInner<T extends RelatedItem>({
  items,
  isLoading = false,
  icon: Icon,
  editPath,
  onRefresh,
  onCreate,
  onAddExisting,
  onDelete,
  selectedItems,
  onToggleItem,
  hideHeader = false,
  componentName,
  itemTypeKey,
  customColumns,
  renderCustomCells,
}: ArchimateItemTableProps<T>) {
  const { t } = useTranslate()

  const isSelected = React.useCallback(
    (itemId: string) => selectedItems?.has(itemId) ?? false,
    [selectedItems]
  )

  // Memoize items to prevent unnecessary recalculations
  const memoizedItems = React.useMemo(() => items, [items])

  const renderEmpty = () => {
    if (!componentName || !itemTypeKey) {
      return (
        <div className="h-24 text-center text-muted-foreground flex items-center justify-center">
          {t("table.no-results")}
        </div>
      )
    }

    // Map itemTypeKey to translation key
    const translationKeyMap: Record<string, string> = {
      "functions": "functions",
      "data-objects": "data-objects",
      "interfaces": "interfaces",
      "events": "events",
      "system-software": "system-software",
      "nodes": "nodes",
      "networks": "networks",
      "flows": "flows",
    }
    const key = translationKeyMap[itemTypeKey] || itemTypeKey
    const titleKey = `table.component.${key}.no-results`
    const descriptionKey = `table.component.${key}.no-results.description`

    return (
      <Empty className="border-0">
        <EmptyContent>
          <EmptyHeader>
            {Icon && (
              <EmptyMedia variant="icon">
                <Icon className="w-6 h-6" />
              </EmptyMedia>
            )}
            <EmptyTitle>
              {t(titleKey, { component: componentName })}
            </EmptyTitle>
            <EmptyDescription>
              {t(descriptionKey, { component: componentName })}
            </EmptyDescription>
          </EmptyHeader>
        </EmptyContent>
      </Empty>
    )
  }

  const content = (
    <>
      {/* Header with actions */}
      {!hideHeader && (
        <div className="flex items-center justify-end border-b px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-2">
          {onRefresh && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRefresh}
                  disabled={isLoading}
                  aria-label={t("action.update")}
                >
                  <RefreshCw className={cn(isLoading && "animate-spin")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t("action.update")}</TooltipContent>
            </Tooltip>
          )}
          {onAddExisting && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onAddExisting}
                  aria-label={t("action.add")}
                >
                  <Grid2x2Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t("action.add")}</TooltipContent>
            </Tooltip>
          )}
          {onCreate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onCreate}
                  aria-label={t("action.create")}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t("action.create")}</TooltipContent>
            </Tooltip>
          )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 min-h-0 px-6 overflow-hidden">
        {!isLoading && items.length === 0 ? (
          <div className="py-8">
            {renderEmpty()}
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col overflow-x-auto">
            {/* Header table (no vertical scroll) */}
            <table className="w-full min-w-max caption-bottom text-sm">
              <TableHeader className="[&_tr]:border-b [&_th]:bg-card">
                <TableRow>
                  {onToggleItem && <TableHead className="w-12"></TableHead>}
                  {Icon && <TableHead className="w-12"></TableHead>}
                  <TableHead className="w-32">{t("item.code")}</TableHead>
                  <TableHead>{t("item.name")}</TableHead>
                  {customColumns}
                  <TableHead>{t("item.description")}</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
            </table>

            {/* Body table (vertical scroll only here) */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <table className="w-full min-w-max caption-bottom text-sm">
                <TableBody>
                  {memoizedItems.map((item) => {
                    const itemIsSelected = isSelected(item.id)
                    const customCells = renderCustomCells
                      ? renderCustomCells(item)
                      : undefined

                    return (
                      <TableRowMemo
                        key={item.id}
                        item={item}
                        isSelected={itemIsSelected}
                        Icon={Icon}
                        editPath={editPath}
                        onDelete={onDelete}
                        onToggleItem={onToggleItem}
                        customCells={customCells}
                        t={t}
                      />
                    )
                  })}
                </TableBody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )

  if (hideHeader) {
    return <div className="flex flex-col h-full min-h-0">{content}</div>
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col h-full min-h-0 pt-0 gap-2">{content}</Card>
    </div>
  )
}

// Export memoized version to prevent unnecessary re-renders
export const ArchimateItemTable = React.memo(ArchimateItemTableInner) as typeof ArchimateItemTableInner

