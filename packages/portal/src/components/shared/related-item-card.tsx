"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon, type IconType } from "@/components/shared/icon-mapping"

import type { RelatedItem } from "@/components/shared/related-items-list"

export type RelatedItemCardProps<T extends RelatedItem> = {
  item: T
  iconType?: IconType
  icon?: React.ComponentType<{ width?: number; height?: number; className?: string }>
  editPath?: (item: T) => string
  onDelete?: (item: T) => void
  hideActions?: boolean
  onToggleItem?: (itemId: string) => void
  selected?: boolean
  showCheckbox?: boolean
}

export function RelatedItemCard<T extends RelatedItem>({
  item,
  iconType,
  icon: IconComponent,
  editPath,
  onDelete,
  hideActions = false,
  onToggleItem,
  selected = false,
  showCheckbox = false,
}: RelatedItemCardProps<T>) {
  const { t } = useTranslate()

  return (
    <Card
      key={item.id}
      className={[
        "p-4",
        onToggleItem ? "cursor-pointer hover:bg-accent/50" : "",
        selected ? "ring-2 ring-primary bg-primary/5" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onToggleItem ? () => onToggleItem(item.id) : undefined}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox (for selection) */}
        {showCheckbox && onToggleItem && (
          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={selected} onCheckedChange={() => onToggleItem(item.id)} />
          </div>
        )}

        {/* Icon */}
        {IconComponent ? (
          <div className="flex-shrink-0">
            <IconComponent width={24} height={24} className="w-6 h-6" />
          </div>
        ) : iconType ? (
          <div className="flex-shrink-0">
            <Icon iconType={iconType} className="w-6 h-6" />
          </div>
        ) : null}

        {/* Name and Description */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-xs font-medium truncate leading-4">{item.name || item.code}</div>
          {item.description && (
            <div className="text-[10px] text-muted-foreground line-clamp-2 mt-1 leading-3">
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
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(item)
                    }}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("action.delete")}</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}


