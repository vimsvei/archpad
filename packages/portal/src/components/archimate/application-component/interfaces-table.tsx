"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import ApplicationInterface from "@/components/icons/ApplicationInterface"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeInterface } from "@/store/slices/application-component-edit-slice"

type Interface = RelatedItem

type InterfacesTableProps = {
  componentId: string
  componentName?: string
  onAddExisting?: () => void
  onCreate?: () => void
}

export function InterfacesTable({ componentId, componentName, onAddExisting, onCreate }: InterfacesTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items = editState.interfaces

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated", "Updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: Interface) => {
      void (async () => {
        try {
          setIsLoading(true)
          await ApplicationComponentRest.removeApplicationComponentInterfaceRest(componentId, item.id)
          dispatch(removeInterface(item.id))
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
    <ArchimateItemTable<Interface>
      items={items}
      isLoading={isLoading}
      icon={ApplicationInterface}
      editPath={(item) => `/application/interfaces/${item.id}`}
      onRefresh={handleRefresh}
      onCreate={onCreate}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="interfaces"
    />
  )
}
