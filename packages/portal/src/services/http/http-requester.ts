export type HttpRequestOptions = {
  method: string
  headers?: HeadersInit
  body?: unknown
  /**
   * Default for browser requests is fine, but we often want cookies for our Next.js proxies.
   * For `/api/rest/*` we always use `include`.
   */
  credentials?: RequestCredentials
}

/**
 * Universal JSON HTTP requester.
 *
 * - Sends JSON when `body` is provided
 * - Parses JSON response (or `null` if body is empty)
 * - Throws `Error` on non-2xx with best-effort message extraction
 */
export async function httpRequestJson<T = unknown>(
  url: string,
  options: HttpRequestOptions
): Promise<T> {
  const { method, headers = {}, body, credentials } = options

  const requestHeaders: HeadersInit = {
    ...(body ? { "content-type": "application/json" } : {}),
    ...headers,
  }

  const res = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials,
  })

  const json = (await res.json().catch(() => null)) as
    | T
    | { error?: string; message?: string }
    | null

  if (!res.ok) {
    const errorMessage =
      (json as any)?.error ??
      (json as any)?.message ??
      (typeof json === "string" ? json : null) ??
      `Request failed (${res.status})`
    // Ensure errorMessage is always a string
    const error = typeof errorMessage === "string" 
      ? errorMessage 
      : JSON.stringify(errorMessage) || `Request failed (${res.status})`
    throw new Error(error)
  }

  return json as T
}




