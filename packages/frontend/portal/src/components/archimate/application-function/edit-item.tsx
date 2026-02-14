"use client"

import type { ApplicationFunction } from "@/@types/application-function"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetApplicationFunctionQuery,
  useUpdateApplicationFunctionMutation,
} from "@/store/apis/application-function-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<ApplicationFunction>
      id={id}
      titleKey="application.functions"
      iconType="application-function"
      backPath="/common/functions"
      useGetItemQuery={useGetApplicationFunctionQuery as any}
      useUpdateMutation={useUpdateApplicationFunctionMutation as any}
    />
  )
}
