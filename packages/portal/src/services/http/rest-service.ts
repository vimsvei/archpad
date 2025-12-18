import { httpRequestJson, type HttpRequestOptions } from "./http-requester"

export type RestRequestOptions = Omit<HttpRequestOptions, "method"> & {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
}

/**
 * REST proxy requester.
 * Builds `/api/rest/<path>` URL and always includes cookies.
 */
export async function restRequest<T = unknown>(
  path: string | string[],
  options: RestRequestOptions = {}
): Promise<T> {
  const { method = "GET", ...rest } = options
  const pathArray = Array.isArray(path) ? path : [path]
  const url = `/api/rest/${pathArray.map(encodeURIComponent).join("/")}`

  return httpRequestJson<T>(url, {
    method,
    credentials: "include",
    ...rest,
  })
}




