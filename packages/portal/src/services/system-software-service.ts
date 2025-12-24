import type { SystemSoftware, Paginated } from "@/@types/system-software"
import { restRequest } from "@/services/http/rest-service"

export type CreateSystemSoftwareInput = {
  code?: string
  name: string
  description?: string
  version?: string
  kind?: string
  typeId?: string
  licenseTypeId?: string
}

export type UpdateSystemSoftwareInput = Partial<CreateSystemSoftwareInput>

export type GetSystemSoftwareParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getSystemSoftware(
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

export async function getSystemSoftwareById(id: string): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>(["system-software", id], { method: "GET" })
}

export async function createSystemSoftware(
  input: CreateSystemSoftwareInput
): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>("system-software", {
    method: "POST",
    body: input,
  })
}

export async function updateSystemSoftware(
  id: string,
  input: UpdateSystemSoftwareInput
): Promise<SystemSoftware> {
  return restRequest<SystemSoftware>(["system-software", id], {
    method: "PATCH",
    body: input,
  })
}

export async function deleteSystemSoftware(id: string): Promise<void> {
  return restRequest<void>(["system-software", id], {
    method: "DELETE",
  })
}

