"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeSystemSoftware } from "@/store/slices/application-component-edit-slice"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"

type SystemSoftwareItem = RelatedItem & {
  kind?: string
}

type SystemSoftwareTableProps = {
  componentId: string
  componentName?: string
  onAddExisting?: () => void
}

export function SystemSoftwareTable({ componentId, componentName, onAddExisting }: SystemSoftwareTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const items: RelatedItem[] = editState.systemSoftware

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: RelatedItem) => {
      void (async () => {
        try {
          setIsLoading(true)
          await ApplicationComponentRest.removeApplicationComponentSystemSoftwareRest(componentId, item.id)
          dispatch(removeSystemSoftware(item.id))
          setSelectedItems((prev) => {
            const next = new Set(prev)
            next.delete(item.id)
            return next
          })
          toast.success(t("action.deleted"))
        } catch (e: any) {
          toast.error(e?.message ?? t("action.deleteFailed"))
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

  const renderIcon = () => <ArchimateObjectIcon type="system-software" className="w-6 h-6" />

  return (
    <ArchimateItemTable<RelatedItem>
      items={items}
      isLoading={isLoading}
      icon={renderIcon as any}
      editPath={(item) => `/system/software/${item.id}`}
      onRefresh={handleRefresh}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
      selectedItems={selectedItems}
      onToggleItem={handleToggleItem}
      componentName={componentName}
      itemTypeKey="system-software"
    />
  )
}
