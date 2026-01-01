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


