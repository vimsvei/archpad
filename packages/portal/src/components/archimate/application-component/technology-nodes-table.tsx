"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeTechnologyNode } from "@/store/slices/application-component-edit-slice"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"

type TechnologyNodesTableProps = {
  componentId: string
  componentName?: string
  onAddExisting?: () => void
}

export function TechnologyNodesTable({ componentId, componentName, onAddExisting }: TechnologyNodesTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.technologyNodes

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated", "Updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: RelatedItem) => {
      void (async () => {
        try {
          setIsLoading(true)
          await ApplicationComponentRest.removeApplicationComponentTechnologyNodeRest(componentId, item.id)
          dispatch(removeTechnologyNode(item.id))
          setSelectedItems((prev) => {
            const next = new Set(prev)
            next.delete(item.id)
            return next
          })
          toast.success(t("action.deleted", "Deleted"))
        } catch (e: any) {
          toast.error(e?.message ?? t("action.deleteFailed", "Failed to delete"))
        } finally {
          setIsLoading(false)
        }
      })()
    },
    [componentId, dispatch, t]
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

  const renderIcon = () => <ArchimateObjectIcon type="technology-node" className="w-6 h-6" />

  return (
    <ArchimateItemTable<RelatedItem>
      items={items}
      isLoading={isLoading}
      icon={renderIcon as any}
      editPath={(item) => `/technology/nodes/${item.id}`}
      onRefresh={handleRefresh}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="nodes"
    />
  )
}

