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

  const ct = (res.headers.get("content-type") ?? "").toLowerCase()

  // Read body safely.
  // Important: if we try `res.json()` and it fails, the body stream is consumed.
  // So for error handling we also read `res.clone().text()` to keep a preview.
  let json: any = null
  let text: string | null = null
  let textPreviewForError: string | null = null

  if (!res.ok) {
    textPreviewForError = await res
      .clone()
      .text()
      .then((t) => (t && t.trim().length ? t.trim().slice(0, 1200) : null))
      .catch(() => null)
  }

  if (ct.includes("application/json")) {
    json = (await res.json().catch(() => null)) as any
    // If the server lied about content-type or returned empty/broken JSON, try to parse the preview.
    if (json == null && textPreviewForError) {
      const maybe = textPreviewForError.trim()
      if (maybe.startsWith("{") || maybe.startsWith("[")) {
        try {
          json = JSON.parse(maybe)
        } catch {
          // keep json null
        }
      }
    }
  } else {
    text = await res.text().catch(() => null)
    // Sometimes servers reply JSON with a wrong content-type.
    if (text && (text.trim().startsWith("{") || text.trim().startsWith("["))) {
      try {
        json = JSON.parse(text)
      } catch {
        // keep text
      }
    }
  }

  if (!res.ok) {
    // Prefer a helpful message; if both `error` and `message` exist, combine them.
    const j: any = json as any
    const hasError = typeof j?.error === "string" && j.error.trim().length > 0
    const hasMessage = typeof j?.message === "string" && j.message.trim().length > 0

    let errorText: string | null = null
    if (hasMessage && hasError) {
      errorText = j.error === j.message ? j.message : `${j.error}: ${j.message}`
    } else if (hasMessage) {
      errorText = j.message
    } else if (hasError) {
      errorText = j.error
    } else if (typeof textPreviewForError === "string" && textPreviewForError.trim().length > 0) {
      errorText = `Request failed (${res.status}) ct=${ct || "-"} body=${textPreviewForError}`
    } else if (typeof text === "string" && text.trim().length > 0) {
      errorText = `Request failed (${res.status}) ct=${ct || "-"} body=${text.trim().slice(0, 1200)}`
    } else {
      errorText = `Request failed (${res.status}) ct=${ct || "-"}`
    }

    // Attach extra debug context if server provided it (dev-only on server side).
    if (errorText && typeof j?.targetUrl === "string" && j.targetUrl.trim()) {
      errorText = `${errorText} (targetUrl=${j.targetUrl})`
    }
    if (errorText && typeof j?.base === "string" && j.base.trim()) {
      errorText = `${errorText} (base=${j.base})`
    }

    throw new Error(errorText ?? `Request failed (${res.status}) ct=${ct || "-"}`)
  }

  return (json ?? (text as any)) as T
}




