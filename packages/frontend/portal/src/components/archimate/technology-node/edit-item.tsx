"use client"

import type { TechnologyNode } from "@/@types/technology-node"
import { NamedObjectEditItem } from "@/components/shared/archimate/named-object-edit-item"
import {
  useGetTechnologyNodeQuery,
  useUpdateTechnologyNodeMutation,
} from "@/store/apis/technology-node-api"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  return (
    <NamedObjectEditItem<TechnologyNode>
      id={id}
      titleKey="technologies.nodes"
      iconType="technology-node"
      backPath="/technologies/nodes"
      useGetItemQuery={useGetTechnologyNodeQuery as any}
      useUpdateMutation={useUpdateTechnologyNodeMutation as any}
    />
  )
}
