"use client"

import type { ApplicationEventFull } from "@/@types/application-event"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import { createApplicationEventRelationLayers } from "@/components/shared/archimate/named-object-relations-config"
import {
  useGetApplicationEventFullQuery,
  useUpdateApplicationEventMutation,
} from "@/store/apis/application-event-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<ApplicationEventFull>
      id={id}
      titleKey="application.events"
      iconType="application-event"
      backPath="/common/events"
      useGetItemQuery={useGetApplicationEventFullQuery as any}
      useUpdateMutation={useUpdateApplicationEventMutation as any}
      buildRelationLayers={(item) =>
        createApplicationEventRelationLayers({
          components: item.components,
        })
      }
    />
  )
}
