"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { RelatedItemsMapTab } from "@/components/shared/archimate/maps-tabs/related-items-map-tab"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeTechnologyNode } from "@/store/slices/solution-edit-slice"

type TechnologyNodesTableProps = {
  solutionId: string
  solutionName?: string
  onAddExisting?: () => void
}

export function TechnologyNodesTable({
  solutionId: _solutionId,
  solutionName,
  onAddExisting,
}: TechnologyNodesTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.solutionEdit)
  const isLoading = editState.isSaving
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.technologyNodes

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: RelatedItem) => {
      dispatch(removeTechnologyNode(item.id))
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

  return (
    <RelatedItemsMapTab<RelatedItem>
      items={items}
      isLoading={isLoading}
      iconType="technology-node"
      editPath={(item) => `/portfolio/technologies/nodes/${item.id}`}
      onRefresh={handleRefresh}
      actions={{ onAddExisting, onDelete: handleDelete }}
      selection={{ selectedItems, onToggleItem: handleToggleItem }}
      emptyState={{ componentName: solutionName, itemTypeKey: "nodes" }}
    />
  )
}