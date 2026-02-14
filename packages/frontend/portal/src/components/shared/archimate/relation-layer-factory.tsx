import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import type {
  RelationGroupConfig,
  RelationLayer,
} from "@/components/archimate/application-component/component-detail-v3/relations-panel"

type RelationDeleteById = (id: string) => void

export type RelationGroupSpec = Omit<RelationGroupConfig, "emptyTextKey" | "onDelete"> & {
  emptyTextKey?: string
  onDelete?: (item: RelationGroupItem) => void
  onDeleteById?: RelationDeleteById
}

export type RelationGroupByPrefixSpec = Omit<RelationGroupSpec, "editPath"> & {
  editPathPrefix: string
}

export function relationGroup(spec: RelationGroupSpec): RelationGroupConfig {
  const onDelete = spec.onDelete
    ?? (spec.onDeleteById
      ? (item: RelationGroupItem) => spec.onDeleteById?.(item.id)
      : undefined)

  return onDelete ? {
    ...spec,
    onDelete,
    emptyTextKey: spec.emptyTextKey ?? "table.no-results",
  } : {
    ...spec,
    emptyTextKey: spec.emptyTextKey ?? "table.no-results",
  }
}

export function relationGroupByPrefix(spec: RelationGroupByPrefixSpec): RelationGroupConfig {
  return relationGroup({
    ...spec,
    editPath: (item) => `${spec.editPathPrefix}/${item.id}`,
  })
}

export function relationLayer(titleKey: string, groups: RelationGroupSpec[]): RelationLayer {
  return {
    titleKey,
    groups: groups.map(relationGroup),
  }
}
