import { httpRequestJson, type HttpRequestOptions } from "./http-requester"

/** Oathkeeper routes /rest/arch-repo-service/* to arch-repo-service. Use for all arch-repo REST calls. */
export const ARCH_REPO_SERVICE = "arch-repo-service"

export function archRepoPath(segments: (string | number)[]): string[] {
  return [ARCH_REPO_SERVICE, ...segments.map(String)]
}

export type RestRequestOptions = Omit<HttpRequestOptions, "method"> & {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  /**
   * Query params appended to `/api/rest/<path>`.
   * Values `undefined`/`null` are omitted.
   */
  query?: Record<string, string | number | boolean | undefined | null>
}

/**
 * REST proxy requester.
 * Builds `/api/rest/<path>` URL and always includes cookies.
 */
export async function restRequest<T = unknown>(
  path: string | string[],
  options: RestRequestOptions = {}
): Promise<T> {
  const { method = "GET", query, ...rest } = options
  const pathArray = Array.isArray(path) ? path : [path]
  const baseUrl = `/api/rest/${pathArray.map(encodeURIComponent).join("/")}`

  const qs = new URLSearchParams()
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue
      qs.set(k, String(v))
    }
  }
  const url = qs.toString() ? `${baseUrl}?${qs.toString()}` : baseUrl

  return httpRequestJson<T>(url, {
    method,
    credentials: "include",
    ...rest,
  })
}




