"use client"

import type { TechnologyNetworkFull } from "@/@types/technology-network"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import { createTechnologyNetworkRelationLayers } from "@/components/shared/archimate/named-object-relations-config"
import {
  useGetTechnologyNetworkFullQuery,
  useUpdateTechnologyNetworkMutation,
} from "@/store/apis/technology-network-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<TechnologyNetworkFull>
      id={id}
      titleKey="technologies.networks"
      iconType="technology-network"
      backPath="/technologies/networks"
      useGetItemQuery={useGetTechnologyNetworkFullQuery as any}
      useUpdateMutation={useUpdateTechnologyNetworkMutation as any}
      buildRelationLayers={(item) =>
        createTechnologyNetworkRelationLayers({
          components: item.components,
          parents: item.parents,
          children: item.children,
        })
      }
    />
  )
}
