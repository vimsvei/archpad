"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { ApplicationComponentIcon } from "@/components/icons/application-component-icon"
import { ArchimateItemTable } from "@/components/archimate/archimate-item-table"
import type { RelatedItem } from "@/components/shared/related-items-list"
import type { RootState, AppDispatch } from "@/store/store"
import { removeParent, removeChild } from "@/store/slices/application-component-edit-slice"

type ApplicationComponent = RelatedItem

type HierarchyTableProps = {
  componentId: string
  onAddExistingParent?: () => void
  onAddExistingChild?: () => void
}

export function HierarchyTable({
  componentId: _componentId,
  onAddExistingParent,
  onAddExistingChild,
}: HierarchyTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const isLoadingParents = editState.isSaving
  const isLoadingChildren = editState.isSaving
  const [selectedParents, setSelectedParents] = React.useState<Set<string>>(new Set())
  const [selectedChildren, setSelectedChildren] = React.useState<Set<string>>(new Set())

  const parents = editState.parents
  const children = editState.children

  const handleRefreshParents = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleRefreshChildren = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDeleteParent = React.useCallback(
    (item: ApplicationComponent) => {
      dispatch(removeParent(item.id))
      setSelectedParents((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
      toast.success(t("action.deleted"))
    },
    [dispatch, t]
  )

  const handleDeleteChild = React.useCallback(
    (item: ApplicationComponent) => {
      dispatch(removeChild(item.id))
      setSelectedChildren((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
      toast.success(t("action.deleted"))
    },
    [dispatch, t]
  )

  const handleToggleParent = React.useCallback((itemId: string) => {
    setSelectedParents((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  const handleToggleChild = React.useCallback((itemId: string) => {
    setSelectedChildren((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  // Data is loaded from Redux store, no need for useEffect

  return (
    <Card className="flex flex-col h-full min-h-0 pt-0">
      <div className="flex flex-col gap-4 h-full min-h-0 p-6">
        {/* Parents Table */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-6 py-2 border-b mb-4">
            <h3 className="font-semibold">{t("hierarchy.parent")}</h3>
          </div>
          <div className="flex-1 min-h-0 -mx-6">
            <ArchimateItemTable<ApplicationComponent>
              items={parents}
              isLoading={isLoadingParents}
              icon={ApplicationComponentIcon}
              editPath={(item) => `/application/components/${item.id}`}
              onRefresh={handleRefreshParents}
              onAddExisting={onAddExistingParent}
              onDelete={handleDeleteParent}
              selectedItems={selectedParents}
              onToggleItem={handleToggleParent}
              hideHeader
            />
          </div>
        </div>

        {/* Children Table */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-6 py-2 border-b mb-4">
            <h3 className="font-semibold">{t("hierarchy.children")}</h3>
          </div>
          <div className="flex-1 min-h-0 -mx-6">
            <ArchimateItemTable<ApplicationComponent>
              items={children}
              isLoading={isLoadingChildren}
              icon={ApplicationComponentIcon}
              editPath={(item) => `/application/components/${item.id}`}
              onRefresh={handleRefreshChildren}
              onAddExisting={onAddExistingChild}
              onDelete={handleDeleteChild}
              selectedItems={selectedChildren}
              onToggleItem={handleToggleChild}
              hideHeader
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

