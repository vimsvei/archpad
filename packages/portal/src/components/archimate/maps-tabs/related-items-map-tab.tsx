"use client"

import * as React from "react"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { ArchimateObjectIconType } from "@/components/archimate/archimate-object-icon"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"

export function RelatedItemsMapTab<T extends RelatedItem>({
  items,
  isLoading,
  iconType,
  editPath,
  onRefresh,
  actions,
  selection,
  emptyState,
  customColumns,
  renderCustomCells,
}: {
  items: T[]
  isLoading?: boolean
  iconType: ArchimateObjectIconType
  editPath: (item: T) => string
  onRefresh?: () => void
  actions?: {
    onCreate?: () => void
    onAddExisting?: () => void
    onDelete?: (item: T) => void
  }
  selection?: {
    selectedItems: Set<string>
    onToggleItem: (itemId: string) => void
  }
  emptyState?: {
    componentName?: string
    itemTypeKey?: string
  }
  customColumns?: React.ReactNode
  renderCustomCells?: (item: T) => React.ReactNode
}) {
  const Icon = React.useCallback(
    ({ className }: { className?: string }) => (
      <ArchimateObjectIcon type={iconType} className={className} />
    ),
    [iconType]
  )

  return (
    <ArchimateItemTable<T>
      items={items}
      isLoading={isLoading}
      icon={Icon as any}
      editPath={editPath}
      onRefresh={onRefresh}
      onCreate={actions?.onCreate}
      onAddExisting={actions?.onAddExisting}
      onDelete={actions?.onDelete}
      selectedItems={selection?.selectedItems}
      onToggleItem={selection?.onToggleItem}
      componentName={emptyState?.componentName}
      itemTypeKey={emptyState?.itemTypeKey}
      customColumns={customColumns}
      renderCustomCells={renderCustomCells}
    />
  )
}


