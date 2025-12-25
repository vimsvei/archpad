"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsList, type RelatedItem } from "@/components/shared/related-items-list"

type Interface = RelatedItem

type InterfacesTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function InterfacesTable({ componentId, onAddExisting }: InterfacesTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<Interface[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch interfaces for component
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add interface dialog
    console.log("Add interface")
  }, [])

  const handleDelete = React.useCallback((item: Interface) => {
    // TODO: Implement delete interface
    console.log("Delete interface", item)
  }, [])

  return (
    <RelatedItemsList<Interface>
      title={t("application.interfaces", "Интерфейсы")}
      items={items}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/interfaces/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

