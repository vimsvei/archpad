"use client"

import type { TechnologyNetwork } from "@/@types/technology-network"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateTechnologyNetworkMutation,
  useGetTechnologyNetworksQuery,
} from "@/store/apis/technology-network-api"

export function ListPage() {
  return (
    <NamedObjectListPage<TechnologyNetwork>
      titleKey="technologies.networks"
      tableId="technology-network"
      iconType="technology-network"
      editPathPrefix="/technologies/networks"
      emptyTitleKey="table.networks.no-results"
      emptyDescriptionKey="table.networks.no-results.description"
      useListQuery={useGetTechnologyNetworksQuery as any}
      useCreateMutation={useCreateTechnologyNetworkMutation as any}
    />
  )
}
