import type { SystemSoftware, Paginated } from "@/@types/system-software"
import type { CreateSystemSoftwareInput, UpdateSystemSoftwareInput } from "@archpad/contract"
import { restRequest } from "@/services/http/rest-service"

export type { CreateSystemSoftwareInput, UpdateSystemSoftwareInput } from "@archpad/contract"

export type GetSystemSoftwareParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getSystemSoftwareRest(
  params: GetSystemSoftwareParams
): Promise<Paginated<SystemSoftware>> {
  return restRequest<Paginated<SystemSoftware>>("system-software", {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getSystemSoftwareByIdRest(id: string): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>(["system-software", id], { method: "GET" })
}

export async function createSystemSoftwareRest(
  input: CreateSystemSoftwareInput
): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>("system-software", {
    method: "POST",
    body: input,
  })
}

export async function updateSystemSoftwareRest(
  id: string,
  input: UpdateSystemSoftwareInput
): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>(["system-software", id], {
    method: "PATCH",
    body: input,
  })
}

export async function deleteSystemSoftwareRest(id: string): Promise<void> {
  return restRequest<void>(["system-software", id], {
    method: "DELETE",
  })
}


