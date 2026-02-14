import type { TechnologyNode, Paginated } from "@/@types/technology-node"
import type {
  CreateNamedObjectInput,
  UpdateNamedObjectInput,
} from "@/components/shared/archimate/named-object-types"
import type { GetNamedObjectsParams } from "@/services/named-object.rest"
import { getNamedObjectsRest } from "@/services/named-object.rest"
import { archRepoPath, restRequest } from "@/services/http/rest-service"

export type CreateTechnologyNodeInput = CreateNamedObjectInput
export type UpdateTechnologyNodeInput = UpdateNamedObjectInput
export type GetTechnologyNodesParams = GetNamedObjectsParams

const HOST_NODES_ENDPOINT = "technology-host-nodes"
const DEVICE_NODES_ENDPOINT = "technology-device-nodes"

const NODE_ENDPOINTS = [HOST_NODES_ENDPOINT, DEVICE_NODES_ENDPOINT] as const

type NodeEndpoint = (typeof NODE_ENDPOINTS)[number]

async function getNodeByIdFrom(endpoint: NodeEndpoint, id: string) {
  return restRequest<TechnologyNode>(archRepoPath([endpoint, id]), { method: "GET" })
}

async function patchNodeByIdFrom(endpoint: NodeEndpoint, id: string, input: UpdateTechnologyNodeInput) {
  return restRequest<TechnologyNode>(archRepoPath([endpoint, id]), {
    method: "PATCH",
    body: input,
  })
}

async function deleteNodeByIdFrom(endpoint: NodeEndpoint, id: string) {
  return restRequest<void>(archRepoPath([endpoint, id]), { method: "DELETE" })
}

async function resolveNodeEndpoint(id: string): Promise<NodeEndpoint> {
  for (const endpoint of NODE_ENDPOINTS) {
    try {
      await getNodeByIdFrom(endpoint, id)
      return endpoint
    } catch {
      // try next endpoint
    }
  }

  throw new Error("Technology node not found")
}

async function fetchAllNodesBySearch(search?: string): Promise<TechnologyNode[]> {
  const pageSize = 100
  const items: TechnologyNode[] = []

  for (const endpoint of NODE_ENDPOINTS) {
    let page = 1
    let pageCount = 1

    do {
      const response = await getNamedObjectsRest<TechnologyNode>(endpoint, {
        search,
        page,
        pageSize,
      })

      items.push(...response.items)
      pageCount = Math.max(1, response.pageCount ?? 1)
      page += 1
    } while (page <= pageCount)
  }

  return items
}

export async function getTechnologyNodesRest(
  params: GetTechnologyNodesParams
): Promise<Paginated<TechnologyNode>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const search = params.search?.trim() ? params.search.trim() : undefined

  const all = await fetchAllNodesBySearch(search)
  const sorted = all.sort((a, b) => a.name.localeCompare(b.name))
  const total = sorted.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const offset = (page - 1) * pageSize
  const items = sorted.slice(offset, offset + pageSize)

  return {
    items,
    total,
    page,
    pageSize,
    pageCount,
  }
}

export async function getTechnologyNodeRest(id: string): Promise<TechnologyNode> {
  const endpoint = await resolveNodeEndpoint(id)
  return getNodeByIdFrom(endpoint, id)
}

export async function createTechnologyNodeRest(
  input: CreateTechnologyNodeInput
): Promise<TechnologyNode> {
  // New nodes are created as host nodes in the current architecture flow.
  return restRequest<TechnologyNode>(archRepoPath([HOST_NODES_ENDPOINT]), {
    method: "POST",
    body: input,
  })
}

export async function updateTechnologyNodeRest(
  id: string,
  input: UpdateTechnologyNodeInput
): Promise<TechnologyNode> {
  const endpoint = await resolveNodeEndpoint(id)
  return patchNodeByIdFrom(endpoint, id, input)
}

export async function deleteTechnologyNodeRest(id: string): Promise<void> {
  const endpoint = await resolveNodeEndpoint(id)
  return deleteNodeByIdFrom(endpoint, id)
}
