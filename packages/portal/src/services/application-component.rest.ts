import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import type { CreateApplicationComponentDto } from "@archpad/contract"
import { restRequest } from "@/services/http/rest-service"

export type CreateApplicationComponentInput = CreateApplicationComponentDto

export type UpdateApplicationComponentInput = Partial<CreateApplicationComponentInput>

export type GetApplicationComponentsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getApplicationComponentsRest(
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

export async function getApplicationComponentRest(id: string): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>(["application-components", id], { method: "GET" })
}

export async function createApplicationComponentRest(
  input: CreateApplicationComponentInput
): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>("application-components", {
    method: "POST",
    body: input,
  })
}

export async function updateApplicationComponentRest(
  id: string,
  input: UpdateApplicationComponentInput
): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>(["application-components", id], {
    method: "PATCH",
    body: input,
  })
}

export async function getApplicationComponentInterfacesRest(componentId: string) {
  return restRequest<Array<{ id: string; code: string; name: string; description?: string | null }>>(
    ["application-components", componentId, "interfaces"],
    { method: "GET" }
  )
}

export async function getApplicationComponentDataObjectsRest(componentId: string) {
  return restRequest<Array<{ id: string; code: string; name: string; description?: string | null }>>(
    ["application-components", componentId, "data-objects"],
    { method: "GET" }
  )
}

export async function addApplicationComponentDataObjectRest(componentId: string, dataObjectId: string) {
  return restRequest<void>(["application-components", componentId, "data-objects"], {
    method: "POST",
    body: { dataObjectId },
  })
}

export async function removeApplicationComponentDataObjectRest(componentId: string, dataObjectId: string) {
  return restRequest<void>(["application-components", componentId, "data-objects", dataObjectId], {
    method: "DELETE",
  })
}

export async function getApplicationComponentFunctionsRest(componentId: string) {
  return restRequest<Array<{ id: string; code: string; name: string; description?: string | null }>>(
    ["application-components", componentId, "functions"],
    { method: "GET" }
  )
}

export async function addApplicationComponentFunctionRest(componentId: string, functionId: string) {
  return restRequest<void>(["application-components", componentId, "functions"], {
    method: "POST",
    body: { functionId },
  })
}

export async function removeApplicationComponentFunctionRest(componentId: string, functionId: string) {
  return restRequest<void>(["application-components", componentId, "functions", functionId], {
    method: "DELETE",
  })
}

export async function addApplicationComponentInterfaceRest(componentId: string, interfaceId: string) {
  return restRequest<void>(["application-components", componentId, "interfaces"], {
    method: "POST",
    body: { interfaceId },
  })
}

export async function removeApplicationComponentInterfaceRest(componentId: string, interfaceId: string) {
  return restRequest<void>(["application-components", componentId, "interfaces", interfaceId], {
    method: "DELETE",
  })
}

export async function getApplicationComponentEventsRest(componentId: string) {
  return restRequest<Array<{ id: string; code: string; name: string; description?: string | null }>>(
    ["application-components", componentId, "events"],
    { method: "GET" }
  )
}

export async function addApplicationComponentEventRest(componentId: string, eventId: string) {
  return restRequest<void>(["application-components", componentId, "events"], {
    method: "POST",
    body: { eventId },
  })
}

export async function removeApplicationComponentEventRest(componentId: string, eventId: string) {
  return restRequest<void>(["application-components", componentId, "events", eventId], {
    method: "DELETE",
  })
}

export async function addApplicationComponentSystemSoftwareRest(componentId: string, systemSoftwareId: string, kind?: string) {
  return restRequest<void>(["application-components", componentId, "system-software"], {
    method: "POST",
    body: { systemSoftwareId, kind },
  })
}

export async function removeApplicationComponentSystemSoftwareRest(componentId: string, systemSoftwareId: string) {
  return restRequest<void>(["application-components", componentId, "system-software", systemSoftwareId], {
    method: "DELETE",
  })
}

export async function addApplicationComponentTechnologyNodeRest(componentId: string, nodeId: string) {
  return restRequest<void>(["application-components", componentId, "technology-nodes"], {
    method: "POST",
    body: { nodeId },
  })
}

export async function removeApplicationComponentTechnologyNodeRest(componentId: string, nodeId: string) {
  return restRequest<void>(["application-components", componentId, "technology-nodes", nodeId], {
    method: "DELETE",
  })
}

export async function addApplicationComponentTechnologyNetworkRest(componentId: string, networkId: string) {
  return restRequest<void>(["application-components", componentId, "technology-networks"], {
    method: "POST",
    body: { networkId },
  })
}

export async function removeApplicationComponentTechnologyNetworkRest(componentId: string, networkId: string) {
  return restRequest<void>(["application-components", componentId, "technology-networks", networkId], {
    method: "DELETE",
  })
}

import type { UpdateApplicationComponentDto } from "@archpad/contract"

export type UpdateApplicationComponentFullInput = UpdateApplicationComponentDto

/**
 * Save full application component with all related data in a single PUT request
 */
export async function updateApplicationComponentFullRest(
  id: string,
  input: UpdateApplicationComponentFullInput
): Promise<ApplicationComponent> {
  return restRequest<ApplicationComponent>(["application-components", id], {
    method: "PUT",
    body: input,
  })
}


