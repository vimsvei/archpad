/**
 * Base REST API client functions
 * All REST requests go through /api/rest proxy which handles authentication
 */

export type RestRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  headers?: HeadersInit
}

export type RestResponse<T = unknown> = {
  data: T
  status: number
  headers: Headers
}

/**
 * Makes a REST API request through the /api/rest proxy
 * The proxy handles authentication and forwards to the backend
 */
export async function restRequest<T = unknown>(
  path: string | string[],
  options: RestRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options

  const pathArray = Array.isArray(path) ? path : [path]
  const url = `/api/rest/${pathArray.map(encodeURIComponent).join("/")}`

  const requestHeaders: HeadersInit = {
    "content-type": "application/json",
    ...headers,
  }

  const res = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  })

  const json = (await res.json().catch(() => null)) as T | { error?: string; message?: string }
  
  if (!res.ok) {
    const error = (json as any)?.error ?? (json as any)?.message ?? `REST request failed (${res.status})`
    throw new Error(error)
  }

  return json as T
}

/**
 * GET request helper
 */
export async function restGet<T = unknown>(path: string | string[]): Promise<T> {
  return restRequest<T>(path, { method: "GET" })
}

/**
 * POST request helper
 */
export async function restPost<T = unknown>(path: string | string[], body?: unknown): Promise<T> {
  return restRequest<T>(path, { method: "POST", body })
}

/**
 * PUT request helper
 */
export async function restPut<T = unknown>(path: string | string[], body?: unknown): Promise<T> {
  return restRequest<T>(path, { method: "PUT", body })
}

/**
 * PATCH request helper
 */
export async function restPatch<T = unknown>(path: string | string[], body?: unknown): Promise<T> {
  return restRequest<T>(path, { method: "PATCH", body })
}

/**
 * DELETE request helper
 */
export async function restDelete<T = unknown>(path: string | string[]): Promise<T> {
  return restRequest<T>(path, { method: "DELETE" })
}

