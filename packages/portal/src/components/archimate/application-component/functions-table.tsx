"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { RelatedItemsMapTab } from "@/components/archimate/maps-tabs/related-items-map-tab"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeFunction } from "@/store/slices/application-component-edit-slice"

type Function = RelatedItem

type FunctionsTableProps = {
  componentId: string
  componentName?: string
  onAddExisting?: () => void
  onCreate?: () => void
}

export function FunctionsTable({
  componentId: _componentId,
  componentName,
  onAddExisting,
  onCreate,
}: FunctionsTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const isLoading = editState.isSaving
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.functions

  const handleRefresh = React.useCallback(() => {
    // Data is already in Redux store, no need to refresh
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: Function) => {
      dispatch(removeFunction(item.id))
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
    <RelatedItemsMapTab<Function>
      items={items}
      isLoading={isLoading}
      iconType="application-function"
      editPath={(item) => `/application/functions/${item.id}`}
      onRefresh={handleRefresh}
      actions={{ onCreate, onAddExisting, onDelete: handleDelete }}
      selection={{ selectedItems, onToggleItem: handleToggleItem }}
      emptyState={{ componentName, itemTypeKey: "functions" }}
    />
  )
}
