import type { ApplicationEventFull } from "@/@types/application-event"
import type { ApplicationFunctionFull } from "@/@types/application-function"
import type { BusinessProcessFull } from "@/@types/business-process"
import type { TechnologyNetworkFull } from "@/@types/technology-network"
import type { TechnologyNodeFull } from "@/@types/technology-node"
import type {
  NamedObjectRecord,
  NamedObjectRelationItem,
} from "@/components/shared/archimate/named-object-types"
import { loadGql } from "@/graphql/load-gql"
import { mergeTenantWhere } from "@/lib/tenant-context"
import { graphqlRequest } from "@/services/http/graphql-service"

type NamedObjectRow = Pick<
  NamedObjectRecord,
  "id" | "code" | "name" | "description" | "layer" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy"
>

type RelatedItemRow = {
  id: string | number
  code?: string | null
  name?: string | null
  description?: string | null
}

function mapNamedObjectRow(row: NamedObjectRow): NamedObjectRecord {
  return {
    id: String(row.id),
    code: String(row.code ?? ""),
    name: String(row.name ?? ""),
    description: row.description ?? null,
    layer: row.layer ?? null,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

function mapRelatedItems(items: Array<RelatedItemRow | null | undefined>): NamedObjectRelationItem[] {
  const result: NamedObjectRelationItem[] = []
  const seen = new Set<string>()

  for (const item of items) {
    if (!item) continue

    const id = String(item.id)
    if (seen.has(id)) continue
    seen.add(id)

    result.push({
      id,
      code: String(item.code ?? ""),
      name: String(item.name ?? ""),
      description: item.description ?? null,
    })
  }

  return result
}

function mapRelatedByField<TField extends string>(
  rows: Array<Partial<Record<TField, RelatedItemRow | null | undefined>>> | null | undefined,
  field: TField
): NamedObjectRelationItem[] {
  return mapRelatedItems((rows ?? []).map((row) => row[field]))
}

export async function getApplicationFunctionFullGraphql(id: string): Promise<ApplicationFunctionFull> {
  const query = await loadGql("functions/get-function-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id }, layer: { _eq: "Application" } })

  const data = await graphqlRequest<
    {
      item: NamedObjectRow[]
      componentMaps: Array<{ component?: RelatedItemRow | null }>
      processMaps: Array<{ process?: RelatedItemRow | null }>
    },
    { where: unknown; functionId: string }
  >(query, { where, functionId: id })

  const item = Array.isArray(data.item) ? data.item[0] : null
  if (!item) throw new Error("Item not found")

  return {
    ...mapNamedObjectRow(item),
    components: mapRelatedByField(data.componentMaps, "component"),
    processes: mapRelatedByField(data.processMaps, "process"),
  }
}

export async function getBusinessProcessFullGraphql(id: string): Promise<BusinessProcessFull> {
  const query = await loadGql("processes/get-process-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id }, layer: { _eq: "Business" } })

  const data = await graphqlRequest<
    {
      item: NamedObjectRow[]
      functionMaps: Array<{ function?: RelatedItemRow | null }>
      parentMaps: Array<{ parent?: RelatedItemRow | null }>
      childMaps: Array<{ child?: RelatedItemRow | null }>
    },
    { where: unknown; processId: string }
  >(query, { where, processId: id })

  const item = Array.isArray(data.item) ? data.item[0] : null
  if (!item) throw new Error("Item not found")

  return {
    ...mapNamedObjectRow(item),
    functions: mapRelatedByField(data.functionMaps, "function"),
    parents: mapRelatedByField(data.parentMaps, "parent"),
    children: mapRelatedByField(data.childMaps, "child"),
  }
}

export async function getApplicationEventFullGraphql(id: string): Promise<ApplicationEventFull> {
  const query = await loadGql("events/get-event-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id }, layer: { _eq: "Application" } })

  const data = await graphqlRequest<
    {
      item: NamedObjectRow[]
      componentMaps: Array<{ component?: RelatedItemRow | null }>
    },
    { where: unknown; eventId: string }
  >(query, { where, eventId: id })

  const item = Array.isArray(data.item) ? data.item[0] : null
  if (!item) throw new Error("Item not found")

  return {
    ...mapNamedObjectRow(item),
    components: mapRelatedByField(data.componentMaps, "component"),
  }
}

export async function getTechnologyNetworkFullGraphql(id: string): Promise<TechnologyNetworkFull> {
  const query = await loadGql("technology-networks/get-network-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })

  const data = await graphqlRequest<
    {
      item: NamedObjectRow[]
      componentMaps: Array<{ component?: RelatedItemRow | null }>
      parentMaps: Array<{ parent?: RelatedItemRow | null }>
      childMaps: Array<{ child?: RelatedItemRow | null }>
    },
    { where: unknown; networkId: string }
  >(query, { where, networkId: id })

  const item = Array.isArray(data.item) ? data.item[0] : null
  if (!item) throw new Error("Item not found")

  return {
    ...mapNamedObjectRow(item),
    components: mapRelatedByField(data.componentMaps, "component"),
    parents: mapRelatedByField(data.parentMaps, "parent"),
    children: mapRelatedByField(data.childMaps, "child"),
  }
}

export async function getTechnologyNodeFullGraphql(id: string): Promise<TechnologyNodeFull> {
  const query = await loadGql("technology-nodes/get-node-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })

  const data = await graphqlRequest<
    {
      item: NamedObjectRow[]
      componentMaps: Array<{ component?: RelatedItemRow | null }>
      softwareMaps: Array<{ systemSoftware?: RelatedItemRow | null }>
      parentMaps: Array<{ parent?: RelatedItemRow | null }>
      childMaps: Array<{ child?: RelatedItemRow | null }>
    },
    { where: unknown; nodeId: string }
  >(query, { where, nodeId: id })

  const item = Array.isArray(data.item) ? data.item[0] : null
  if (!item) throw new Error("Item not found")

  return {
    ...mapNamedObjectRow(item),
    components: mapRelatedByField(data.componentMaps, "component"),
    systemSoftware: mapRelatedByField(data.softwareMaps, "systemSoftware"),
    parents: mapRelatedByField(data.parentMaps, "parent"),
    children: mapRelatedByField(data.childMaps, "child"),
  }
}
