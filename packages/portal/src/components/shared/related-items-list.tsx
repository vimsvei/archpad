"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Plus, RefreshCw, Grid2x2Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { IconType } from "./icon-mapping"
import { RelatedItemCard } from "@/components/shared/related-item-card"

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
  icon?: React.ComponentType<{ width?: number; height?: number; className?: string }>
  editPath?: (item: T) => string
  onRefresh?: () => void
  onAdd?: () => void
  onAddExisting?: () => void
  onDelete?: (item: T) => void
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
  icon: IconComponent,
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
        <div className="flex items-center justify-between border-b px-6 py-4 flex-shrink-0 min-h-20">
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
                    aria-label={t("action.update")}
                  >
                    <RefreshCw className={isLoading ? "animate-spin" : ""} />
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
            {onAdd && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onAdd}
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

      <div className={`flex-1 overflow-auto min-h-0 ${hideHeader ? 'px-0 py-0' : 'px-6 py-4'}`}>
        {items.length === 0 ? (
          <div className="h-24 text-center text-muted-foreground flex items-center justify-center">
            {t("table.no-results")}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <RelatedItemCard
                key={item.id}
                item={item}
                iconType={iconType}
                icon={IconComponent}
                editPath={editPath}
                onDelete={onDelete}
                hideActions={hideActions}
                onToggleItem={onToggleItem}
                selected={selectedItems?.has(item.id) || false}
                showCheckbox={showCheckbox}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (hideHeader) {
    return <div className="flex flex-col h-full min-h-0">{content}</div>
  }

  // Card has default `py-6`; for these list cards we want no top padding (effectively `pb-6` only).
  return <Card className="flex flex-col h-full min-h-0 pt-0">{content}</Card>
}

