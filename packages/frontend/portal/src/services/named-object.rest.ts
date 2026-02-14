import type { Paginated } from "@archpad/contract"
import { archRepoPath, restRequest } from "@/services/http/rest-service"
import type {
  CreateNamedObjectInput,
  NamedObjectRecord,
  UpdateNamedObjectInput,
} from "@/components/shared/archimate/named-object-types"

export type GetNamedObjectsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export async function getNamedObjectsRest<TItem extends NamedObjectRecord>(
  endpoint: string,
  params: GetNamedObjectsParams
): Promise<Paginated<TItem>> {
  return restRequest<Paginated<TItem>>(archRepoPath([endpoint]), {
    method: "GET",
    query: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
}

export async function getNamedObjectRest<TItem extends NamedObjectRecord>(
  endpoint: string,
  id: string
): Promise<TItem> {
  return restRequest<TItem>(archRepoPath([endpoint, id]), { method: "GET" })
}

export async function createNamedObjectRest<TItem extends NamedObjectRecord>(
  endpoint: string,
  input: CreateNamedObjectInput
): Promise<TItem> {
  return restRequest<TItem>(archRepoPath([endpoint]), {
    method: "POST",
    body: input,
  })
}

export async function updateNamedObjectRest<TItem extends NamedObjectRecord>(
  endpoint: string,
  id: string,
  input: UpdateNamedObjectInput
): Promise<TItem> {
  return restRequest<TItem>(archRepoPath([endpoint, id]), {
    method: "PATCH",
    body: input,
  })
}

export async function deleteNamedObjectRest(
  endpoint: string,
  id: string
): Promise<void> {
  return restRequest<void>(archRepoPath([endpoint, id]), {
    method: "DELETE",
  })
}
