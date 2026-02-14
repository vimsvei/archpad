import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import type { SheetType } from "@/components/shared/archimate/sheet-configs"
import type { RelationLayer } from "./relations-panel"
import {
  relationGroupByPrefix,
  relationLayer,
} from "@/components/shared/archimate/relation-layer-factory"
import {
  ApplicationFunction2,
  ApplicationDataObject2,
  ApplicationInterface,
  ApplicationEvent,
  ApplicationComponent,
  SystemSoftware,
  TechnicalNode,
  Network2,
  BusinessRole,
  BusinessFunction2,
  Stakeholder,
} from "@/components/icons"

type ApplicationComponentRelationsState = {
  functions: RelationGroupItem[]
  dataObjects: RelationGroupItem[]
  interfaces: RelationGroupItem[]
  events: RelationGroupItem[]
  systemSoftware: RelationGroupItem[]
  technologyNodes: RelationGroupItem[]
  technologyNetworks: RelationGroupItem[]
  parents: RelationGroupItem[]
  children: RelationGroupItem[]
  businessActors: RelationGroupItem[]
  businessRoles: RelationGroupItem[]
  businessProcesses: RelationGroupItem[]
}

type ApplicationComponentRelationsCallbacks = {
  onAddExisting: (type: SheetType) => void
  onCreate: (type: SheetType) => void
  onRemoveFunction: (id: string) => void
  onRemoveDataObject: (id: string) => void
  onRemoveInterface: (id: string) => void
  onRemoveEvent: (id: string) => void
  onRemoveSystemSoftware: (id: string) => void
  onRemoveTechnologyNode: (id: string) => void
  onRemoveTechnologyNetwork: (id: string) => void
  onRemoveParent: (id: string) => void
  onRemoveChild: (id: string) => void
}

export type ApplicationComponentRelationsArgs = {
  state: ApplicationComponentRelationsState
  callbacks: ApplicationComponentRelationsCallbacks
}

const iconClassName = "size-6 min-w-6 min-h-6"

const businessNoOp = () => {}

export function createApplicationComponentRelationLayers({
  state,
  callbacks,
}: ApplicationComponentRelationsArgs): RelationLayer[] {
  const businessLayer = relationLayer("tab.business", [
    relationGroupByPrefix({
      titleKey: "tab.business.actors",
      icon: <Stakeholder className={iconClassName} />,
      items: state.businessActors,
      editPathPrefix: "/business/actors",
      onDelete: businessNoOp,
    }),
    relationGroupByPrefix({
      titleKey: "tab.business.processes",
      icon: <BusinessFunction2 className={iconClassName} />,
      items: state.businessProcesses,
      editPathPrefix: "/common/processes",
      onDelete: businessNoOp,
    }),
    relationGroupByPrefix({
      titleKey: "tab.business.roles",
      icon: <BusinessRole className={iconClassName} />,
      items: state.businessRoles,
      editPathPrefix: "/business/roles",
      onDelete: businessNoOp,
    }),
  ])

  const applicationLayer = relationLayer("tab.application", [
    relationGroupByPrefix({
      titleKey: "tab.functions",
      icon: <ApplicationFunction2 className={iconClassName} />,
      items: state.functions,
      editPathPrefix: "/common/functions",
      onAddExisting: () => callbacks.onAddExisting("functions"),
      onCreate: () => callbacks.onCreate("functions"),
      onDeleteById: callbacks.onRemoveFunction,
    }),
    relationGroupByPrefix({
      titleKey: "tab.interfaces",
      icon: <ApplicationInterface className={iconClassName} />,
      items: state.interfaces,
      editPathPrefix: "/application/interfaces",
      onAddExisting: () => callbacks.onAddExisting("interfaces"),
      onCreate: () => callbacks.onCreate("interfaces"),
      onDeleteById: callbacks.onRemoveInterface,
    }),
    relationGroupByPrefix({
      titleKey: "tab.events",
      icon: <ApplicationEvent className={iconClassName} />,
      items: state.events,
      editPathPrefix: "/common/events",
      onAddExisting: () => callbacks.onAddExisting("events"),
      onCreate: () => callbacks.onCreate("events"),
      onDeleteById: callbacks.onRemoveEvent,
    }),
    relationGroupByPrefix({
      titleKey: "tab.data-objects",
      icon: <ApplicationDataObject2 className={iconClassName} />,
      items: state.dataObjects,
      editPathPrefix: "/application/data-objects",
      onAddExisting: () => callbacks.onAddExisting("data-objects"),
      onCreate: () => callbacks.onCreate("data-objects"),
      onDeleteById: callbacks.onRemoveDataObject,
    }),
    relationGroupByPrefix({
      titleKey: "hierarchy.parent",
      icon: <ApplicationComponent className={iconClassName} />,
      items: state.parents,
      editPathPrefix: "/application/components",
      onAddExisting: () => callbacks.onAddExisting("parent"),
      onDeleteById: callbacks.onRemoveParent,
    }),
    relationGroupByPrefix({
      titleKey: "hierarchy.children",
      icon: <ApplicationComponent className={iconClassName} />,
      items: state.children,
      editPathPrefix: "/application/components",
      onAddExisting: () => callbacks.onAddExisting("child"),
      onDeleteById: callbacks.onRemoveChild,
    }),
  ])

  const technologyLayer = relationLayer("tab.technology", [
    relationGroupByPrefix({
      titleKey: "tab.technology.system-software",
      icon: <SystemSoftware className={iconClassName} />,
      items: state.systemSoftware,
      editPathPrefix: "/technologies/system-software",
      onAddExisting: () => callbacks.onAddExisting("system-software"),
      onCreate: () => callbacks.onCreate("system-software"),
      onDeleteById: callbacks.onRemoveSystemSoftware,
    }),
    relationGroupByPrefix({
      titleKey: "tab.technology.nodes",
      icon: <TechnicalNode className={iconClassName} />,
      items: state.technologyNodes,
      editPathPrefix: "/technologies/nodes",
      onAddExisting: () => callbacks.onAddExisting("node"),
      onDeleteById: callbacks.onRemoveTechnologyNode,
    }),
    relationGroupByPrefix({
      titleKey: "tab.technology.networks",
      icon: <Network2 className={iconClassName} />,
      items: state.technologyNetworks,
      editPathPrefix: "/technologies/networks",
      onAddExisting: () => callbacks.onAddExisting("network"),
      onDeleteById: callbacks.onRemoveTechnologyNetwork,
    }),
  ])

  return [businessLayer, applicationLayer, technologyLayer]
}
