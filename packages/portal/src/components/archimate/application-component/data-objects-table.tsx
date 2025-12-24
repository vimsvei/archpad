"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsTable, type RelatedItem } from "@/components/shared/related-items-table"

type DataObject = RelatedItem

type DataObjectsTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function DataObjectsTable({ componentId, onAddExisting }: DataObjectsTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<DataObject[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch data objects for component
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add data object dialog
    console.log("Add data object")
  }, [])

  const handleDelete = React.useCallback((item: DataObject) => {
    // TODO: Implement delete data object
    console.log("Delete data object", item)
  }, [])

  return (
    <RelatedItemsTable<DataObject>
      title={t("component.dataObjects", "Объекты данных")}
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

