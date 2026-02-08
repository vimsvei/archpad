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

export type ApplicationItemsTableProps<T extends RelatedItem> = {
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
}

export function ApplicationItemsTable<T extends RelatedItem>({
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
}: ApplicationItemsTableProps<T>) {
  const { t } = useTranslate()

  const isSelected = (itemId: string) => selectedItems?.has(itemId) ?? false

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
      <div className="flex-1 overflow-auto min-h-0 px-6">
        {items.length === 0 ? (
          renderEmpty()
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {onToggleItem && <TableHead className="w-12"></TableHead>}
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-32">{t("item.code")}</TableHead>
                <TableHead>{t("item.name")}</TableHead>
                <TableHead>{t("item.description")}</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {/* Checkbox */}
                  {onToggleItem && (
                    <TableCell>
                      <Checkbox
                        checked={isSelected(item.id)}
                        onCheckedChange={() => onToggleItem(item.id)}
                      />
                    </TableCell>
                  )}
                  {/* Icon */}
                  <TableCell>
                    {Icon && <Icon className="w-6 h-6" />}
                  </TableCell>
                  {/* Code */}
                  <TableCell className="font-mono text-xs">{item.code}</TableCell>
                  {/* Name */}
                  <TableCell className="font-medium">{item.name}</TableCell>
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
                      {editPath && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                              <Link href={editPath(item)}>
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
                              onClick={() => onDelete(item)}
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
              ))}
            </TableBody>
          </Table>
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

