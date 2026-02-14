import * as React from "react"
import type { RelationLayer } from "@/components/archimate/application-component/component-detail-v3/relations-panel"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import type { NamedObjectRelationItem } from "@/components/shared/archimate/named-object-types"
import {
  relationGroupByPrefix,
  relationLayer,
} from "@/components/shared/archimate/relation-layer-factory"

const iconClassName = "size-6 min-w-6 min-h-6"

function relationIcon(type: ArchimateObjectIconType) {
  return <ArchimateObjectIcon type={type} className={iconClassName} />
}

export function createApplicationFunctionRelationLayers(args: {
  components: NamedObjectRelationItem[]
  processes: NamedObjectRelationItem[]
}): RelationLayer[] {
  return [
    relationLayer("tab.application", [
      relationGroupByPrefix({
        titleKey: "tab.components",
        icon: relationIcon("application-component"),
        items: args.components,
        editPathPrefix: "/application/components",
      }),
    ]),
    relationLayer("tab.business", [
      relationGroupByPrefix({
        titleKey: "tab.business.processes",
        icon: relationIcon("business-process"),
        items: args.processes,
        editPathPrefix: "/common/processes",
      }),
    ]),
  ]
}

export function createBusinessProcessRelationLayers(args: {
  functions: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}): RelationLayer[] {
  return [
    relationLayer("tab.business", [
      relationGroupByPrefix({
        titleKey: "tab.functions",
        icon: relationIcon("application-function"),
        items: args.functions,
        editPathPrefix: "/common/functions",
      }),
      relationGroupByPrefix({
        titleKey: "hierarchy.parent",
        icon: relationIcon("business-process"),
        items: args.parents,
        editPathPrefix: "/common/processes",
      }),
      relationGroupByPrefix({
        titleKey: "hierarchy.children",
        icon: relationIcon("business-process"),
        items: args.children,
        editPathPrefix: "/common/processes",
      }),
    ]),
  ]
}

export function createApplicationEventRelationLayers(args: {
  components: NamedObjectRelationItem[]
}): RelationLayer[] {
  return [
    relationLayer("tab.application", [
      relationGroupByPrefix({
        titleKey: "tab.components",
        icon: relationIcon("application-component"),
        items: args.components,
        editPathPrefix: "/application/components",
      }),
    ]),
  ]
}

export function createTechnologyNetworkRelationLayers(args: {
  components: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}): RelationLayer[] {
  return [
    relationLayer("tab.application", [
      relationGroupByPrefix({
        titleKey: "tab.components",
        icon: relationIcon("application-component"),
        items: args.components,
        editPathPrefix: "/application/components",
      }),
    ]),
    relationLayer("tab.technology", [
      relationGroupByPrefix({
        titleKey: "hierarchy.parent",
        icon: relationIcon("technology-network"),
        items: args.parents,
        editPathPrefix: "/technologies/networks",
      }),
      relationGroupByPrefix({
        titleKey: "hierarchy.children",
        icon: relationIcon("technology-network"),
        items: args.children,
        editPathPrefix: "/technologies/networks",
      }),
    ]),
  ]
}

export function createTechnologyNodeRelationLayers(args: {
  components: NamedObjectRelationItem[]
  systemSoftware: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}): RelationLayer[] {
  return [
    relationLayer("tab.application", [
      relationGroupByPrefix({
        titleKey: "tab.components",
        icon: relationIcon("application-component"),
        items: args.components,
        editPathPrefix: "/application/components",
      }),
    ]),
    relationLayer("tab.technology", [
      relationGroupByPrefix({
        titleKey: "tab.technology.system-software",
        icon: relationIcon("system-software"),
        items: args.systemSoftware,
        editPathPrefix: "/technologies/system-software",
      }),
      relationGroupByPrefix({
        titleKey: "hierarchy.parent",
        icon: relationIcon("technology-node"),
        items: args.parents,
        editPathPrefix: "/technologies/nodes",
      }),
      relationGroupByPrefix({
        titleKey: "hierarchy.children",
        icon: relationIcon("technology-node"),
        items: args.children,
        editPathPrefix: "/technologies/nodes",
      }),
    ]),
  ]
}
