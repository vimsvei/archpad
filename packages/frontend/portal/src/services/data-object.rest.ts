import type { DataObject, Paginated } from "@/@types/data-object"
import { restRequest, archRepoPath } from "@/services/http/rest-service"

export type CreateDataObjectInput = {
  code?: string
  name: string
  description?: string
}

export type UpdateDataObjectInput = Partial<CreateDataObjectInput>

export type GetDataObjectsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getDataObjectsRest(
  params: GetDataObjectsParams
): Promise<Paginated<DataObject>> {
  return restRequest<Paginated<DataObject>>(archRepoPath(["data-objects"]), {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getDataObjectRest(id: string): Promise<DataObject> {
  return restRequest<DataObject>(archRepoPath(["data-objects", id]), { method: "GET" })
}

export async function createDataObjectRest(
  input: CreateDataObjectInput
): Promise<DataObject> {
  return restRequest<DataObject>(archRepoPath(["data-objects"]), {
    method: "POST",
    body: input,
  })
}

export async function updateDataObjectRest(
  id: string,
  input: UpdateDataObjectInput
): Promise<DataObject> {
  return restRequest<DataObject>(archRepoPath(["data-objects", id]), {
    method: "PATCH",
    body: input,
  })
}

export async function deleteDataObjectRest(id: string): Promise<void> {
  return restRequest<void>(archRepoPath(["data-objects", id]), {
    method: "DELETE",
  })
}
