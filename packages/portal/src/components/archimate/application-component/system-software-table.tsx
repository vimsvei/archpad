"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsTable, type RelatedItem } from "@/components/shared/related-items-table"

type SystemSoftware = RelatedItem & {
  kind?: string
}

type SystemSoftwareTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function SystemSoftwareTable({ componentId, onAddExisting }: SystemSoftwareTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<SystemSoftware[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch system software for component
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add system software dialog
    console.log("Add system software")
  }, [])

  const handleDelete = React.useCallback((item: SystemSoftware) => {
    // TODO: Implement delete system software
    console.log("Delete system software", item)
  }, [])

  return (
    <RelatedItemsTable<SystemSoftware>
      title={t("component.systemSoftware", "Системное ПО")}
      items={items}
      isLoading={isLoading}
      iconType="system-software"
      editPath={(item) => `/system/software/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

