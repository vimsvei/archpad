"use client"

import type { ApplicationFunctionFull } from "@/@types/application-function"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import { createApplicationFunctionRelationLayers } from "@/components/shared/archimate/named-object-relations-config"
import {
  useGetApplicationFunctionFullQuery,
  useUpdateApplicationFunctionMutation,
} from "@/store/apis/application-function-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<ApplicationFunctionFull>
      id={id}
      titleKey="application.functions"
      iconType="application-function"
      backPath="/common/functions"
      useGetItemQuery={useGetApplicationFunctionFullQuery as any}
      useUpdateMutation={useUpdateApplicationFunctionMutation as any}
      buildRelationLayers={(item) =>
        createApplicationFunctionRelationLayers({
          components: item.components,
          processes: item.processes,
        })
      }
    />
  )
}
