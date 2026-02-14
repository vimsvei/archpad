import type { TechnologyNetwork, Paginated } from "@/@types/technology-network"
import type {
  CreateNamedObjectInput,
  UpdateNamedObjectInput,
} from "@/components/shared/archimate/named-object-types"
import {
  createNamedObjectRest,
  deleteNamedObjectRest,
  getNamedObjectRest,
  getNamedObjectsRest,
  type GetNamedObjectsParams,
  updateNamedObjectRest,
} from "@/services/named-object.rest"

export type CreateTechnologyNetworkInput = CreateNamedObjectInput
export type UpdateTechnologyNetworkInput = UpdateNamedObjectInput
export type GetTechnologyNetworksParams = GetNamedObjectsParams

const TECHNOLOGY_NETWORKS_ENDPOINT = "technology-networks"

export async function getTechnologyNetworksRest(
  params: GetTechnologyNetworksParams
): Promise<Paginated<TechnologyNetwork>> {
  return getNamedObjectsRest<TechnologyNetwork>(TECHNOLOGY_NETWORKS_ENDPOINT, params)
}

export async function getTechnologyNetworkRest(id: string): Promise<TechnologyNetwork> {
  return getNamedObjectRest<TechnologyNetwork>(TECHNOLOGY_NETWORKS_ENDPOINT, id)
}

export async function createTechnologyNetworkRest(
  input: CreateTechnologyNetworkInput
): Promise<TechnologyNetwork> {
  return createNamedObjectRest<TechnologyNetwork>(TECHNOLOGY_NETWORKS_ENDPOINT, input)
}

export async function updateTechnologyNetworkRest(
  id: string,
  input: UpdateTechnologyNetworkInput
): Promise<TechnologyNetwork> {
  return updateNamedObjectRest<TechnologyNetwork>(TECHNOLOGY_NETWORKS_ENDPOINT, id, input)
}

export async function deleteTechnologyNetworkRest(id: string): Promise<void> {
  return deleteNamedObjectRest(TECHNOLOGY_NETWORKS_ENDPOINT, id)
}
