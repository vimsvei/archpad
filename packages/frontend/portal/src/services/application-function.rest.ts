import type { ApplicationFunction, Paginated } from "@/@types/application-function"
import { restRequest, archRepoPath } from "@/services/http/rest-service"

export type CreateApplicationFunctionInput = {
  code?: string
  name: string
  description?: string
}

export type UpdateApplicationFunctionInput = Partial<CreateApplicationFunctionInput>

export type GetApplicationFunctionsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getApplicationFunctionsRest(
  params: GetApplicationFunctionsParams
): Promise<Paginated<ApplicationFunction>> {
  return restRequest<Paginated<ApplicationFunction>>(archRepoPath(["application-functions"]), {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getApplicationFunctionRest(id: string): Promise<ApplicationFunction> {
  return restRequest<ApplicationFunction>(archRepoPath(["application-functions", id]), { method: "GET" })
}

export async function createApplicationFunctionRest(
  input: CreateApplicationFunctionInput
): Promise<ApplicationFunction> {
  return restRequest<ApplicationFunction>(archRepoPath(["application-functions"]), {
    method: "POST",
    body: input,
  })
}

export async function updateApplicationFunctionRest(
  id: string,
  input: UpdateApplicationFunctionInput
): Promise<ApplicationFunction> {
  return restRequest<ApplicationFunction>(archRepoPath(["application-functions", id]), {
    method: "PATCH",
    body: input,
  })
}

export async function deleteApplicationFunctionRest(id: string): Promise<void> {
  return restRequest<void>(archRepoPath(["application-functions", id]), {
    method: "DELETE",
  })
}
