"use client"

import type { ApplicationEvent } from "@/@types/application-event"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetApplicationEventQuery,
  useUpdateApplicationEventMutation,
} from "@/store/apis/application-event-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<ApplicationEvent>
      id={id}
      titleKey="application.events"
      iconType="application-event"
      backPath="/common/events"
      useGetItemQuery={useGetApplicationEventQuery as any}
      useUpdateMutation={useUpdateApplicationEventMutation as any}
    />
  )
}
