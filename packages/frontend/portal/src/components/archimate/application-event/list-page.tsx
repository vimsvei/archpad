"use client"

import type { ApplicationEvent } from "@/@types/application-event"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateApplicationEventMutation,
  useGetApplicationEventsQuery,
} from "@/store/apis/application-event-api"

export function ListPage() {
  return (
    <NamedObjectListPage<ApplicationEvent>
      titleKey="application.events"
      tableId="application-event"
      iconType="application-event"
      editPathPrefix="/common/events"
      emptyTitleKey="table.events.no-results"
      emptyDescriptionKey="table.events.no-results.description"
      useListQuery={useGetApplicationEventsQuery as any}
      useCreateMutation={useCreateApplicationEventMutation as any}
    />
  )
}
