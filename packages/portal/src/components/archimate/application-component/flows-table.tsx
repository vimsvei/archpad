"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { ArchimateItemTable } from "@/components/shared/archimate/archimate-item-table"
import type { RootState, AppDispatch } from "@/store/store"
import { removeFlow, type FlowItem } from "@/store/slices/application-component-edit-slice"
import { TableHead, TableCell } from "@/components/ui/table"
import { TrendingUp } from "lucide-react"

type FlowsTableProps = {
  componentId: string
  componentName?: string
  onCreate?: () => void
}

export function FlowsTable({ componentId, componentName, onCreate }: FlowsTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  // Combine incoming and outgoing flows
  const allFlows = React.useMemo(() => {
    return [...editState.outgoingFlows, ...editState.incomingFlows]
  }, [editState.outgoingFlows, editState.incomingFlows])

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: FlowItem) => {
      void (async () => {
        try {
          setIsLoading(true)
          // Determine if it's incoming or outgoing based on which array it's in
          const isIncoming = editState.incomingFlows.some((f) => f.id === item.id)
          
          // TODO: Call REST API to delete flow
          // await ApplicationComponentRest.removeFlowRest(componentId, item.id)
          
          dispatch(removeFlow({ id: item.id, isIncoming }))
          setSelectedItems((prev) => {
            const next = new Set(prev)
            next.delete(item.id)
            return next
          })
          toast.success(t("action.deleted"))
        } catch (e: any) {
          toast.error(e?.message ?? t("action.delete.failed"))
        } finally {
          setIsLoading(false)
        }
      })()
    },
    [componentId, dispatch, t, editState.incomingFlows]
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
    if (flow.sourceInterface) parts.push(flow.sourceInterface)
    
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
    if (flow.targetInterface) parts.push(flow.targetInterface)
    
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
      items={allFlows}
      isLoading={isLoading}
      icon={renderIcon as any}
      editPath={(item) => `/application/flows/${item.id}`}
      onRefresh={handleRefresh}
      onCreate={onCreate}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="flows"
      customColumns={customColumns}
      renderCustomCells={renderCustomCells}
    />
  )
}

