"use client"

import type { BusinessProcess } from "@/@types/business-process"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetBusinessProcessQuery,
  useUpdateBusinessProcessMutation,
} from "@/store/apis/business-process-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<BusinessProcess>
      id={id}
      titleKey="business.processes"
      iconType="business-process"
      backPath="/common/processes"
      useGetItemQuery={useGetBusinessProcessQuery as any}
      useUpdateMutation={useUpdateBusinessProcessMutation as any}
    />
  )
}
