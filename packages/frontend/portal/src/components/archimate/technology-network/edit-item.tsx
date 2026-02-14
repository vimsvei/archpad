"use client"

import type { TechnologyNetwork } from "@/@types/technology-network"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetTechnologyNetworkQuery,
  useUpdateTechnologyNetworkMutation,
} from "@/store/apis/technology-network-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<TechnologyNetwork>
      id={id}
      titleKey="technologies.networks"
      iconType="technology-network"
      backPath="/technologies/networks"
      useGetItemQuery={useGetTechnologyNetworkQuery as any}
      useUpdateMutation={useUpdateTechnologyNetworkMutation as any}
    />
  )
}
