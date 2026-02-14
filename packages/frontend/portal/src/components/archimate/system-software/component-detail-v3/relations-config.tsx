import { ApplicationComponent, TechnicalNode } from "@/components/icons"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import type { RelationLayer } from "@/components/archimate/application-component/component-detail-v3/relations-panel"
import {
  relationGroupByPrefix,
  relationLayer,
} from "@/components/shared/archimate/relation-layer-factory"

export type SystemSoftwareRelationsArgs = {
  components: RelationGroupItem[]
  technologyNodes: RelationGroupItem[]
  onRemoveComponent: (id: string) => void
  onRemoveTechnologyNode: (id: string) => void
}

const iconClassName = "size-6 min-w-6 min-h-6"

export function createSystemSoftwareRelationLayers({
  components,
  technologyNodes,
  onRemoveComponent,
  onRemoveTechnologyNode,
}: SystemSoftwareRelationsArgs): RelationLayer[] {
  const technologyLayer = relationLayer("tab.technology", [
    relationGroupByPrefix({
      titleKey: "tab.technology.nodes",
      icon: <TechnicalNode className={iconClassName} />,
      items: technologyNodes,
      editPathPrefix: "/technologies/nodes",
      onDeleteById: onRemoveTechnologyNode,
    }),
  ])

  const applicationLayer = relationLayer("tab.application", [
    relationGroupByPrefix({
      titleKey: "tab.components",
      icon: <ApplicationComponent className={iconClassName} />,
      items: components,
      editPathPrefix: "/application/components",
      onDeleteById: onRemoveComponent,
    }),
  ])

  return [technologyLayer, applicationLayer]
}
