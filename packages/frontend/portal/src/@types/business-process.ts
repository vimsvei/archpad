import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"

export type BusinessProcess = NamedObjectRecord

export type BusinessProcessFull = BusinessProcess & {
  functions: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}

export type { Paginated } from "@archpad/contract"
