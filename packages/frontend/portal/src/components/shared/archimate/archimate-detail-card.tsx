"use client"

import * as React from "react"
import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { MarkdownEditor } from "@/components/archimate/application-component/markdown-editor"
import {
  DetailHeader,
  type DetailHeaderProps,
} from "@/components/archimate/application-component/component-detail-v3/detail-header"
import {
  RelationsPanel,
  type RelationLayer,
} from "@/components/archimate/application-component/component-detail-v3/relations-panel"
import { SidebarItemPreview } from "@/components/archimate/application-component/component-detail-v3/sidebar-item-preview"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import { DetailLayout } from "@/components/shared/archimate/detail-layout"

type DescriptionConfig = {
  editorKey: string
  value: string
  onChange: (value: string) => void
  disabled: boolean
  id?: string
  labelKey?: string
  placeholderKey?: string
}

type RelationsConfig = {
  layers: RelationLayer[]
  titleKey?: string
  onRefresh?: () => void
}

export type ArchimateDetailCardProps = {
  t: (key: string) => string
  header: Omit<DetailHeaderProps, "t">
  description: DescriptionConfig
  relations?: RelationsConfig
  sidebar: ReactNode
  beforeGrid?: ReactNode
  mainAfterRelations?: ReactNode
}

/**
 * Unified detail card shell for Archimate objects.
 * Includes shared header, markdown description, relations panel and right preview drawer.
 */
export function ArchimateDetailCard({
  t,
  header,
  description,
  relations,
  sidebar,
  beforeGrid,
  mainAfterRelations,
}: ArchimateDetailCardProps) {
  const [previewItem, setPreviewItem] = React.useState<{
    item: RelationGroupItem
    editPath: string
  } | null>(null)

  const handleViewInSidebar = React.useCallback((item: RelationGroupItem, editPath: string) => {
    setPreviewItem({ item, editPath })
  }, [])

  const layersWithPreview = React.useMemo<RelationLayer[]>(
    () =>
      (relations?.layers ?? []).map((layer) => ({
        ...layer,
        groups: layer.groups.map((group) => ({
          ...group,
          onViewInSidebar: group.onViewInSidebar ?? handleViewInSidebar,
        })),
      })),
    [relations?.layers, handleViewInSidebar]
  )

  const handleRefresh = React.useMemo(() => {
    if (relations?.onRefresh) return relations.onRefresh
    return () => window.location.reload()
  }, [relations?.onRefresh])

  return (
    <DetailLayout
      header={<DetailHeader t={t} {...header} />}
      beforeGrid={beforeGrid}
      main={(
        <>
          <div className="flex flex-col min-h-[min(400px,50vh)]">
            <Label
              htmlFor={description.id ?? "description"}
              className="text-sm text-foreground mb-2 block shrink-0"
            >
              {t(description.labelKey ?? "item.description")}
            </Label>
            <div className="flex-1 min-h-[200px] border rounded-lg overflow-hidden flex flex-col">
              <MarkdownEditor
                key={description.editorKey}
                value={description.value}
                onChange={description.onChange}
                disabled={description.disabled}
                placeholder={t(description.placeholderKey ?? "description.placeholder")}
              />
            </div>
          </div>

          {relations && (
            <RelationsPanel
              t={t}
              title={t(relations.titleKey ?? "tab.relations")}
              layers={layersWithPreview}
              onRefresh={handleRefresh}
            />
          )}

          {mainAfterRelations}
        </>
      )}
      sidebar={(
        <>
          <SidebarItemPreview
            t={t}
            item={previewItem?.item ?? { id: "", code: "", name: "", description: null }}
            editPath={previewItem?.editPath ?? "#"}
            open={!!previewItem}
            onOpenChange={(open) => !open && setPreviewItem(null)}
          />
          {sidebar}
        </>
      )}
    />
  )
}
