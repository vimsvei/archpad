import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"

export type ApplicationFunction = NamedObjectRecord

export type ApplicationFunctionFull = ApplicationFunction & {
  components: NamedObjectRelationItem[]
  processes: NamedObjectRelationItem[]
}

export type { Paginated } from "@archpad/contract"
