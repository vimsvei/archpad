"use client"

import type { DataObject } from "@/@types/data-object"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetDataObjectQuery,
  useUpdateDataObjectMutation,
} from "@/store/apis/data-object-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<DataObject>
      id={id}
      titleKey="application.data-objects"
      iconType="application-data-object"
      backPath="/application/data-objects"
      useGetItemQuery={useGetDataObjectQuery as any}
      useUpdateMutation={useUpdateDataObjectMutation as any}
    />
  )
}
