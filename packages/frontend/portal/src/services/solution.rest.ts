import type { Solution } from "@/@types/solution"
import type { CreateSolutionDto, UpdateSolutionDto } from "@archpad/contract"
import { restRequest } from "@/services/http/rest-service"

export type CreateSolutionInput = CreateSolutionDto

export type UpdateSolutionInput = Partial<UpdateSolutionDto>

export async function createSolutionRest(
  input: CreateSolutionInput
): Promise<Solution> {
  return restRequest<Solution>("solutions", {
    method: "POST",
    body: input,
  })
}

export async function updateSolutionRest(
  id: string,
  input: UpdateSolutionInput
): Promise<Solution> {
  return restRequest<Solution>(["solutions", id], {
    method: "PATCH",
    body: input,
  })
}

export type UpdateSolutionFullInput = UpdateSolutionDto

/**
 * Save full solution with all related data in a single PUT request
 */
export async function updateSolutionFullRest(
  id: string,
  input: UpdateSolutionFullInput
): Promise<Solution> {
  return restRequest<Solution>(["solutions", id], {
    method: "PUT",
    body: input,
  })
}