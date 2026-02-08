import { restRequest } from "@/services/http/rest-service"

export type ApplicationEvent = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type CreateApplicationEventInput = {
  code?: string
  name: string
  description?: string
}

export async function createApplicationEventRest(
  input: CreateApplicationEventInput
): Promise<ApplicationEvent> {
  return restRequest<ApplicationEvent>("application-events", {
    method: "POST",
    body: input,
  })
}


