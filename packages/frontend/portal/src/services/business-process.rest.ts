import type { BusinessProcess, Paginated } from "@/@types/business-process"
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

export type CreateBusinessProcessInput = CreateNamedObjectInput
export type UpdateBusinessProcessInput = UpdateNamedObjectInput
export type GetBusinessProcessesParams = GetNamedObjectsParams

const BUSINESS_PROCESSES_ENDPOINT = "business-processes"

export async function getBusinessProcessesRest(
  params: GetBusinessProcessesParams
): Promise<Paginated<BusinessProcess>> {
  return getNamedObjectsRest<BusinessProcess>(BUSINESS_PROCESSES_ENDPOINT, params)
}

export async function getBusinessProcessRest(id: string): Promise<BusinessProcess> {
  return getNamedObjectRest<BusinessProcess>(BUSINESS_PROCESSES_ENDPOINT, id)
}

export async function createBusinessProcessRest(
  input: CreateBusinessProcessInput
): Promise<BusinessProcess> {
  return createNamedObjectRest<BusinessProcess>(BUSINESS_PROCESSES_ENDPOINT, input)
}

export async function updateBusinessProcessRest(
  id: string,
  input: UpdateBusinessProcessInput
): Promise<BusinessProcess> {
  return updateNamedObjectRest<BusinessProcess>(BUSINESS_PROCESSES_ENDPOINT, id, input)
}

export async function deleteBusinessProcessRest(id: string): Promise<void> {
  return deleteNamedObjectRest(BUSINESS_PROCESSES_ENDPOINT, id)
}
