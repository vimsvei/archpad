import { restRequest } from "@/services/http/rest-service"

export type ApplicationFunction = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type CreateApplicationFunctionInput = {
  code?: string
  name: string
  description?: string
}

export async function createApplicationFunctionRest(
  input: CreateApplicationFunctionInput
): Promise<ApplicationFunction> {
  return restRequest<ApplicationFunction>("application-functions", {
    method: "POST",
    body: input,
  })
}


