"use client"

import * as React from "react"
import { RelationGroup, type RelationGroupItem } from "@/components/shared/archimate/relation-group"

export type RelationGroupConfig = {
  titleKey: string
  items: RelationGroupItem[]
  emptyTextKey: string
  editPath: (item: RelationGroupItem) => string
  onAddExisting?: () => void
  onCreate?: () => void
  onDelete: (item: RelationGroupItem) => void
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
export function RelationsPanel({
  t,
  title,
  layers,
  onRefresh,
}: RelationsPanelProps) {
  const translate = (k: string) => t(k)

  return (
    <div>
      {title && (
        <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ minWidth: "min-content" }}>
          {layers.map((layer) => (
            <div
              key={layer.titleKey}
              className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0"
              style={{ width: "340px" }}
            >
              <div className="bg-muted/30 px-4 py-2 border-b border-border">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t(layer.titleKey)}
                </h4>
              </div>
              {layer.groups.map((group) => (
                <RelationGroup
                  key={group.titleKey}
                  t={translate}
                  titleKey={group.titleKey}
                  items={group.items}
                  emptyTextKey={group.emptyTextKey}
                  editPath={group.editPath}
                  onRefresh={onRefresh}
                  onAddExisting={group.onAddExisting}
                  onCreate={group.onCreate}
                  onDelete={group.onDelete}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
