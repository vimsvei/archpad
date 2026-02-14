"use client"

import * as React from "react"
import Link from "next/link"
import {
  ChevronDown,
  Plus,
  Link2,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  Eye,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

/** Minimal related item shape - compatible with edit-slice RelatedItem */
export type RelationGroupItem = {
  id: string
  code: string
  name: string
  description?: string | null
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export type RelationGroupProps = {
  /** Translation function */
  t: (key: string) => string
  /** Translation key for group title */
  titleKey: string
  /** Optional icon shown left of title */
  icon?: React.ReactNode
  items: RelationGroupItem[]
  /** Translation key for empty state */
  emptyTextKey: string
  /** Path to item detail page */
  editPath: (item: RelationGroupItem) => string
  onRefresh: () => void
  onAddExisting?: () => void
  onCreate?: () => void
  onDelete?: (item: RelationGroupItem) => void
  /** When provided, "Просмотр" opens item in sidebar (read-only) instead of navigating */
  onViewInSidebar?: (item: RelationGroupItem, editPath: string) => void
  /** Optional color for status indicator per item */
  stateColor?: (item: RelationGroupItem) => string | undefined
  /** Controlled open state (for expand/collapse all) */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Collapsible group of related items with dropdown actions.
 * Reusable across application-component, solution, data-object, etc.
 */
export function RelationGroup({
  t,
  titleKey,
  icon,
  items,
  emptyTextKey,
  editPath,
  onRefresh,
  onAddExisting,
  onCreate,
  onDelete,
  onViewInSidebar,
  stateColor,
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
}: RelationGroupProps) {
  const [internalOpen, setInternalOpen] = React.useState(true)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const handleToggle = React.useCallback(() => {
    const next = !isOpen
    if (isControlled) {
      onOpenChangeProp?.(next)
    } else {
      setInternalOpen(next)
      onOpenChangeProp?.(next)
    }
  }, [isControlled, isOpen, onOpenChangeProp])

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <div className="w-full flex items-center justify-between py-3 px-1 group">
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-2 flex-1 hover:text-foreground transition-colors text-left"
        >
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
          />
          {icon && (
            <span className="shrink-0 [&_svg]:min-w-6 [&_svg]:min-h-6 [&_svg]:size-6 [&_svg]:text-muted-foreground">
              {icon}
            </span>
          )}
          <span className="text-base font-semibold text-foreground">{t(titleKey)}</span>
          <span className="text-xs text-muted-foreground">{items.length}</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="group/btn focus-visible:bg-primary/10 focus-visible:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4 text-muted-foreground group-focus-visible/btn:text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRefresh}>
              <RefreshCw className="size-4 mr-2" />
              {t("action.update")}
            </DropdownMenuItem>
            {onAddExisting && (
              <DropdownMenuItem onClick={onAddExisting}>
                <Link2 className="size-4 mr-2" />
                {t("action.add")}
              </DropdownMenuItem>
            )}
            {onCreate && (
              <DropdownMenuItem onClick={onCreate}>
                <Plus className="size-4 mr-2" />
                {t("action.create")}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && (
        <div className="pb-3 px-1">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{t(emptyTextKey)}</p>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const desc = item.description ?? ""
                const descFirstPart = desc.slice(0, 80)
                const descSecondPart =
                  desc.length > 80 ? truncateText(desc.slice(80), 80) : ""
                const color = stateColor?.(item) ?? "#6b7280"

                return (
                  <div
                    key={item.id}
                    className="group/item relative hover:bg-accent/10 px-2 py-2 rounded cursor-pointer border border-transparent hover:border-border/50 transition-colors"
                  >
                    <Link href={editPath(item)} className="block">
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
                                style={{ backgroundColor: color }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>{t("item.state")}</TooltipContent>
                          </Tooltip>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="group/btn focus-visible:bg-primary/10 focus-visible:text-primary transition-colors size-6"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                              >
                                <MoreHorizontal className="size-3.5 text-muted-foreground group-focus-visible/btn:text-primary" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {onViewInSidebar ? (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onViewInSidebar(item, editPath(item))
                                  }}
                                >
                                  <Eye className="size-4 mr-2" />
                                  {t("item.action.view")}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem asChild>
                                  <Link href={editPath(item)}>
                                    <Eye className="size-4 mr-2" />
                                    {t("item.action.view")}
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem asChild>
                                <Link href={editPath(item)}>
                                  <Pencil className="size-4 mr-2" />
                                  {t("action.edit")}
                                </Link>
                              </DropdownMenuItem>
                              {onDelete && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      onDelete(item)
                                    }}
                                  >
                                    <Trash2 className="size-4 mr-2" />
                                    {t("action.delete")}
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
