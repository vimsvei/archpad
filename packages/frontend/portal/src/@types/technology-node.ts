import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"

export type TechnologyNode = NamedObjectRecord

export type TechnologyNodeFull = TechnologyNode & {
  components: NamedObjectRelationItem[]
  systemSoftware: NamedObjectRelationItem[]
  parents: NamedObjectRelationItem[]
  children: NamedObjectRelationItem[]
}

export type { Paginated } from "@archpad/contract"
