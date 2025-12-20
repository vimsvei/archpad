import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { restRequest } from "@/services/http/rest-service"

export type CreateApplicationComponentInput = {
  code: string
  name: string
  description?: string
}

export type UpdateApplicationComponentInput = Partial<CreateApplicationComponentInput>

export type GetApplicationComponentsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getApplicationComponents(
  params: GetApplicationComponentsParams
): Promise<Paginated<ApplicationComponent>> {
  return restRequest<Paginated<ApplicationComponent>>("application-components", {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getApplicationComponent(id: string): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>(["application-components", id], { method: "GET" })
}

export async function createApplicationComponent(
  input: CreateApplicationComponentInput
): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>("application-components", {
    method: "POST",
    body: input,
  })
}

export async function updateApplicationComponent(
  id: string,
  input: UpdateApplicationComponentInput
): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>(["application-components", id], {
    method: "PATCH",
    body: input,
  })
}


