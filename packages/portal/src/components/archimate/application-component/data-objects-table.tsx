"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import ApplicationDataObject from "@/components/icons/ApplicationDataObject"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import { ArchimateItemTable } from "./archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeDataObject } from "@/store/slices/application-component-edit-slice"

type DataObject = RelatedItem

type DataObjectsTableProps = {
  componentId: string
  componentName?: string
  onAddExisting?: () => void
  onCreate?: () => void
}

export function DataObjectsTable({ componentId, componentName, onAddExisting, onCreate }: DataObjectsTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.dataObjects

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated", "Updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: DataObject) => {
      void (async () => {
        try {
          setIsLoading(true)
          await ApplicationComponentRest.removeApplicationComponentDataObjectRest(componentId, item.id)
          dispatch(removeDataObject(item.id))
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
    <ArchimateItemTable<DataObject>
      items={items}
      isLoading={isLoading}
      icon={ApplicationDataObject}
      editPath={(item) => `/application/data-objects/${item.id}`}
      onRefresh={handleRefresh}
      onCreate={onCreate}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="data-objects"
    />
  )
}
