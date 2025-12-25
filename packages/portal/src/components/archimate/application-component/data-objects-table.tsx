"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsList, type RelatedItem } from "@/components/shared/related-items-list"
import { toast } from "sonner"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import * as ApplicationComponentGraphql from "@/services/application-component.graphql"

type DataObject = RelatedItem

type DataObjectsTableProps = {
  componentId: string
  onAddExisting?: () => void
  onCreate?: () => void
  refreshToken?: number
}

export function DataObjectsTable({ componentId, onAddExisting, onCreate, refreshToken }: DataObjectsTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<DataObject[]>([])

  const handleRefresh = React.useCallback(() => {
    void (async () => {
      try {
        setIsLoading(true)
        const data = await ApplicationComponentGraphql.getApplicationComponentDataObjectsGraphql(componentId)
        setItems(
          data.map((x) => ({
            id: x.id,
            code: x.code,
            name: x.name,
            description: x.description ?? undefined,
          }))
        )
      } catch (e: any) {
        toast.error(e?.message ?? t("action.loadFailed", "Failed to load"))
      } finally {
        setIsLoading(false)
      }
    })()
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    onCreate?.()
  }, [onCreate])

  const handleDelete = React.useCallback((item: DataObject) => {
    void (async () => {
      try {
        setIsLoading(true)
        await ApplicationComponentRest.removeApplicationComponentDataObjectRest(componentId, item.id)
        setItems((prev) => prev.filter((x) => x.id !== item.id))
        toast.success(t("action.deleted", "Deleted"))
      } catch (e: any) {
        toast.error(e?.message ?? t("action.deleteFailed", "Failed to delete"))
      } finally {
        setIsLoading(false)
      }
    })()
  }, [componentId, t])

  React.useEffect(() => {
    handleRefresh()
  }, [handleRefresh, refreshToken])

  return (
    <RelatedItemsList<DataObject>
      title={t("application.data-objects", "Объекты данных")}
      items={items}
      isLoading={isLoading}
      iconType="application-data-object"
      editPath={(item) => `/application/data-objects/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

