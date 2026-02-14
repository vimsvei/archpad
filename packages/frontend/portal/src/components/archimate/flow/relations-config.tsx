import { BrickWallShield } from "lucide-react"
import { ApplicationDataObject2, Requirement } from "@/components/icons"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import type { RelationLayer } from "@/components/archimate/application-component/component-detail-v3/relations-panel"
import {
  relationGroup,
  relationGroupByPrefix,
  relationLayer,
} from "@/components/shared/archimate/relation-layer-factory"

const iconClassName = "size-6 min-w-6 min-h-6"

type CommonFlowRelationsArgs = {
  motivations: RelationGroupItem[]
  solutions: RelationGroupItem[]
  onRemoveMotivation?: (id: string) => void
  onRemoveSolution?: (id: string) => void
}

type ApplicationFlowRelationsArgs = CommonFlowRelationsArgs & {
  dataObjects: RelationGroupItem[]
  onRemoveDataObject?: (id: string) => void
}

export function createApplicationFlowRelationLayers({
  dataObjects,
  motivations,
  solutions,
  onRemoveDataObject,
  onRemoveMotivation,
  onRemoveSolution,
}: ApplicationFlowRelationsArgs): RelationLayer[] {
  return [
    relationLayer("tab.application", [
      relationGroupByPrefix({
        titleKey: "tab.data-objects",
        icon: <ApplicationDataObject2 className={iconClassName} />,
        items: dataObjects,
        editPathPrefix: "/application/data-objects",
        onDeleteById: onRemoveDataObject,
      }),
    ]),
    relationLayer("tab.motivation", [
      relationGroup({
        titleKey: "flow.relationships.motivations",
        icon: <Requirement className={iconClassName} />,
        items: motivations,
        editPath: () => "/motivation/items",
        onDeleteById: onRemoveMotivation,
      }),
    ]),
    relationLayer("portfolio.solutions", [
      relationGroupByPrefix({
        titleKey: "portfolio.solutions",
        icon: <BrickWallShield className={iconClassName} />,
        items: solutions,
        editPathPrefix: "/solutions",
        onDeleteById: onRemoveSolution,
      }),
    ]),
  ]
}

export function createTechnologyFlowRelationLayers({
  motivations,
  solutions,
  onRemoveMotivation,
  onRemoveSolution,
}: CommonFlowRelationsArgs): RelationLayer[] {
  return [
    relationLayer("tab.motivation", [
      relationGroup({
        titleKey: "flow.relationships.motivations",
        icon: <Requirement className={iconClassName} />,
        items: motivations,
        editPath: () => "/motivation/items",
        onDeleteById: onRemoveMotivation,
      }),
    ]),
    relationLayer("portfolio.solutions", [
      relationGroupByPrefix({
        titleKey: "portfolio.solutions",
        icon: <BrickWallShield className={iconClassName} />,
        items: solutions,
        editPathPrefix: "/solutions",
        onDeleteById: onRemoveSolution,
      }),
    ]),
  ]
}

