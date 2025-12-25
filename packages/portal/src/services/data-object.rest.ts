import { restRequest } from "@/services/http/rest-service"

export type DataObject = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type CreateDataObjectInput = {
  code?: string
  name: string
  description?: string
}

export async function createDataObjectRest(input: CreateDataObjectInput): Promise<DataObject> {
  return restRequest<DataObject>("data-objects", {
    method: "POST",
    body: input,
  })
}


