import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"

export type ApplicationEvent = NamedObjectRecord

export type ApplicationEventFull = ApplicationEvent & {
  components: NamedObjectRelationItem[]
}

export type { Paginated } from "@archpad/contract"
