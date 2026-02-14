import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"

export type TechnologyNetwork = NamedObjectRecord

export type TechnologyNetworkFull = TechnologyNetwork & {
  components: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}

export type { Paginated } from "@archpad/contract"
