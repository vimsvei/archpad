"use client"

import type { TechnologyNode } from "@/@types/technology-node"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateTechnologyNodeMutation,
  useGetTechnologyNodesQuery,
} from "@/store/apis/technology-node-api"

export function ListPage() {
  return (
    <NamedObjectListPage<TechnologyNode>
      titleKey="technologies.nodes"
      tableId="technology-node"
      iconType="technology-node"
      editPathPrefix="/technologies/nodes"
      emptyTitleKey="table.nodes.no-results"
      emptyDescriptionKey="table.nodes.no-results.description"
      useListQuery={useGetTechnologyNodesQuery as any}
      useCreateMutation={useCreateTechnologyNodeMutation as any}
    />
  )
}
