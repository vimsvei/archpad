"use client"

import * as React from "react"
import { UnfoldVertical, FoldVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RelationGroup, type RelationGroupItem } from "@/components/shared/archimate/relation-group"

export type RelationGroupConfig = {
  titleKey: string
  /** Optional icon shown left of title */
  icon?: React.ReactNode
  items: RelationGroupItem[]
  emptyTextKey: string
  editPath: (item: RelationGroupItem) => string
  onAddExisting?: () => void
  onCreate?: () => void
  onDelete?: (item: RelationGroupItem) => void
  /** When provided, "Просмотр" opens item in sidebar (read-only) instead of navigating */
  onViewInSidebar?: (item: RelationGroupItem, editPath: string) => void
}

export type RelationLayer = {
  titleKey: string
  groups: RelationGroupConfig[]
}

export type RelationsPanelProps = {
  t: (key: string) => string
  title?: string
  layers: RelationLayer[]
  onRefresh: () => void
}

/**
 * Horizontal scrollable panel of relation layers (e.g. Application, Technology).
 * Each layer is a card with multiple RelationGroups.
 * Reusable for components, solutions, data-objects.
 */
function getGroupKey(layerTitleKey: string, groupTitleKey: string) {
  return `${layerTitleKey}-${groupTitleKey}`
}

export function RelationsPanel({
  t,
  title,
  layers,
  onRefresh,
}: RelationsPanelProps) {
  const translate = (k: string) => t(k)

  const allGroupKeys = React.useMemo(
    () =>
      layers.flatMap((layer) =>
        layer.groups.map((g) => getGroupKey(layer.titleKey, g.titleKey))
      ),
    [layers]
  )

  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    allGroupKeys.forEach((k) => {
      init[k] = true
    })
    return init
  })

  React.useEffect(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev }
      let changed = false
      for (const k of allGroupKeys) {
        if (next[k] === undefined) {
          next[k] = true
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [allGroupKeys])

  const handleExpandAll = React.useCallback(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev }
      allGroupKeys.forEach((k) => {
        next[k] = true
      })
      return next
    })
  }, [allGroupKeys])

  const handleCollapseAll = React.useCallback(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev }
      allGroupKeys.forEach((k) => {
        next[k] = false
      })
      return next
    })
  }, [allGroupKeys])

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExpandAll}
                  aria-label={t("action.expandAll")}
                  className="shrink-0"
                >
                  <UnfoldVertical className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("action.expandAll")}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCollapseAll}
                  aria-label={t("action.collapseAll")}
                  className="shrink-0"
                >
                  <FoldVertical className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("action.collapseAll")}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ minWidth: "min-content" }}>
          {layers.map((layer) => (
            <div
              key={layer.titleKey}
              className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0 flex flex-col"
              style={{ width: "340px", maxHeight: "900px" }}
            >
              <div className="bg-muted/30 px-4 py-2 border-b border-border shrink-0">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t(layer.titleKey)}
                </h4>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">
              {layer.groups.map((group) => {
                const groupKey = getGroupKey(layer.titleKey, group.titleKey)
                return (
                  <RelationGroup
                    key={group.titleKey}
                    t={translate}
                    titleKey={group.titleKey}
                    icon={group.icon}
                    items={group.items}
                    emptyTextKey={group.emptyTextKey}
                    editPath={group.editPath}
                    onRefresh={onRefresh}
                    onAddExisting={group.onAddExisting}
                    onCreate={group.onCreate}
                    onDelete={group.onDelete}
                    onViewInSidebar={group.onViewInSidebar}
                    open={expandedGroups[groupKey] ?? true}
                    onOpenChange={(open) =>
                      setExpandedGroups((prev) => ({ ...prev, [groupKey]: open }))
                    }
                  />
                )
              })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
