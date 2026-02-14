import { restRequest, archRepoPath } from "@/services/http/rest-service"

export type ApplicationInterface = {
  id: string
  code: string
  name: string
  description?: string | null
  layer?: string | null
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export type GetApplicationInterfacesParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getApplicationInterfacesRest(
  params: GetApplicationInterfacesParams
): Promise<Paginated<ApplicationInterface>> {
  return restRequest<Paginated<ApplicationInterface>>(archRepoPath(["application-interfaces"]), {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getApplicationInterfaceRest(id: string): Promise<ApplicationInterface> {
  return restRequest<ApplicationInterface>(archRepoPath(["application-interfaces", id]), { method: "GET" })
}

export type CreateApplicationInterfaceInput = {
  code?: string
  name: string
  description?: string
  componentId: string
}

export async function createApplicationInterfaceRest(
  input: CreateApplicationInterfaceInput
): Promise<ApplicationInterface> {
  return restRequest<ApplicationInterface>(archRepoPath(["application-interfaces"]), {
    method: "POST",
    body: input,
  })
}

