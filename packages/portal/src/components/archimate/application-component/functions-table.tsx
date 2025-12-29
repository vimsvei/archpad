"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import ApplicationFunction2 from "@/components/icons/ApplicationFunction2"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import { ArchimateItemTable } from "./archimate-item-table"
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

export function FunctionsTable({ componentId, componentName, onAddExisting, onCreate }: FunctionsTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.functions

  const handleRefresh = React.useCallback(() => {
    // Data is already in Redux store, no need to refresh
    toast.success(t("action.updated", "Updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: Function) => {
      void (async () => {
        try {
          setIsLoading(true)
          await ApplicationComponentRest.removeApplicationComponentFunctionRest(componentId, item.id)
          dispatch(removeFunction(item.id))
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

  return (
    <ArchimateItemTable<Function>
      items={items}
      isLoading={isLoading}
      icon={ApplicationFunction2}
      editPath={(item) => `/application/functions/${item.id}`}
      onRefresh={handleRefresh}
      onCreate={onCreate}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="functions"
    />
  )
}
