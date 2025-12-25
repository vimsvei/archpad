"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsList, type RelatedItem } from "@/components/shared/related-items-list"

type Event = RelatedItem

type EventsTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function EventsTable({ componentId, onAddExisting }: EventsTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = React.useState<Event[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch events for component
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add event dialog
    console.log("Add event")
  }, [])

  const handleDelete = React.useCallback((item: Event) => {
    // TODO: Implement delete event
    console.log("Delete event", item)
  }, [])

  return (
    <RelatedItemsList<Event>
      title={t("application.events", "События")}
      items={items}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/events/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

