"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsList, type RelatedItem } from "@/components/shared/related-items-list"

type Function = RelatedItem

type FunctionsTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function FunctionsTable({ componentId, onAddExisting }: FunctionsTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<Function[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch functions for component
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add function dialog
    console.log("Add function")
  }, [])

  const handleDelete = React.useCallback((item: Function) => {
    // TODO: Implement delete function
    console.log("Delete function", item)
  }, [])

  return (
    <RelatedItemsList<Function>
      title={t("application.functions", "Функции")}
      items={items}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/functions/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

