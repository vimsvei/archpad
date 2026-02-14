import type { FlowDetail, FlowListItem, Paginated } from "@/@types/flow"
import { archRepoPath, restRequest } from "@/services/http/rest-service"

export type Environment =
  | "local"
  | "dev"
  | "test"
  | "stage"
  | "prod"
  | "demo"
  | "dr"
  | "sandbox"

export type FlowLayerFilter = "application" | "technology"

type BaseFlowInput = {
  code?: string
  name: string
  description?: string
  motivationIds?: string[]
  solutionIds?: string[]
}

export type CreateApplicationFlowInput = BaseFlowInput & {
  layer: "Application"
  sourceComponentId: string
  targetComponentId: string
  sourceFunctionId?: string | null
  targetFunctionId?: string | null
  requestDataObjectId?: string | null
  responseDataObjectId?: string | null
  proxyComponentIds?: string[]
}

export type CreateTechnologyFlowInput = BaseFlowInput & {
  layer: "Technology"
  environment?: Environment
  sourceNodeId: string
  sourcePortId: string
  targetNodeId: string
  targetPortId: string
  proxyNodeIds?: string[]
}

export type CreateFlowInput = CreateApplicationFlowInput | CreateTechnologyFlowInput

export type UpdateFlowInput = {
  code?: string
  name?: string
  description?: string | null
  sourceComponentId?: string
  targetComponentId?: string
  sourceFunctionId?: string | null
  targetFunctionId?: string | null
  requestDataObjectId?: string | null
  responseDataObjectId?: string | null
  environment?: Environment
  sourceNodeId?: string
  sourcePortId?: string
  targetNodeId?: string
  targetPortId?: string
  proxyComponentIds?: string[]
  proxyNodeIds?: string[]
  motivationIds?: string[]
  solutionIds?: string[]
}

export type GetFlowsParams = {
  layer?: FlowLayerFilter
  search?: string
  page?: number
  pageSize?: number
}

export async function getFlowsRest(params: GetFlowsParams): Promise<Paginated<FlowListItem>> {
  return restRequest<Paginated<FlowListItem>>(archRepoPath(["flows"]), {
    method: "GET",
    query: {
      layer: params.layer,
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getFlowRest(id: string): Promise<FlowDetail> {
  return restRequest<FlowDetail>(archRepoPath(["flows", id]), {
    method: "GET",
  })
}

export async function createFlowRest(input: CreateFlowInput): Promise<FlowDetail> {
  return restRequest<FlowDetail>(archRepoPath(["flows"]), {
    method: "POST",
    body: input,
  })
}

export async function updateFlowRest(id: string, input: UpdateFlowInput): Promise<FlowDetail> {
  return restRequest<FlowDetail>(archRepoPath(["flows", id]), {
    method: "PATCH",
    body: input,
  })
}

export async function deleteFlowRest(id: string): Promise<void> {
  return restRequest<void>(archRepoPath(["flows", id]), {
    method: "DELETE",
  })
}

export async function unlinkFlowProxyComponentRest(id: string, componentId: string): Promise<void> {
  return restRequest<void>(
    archRepoPath(["flows", id, "proxy-components", componentId]),
    { method: "DELETE" }
  )
}

export async function unlinkFlowProxyNodeRest(id: string, nodeId: string): Promise<void> {
  return restRequest<void>(
    archRepoPath(["flows", id, "proxy-nodes", nodeId]),
    { method: "DELETE" }
  )
}

