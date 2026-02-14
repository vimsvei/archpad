"use client"

import type { BusinessProcessFull } from "@/@types/business-process"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import { createBusinessProcessRelationLayers } from "@/components/shared/archimate/named-object-relations-config"
import {
  useGetBusinessProcessFullQuery,
  useUpdateBusinessProcessMutation,
} from "@/store/apis/business-process-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<BusinessProcessFull>
      id={id}
      titleKey="business.processes"
      iconType="business-process"
      backPath="/common/processes"
      useGetItemQuery={useGetBusinessProcessFullQuery as any}
      useUpdateMutation={useUpdateBusinessProcessMutation as any}
      buildRelationLayers={(item) =>
        createBusinessProcessRelationLayers({
          functions: item.functions,
          parents: item.parents,
          children: item.children,
        })
      }
    />
  )
}
