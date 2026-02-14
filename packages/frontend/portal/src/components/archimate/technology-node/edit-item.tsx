"use client"

import type { TechnologyNodeFull } from "@/@types/technology-node"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import { createTechnologyNodeRelationLayers } from "@/components/shared/archimate/named-object-relations-config"
import {
  useGetTechnologyNodeFullQuery,
  useUpdateTechnologyNodeMutation,
} from "@/store/apis/technology-node-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<TechnologyNodeFull>
      id={id}
      titleKey="technologies.nodes"
      iconType="technology-node"
      backPath="/technologies/nodes"
      useGetItemQuery={useGetTechnologyNodeFullQuery as any}
      useUpdateMutation={useUpdateTechnologyNodeMutation as any}
      buildRelationLayers={(item) =>
        createTechnologyNodeRelationLayers({
          components: item.components,
          systemSoftware: item.systemSoftware,
          parents: item.parents,
          children: item.children,
        })
      }
    />
  )
}
