import type { ApplicationComponent } from "@/@types/application-component"
import type { CreateApplicationComponentDto, UpdateApplicationComponentDto } from "@archpad/contract"
import { restRequest } from "@/services/http/rest-service"

export type CreateApplicationComponentInput = CreateApplicationComponentDto

export type UpdateApplicationComponentInput = Partial<UpdateApplicationComponentDto>

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


export async function removeApplicationComponentInterfaceRest(componentId: string, interfaceId: string) {
  return restRequest<void>(["application-components", componentId, "interfaces", interfaceId], {
    method: "DELETE",
  })
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


export async function removeApplicationComponentSystemSoftwareRest(componentId: string, systemSoftwareId: string) {
  return restRequest<void>(["application-components", componentId, "system-software", systemSoftwareId], {
    method: "DELETE",
  })
}


export async function removeApplicationComponentTechnologyNodeRest(componentId: string, nodeId: string) {
  return restRequest<void>(["application-components", componentId, "technology-nodes", nodeId], {
    method: "DELETE",
  })
}


export async function removeApplicationComponentTechnologyNetworkRest(componentId: string, networkId: string) {
  return restRequest<void>(["application-components", componentId, "technology-networks", networkId], {
    method: "DELETE",
  })
}

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


