"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { ArchimateItemTable } from "@/components/shared/archimate/archimate-item-table"
import type { RootState, AppDispatch } from "@/store/store"
import { removeFlow, type FlowItem } from "@/store/slices/solution-edit-slice"
import { TableHead, TableCell } from "@/components/ui/table"
import { TrendingUp } from "lucide-react"

type FlowsTableProps = {
  solutionId: string
  solutionName?: string
  onAddExisting?: () => void
  onCreate?: () => void
}

export function FlowsTable({ solutionId: _solutionId, solutionName, onAddExisting, onCreate }: FlowsTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.solutionEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.flows

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: FlowItem) => {
      dispatch(removeFlow(item.id))
      setSelectedItems((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
      toast.success(t("action.deleted"))
    },
    [dispatch, t]
  )

  const handleToggleItem = React.useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  const renderSource = (flow: FlowItem) => {
    const parts: string[] = []
    if (flow.sourceComponent) parts.push(flow.sourceComponent)
    if (flow.sourceFunction) parts.push(flow.sourceFunction)
    
    if (parts.length === 0) return <span className="text-muted-foreground/50">—</span>
    
    return (
      <div className="flex flex-col gap-0.5 text-sm">
        {parts.map((part, idx) => (
          <div key={idx} className="truncate">{part}</div>
        ))}
      </div>
    )
  }

  const renderTarget = (flow: FlowItem) => {
    const parts: string[] = []
    if (flow.targetComponent) parts.push(flow.targetComponent)
    if (flow.targetFunction) parts.push(flow.targetFunction)
    
    if (parts.length === 0) return <span className="text-muted-foreground/50">—</span>
    
    return (
      <div className="flex flex-col gap-0.5 text-sm">
        {parts.map((part, idx) => (
          <div key={idx} className="truncate">{part}</div>
        ))}
      </div>
    )
  }

  const customColumns = (
    <>
      <TableHead className="min-w-[200px]">{t("flow.source")}</TableHead>
      <TableHead className="min-w-[200px]">{t("flow.target")}</TableHead>
    </>
  )

  const renderCustomCells = (item: FlowItem) => (
    <>
      <TableCell>{renderSource(item)}</TableCell>
      <TableCell>{renderTarget(item)}</TableCell>
    </>
  )

  const renderIcon = () => <TrendingUp className="w-6 h-6" />

  return (
    <ArchimateItemTable<FlowItem>
      items={items}
      isLoading={isLoading}
      icon={renderIcon as any}
      editPath={(item) => `/portfolio/flows/${item.id}`}
      onRefresh={handleRefresh}
      onCreate={onCreate}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={solutionName}
      itemTypeKey="flows"
      customColumns={customColumns}
      renderCustomCells={renderCustomCells}
    />
  )
}