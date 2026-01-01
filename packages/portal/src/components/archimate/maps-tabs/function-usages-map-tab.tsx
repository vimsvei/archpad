"use client"

import * as React from "react"
import { TableCell, TableHead } from "@/components/ui/table"
import type { ArchimateObjectIconType } from "@/components/archimate/archimate-object-icon"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"

export type FunctionUsageRow = RelatedItem & {
  functionId: string
  componentName: string
  accessKind: string
}

export function FunctionUsagesMapTab({
  items,
  isLoading,
  functionIconType = "application-function",
  editFunctionPath,
}: {
  items: FunctionUsageRow[]
  isLoading?: boolean
  functionIconType?: ArchimateObjectIconType
  editFunctionPath: (functionId: string) => string
}) {
  const Icon = React.useCallback(
    ({ className }: { className?: string }) => (
      <ArchimateObjectIcon type={functionIconType} className={className} />
    ),
    [functionIconType]
  )

  const customColumns = (
    <>
      <TableHead>Component</TableHead>
      <TableHead className="w-40">Access</TableHead>
    </>
  )

  const renderCustomCells = React.useCallback(
    (item: FunctionUsageRow) => (
      <>
        <TableCell>{item.componentName}</TableCell>
        <TableCell className="font-mono text-xs">{item.accessKind}</TableCell>
      </>
    ),
    []
  )

  return (
    <ArchimateItemTable<FunctionUsageRow>
      items={items}
      isLoading={isLoading}
      icon={Icon as any}
      editPath={(item) => editFunctionPath(item.functionId)}
      customColumns={customColumns}
      renderCustomCells={renderCustomCells}
    />
  )
}


