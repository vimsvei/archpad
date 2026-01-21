import { NextResponse } from "next/server"
import { clearSessionOnResponse, getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceSessionAccess } from "@/lib/auth/auth-service"

type GraphQLRequestBody = {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

function getGraphqlGatewayBaseUrl(): string {
  // This route is an authenticated proxy via API Gateway (Oathkeeper).
  // In-cluster (production) prefer internal URL; in local dev use public URL.
  const internal = process.env.API_GATEWAY_INTERNAL_URL?.trim()
  const external = process.env.NEXT_PUBLIC_API_GRAPHQL_URI?.trim()
  const defaultInternal = "http://oathkeeper.secure.svc:4455"
  const url =
    process.env.NODE_ENV === "production"
      ? internal || defaultInternal || external
      : external || internal
  if (!url) {
    throw new Error("API_GATEWAY_INTERNAL_URL or NEXT_PUBLIC_API_GRAPHQL_URI must be set")
  }

  // Guardrail: this proxy expects Oathkeeper base (api.archpad.pro), not direct Hasura (apim.../v1/graphql).
  // If misconfigured, upstream will typically return 404 and the UI will show "resource does not exist".
  if (url.includes("apim.") || url.includes("/v1/graphql")) {
    throw new Error(
      'Misconfiguration: NEXT_PUBLIC_API_GRAPHQL_URI must point to API Gateway (e.g. "https://api.archpad.pro/graphql"), not Hasura (apim.../v1/graphql).'
    )
  }
  return url
}

export async function POST(request: Request) {
  const isDev = process.env.NODE_ENV !== "production"
  let base = ""
  let targetUrl = ""
  try {
    base = getGraphqlGatewayBaseUrl()
    const target = new URL(base)
    // Oathkeeper rule matches /graphql<...> and strips "/graphql", so:
    // - request to /graphql/v1/graphql -> upstream /v1/graphql (Hasura GraphQL endpoint)
    target.pathname = "/graphql/v1/graphql"
    targetUrl = target.toString()

    const body = (await request.json()) as GraphQLRequestBody

    // Browser holds only opaque session id (archpad_session).
    // Token exchange/refresh is handled by auth-service; JWT never reaches the browser.
    const sessionId = await getSessionIdFromCookies()
    const hadSession = Boolean(sessionId)
    const incomingAuth = request.headers.get("authorization")
    let auth: string | null = incomingAuth
    if (sessionId) {
      try {
        auth = `Bearer ${(await authServiceSessionAccess({ sessionId })).accessToken}`
      } catch {
        // If session is invalid/expired, let upstream respond 401.
        auth = incomingAuth
      }
    }

    async function doFetch(currentAuth: string | null) {
      return fetch(targetUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(currentAuth ? { authorization: currentAuth } : {}),
        },
        body: JSON.stringify(body),
        // We want fresh data for directories in dev.
        cache: "no-store",
      })
    }

    const res = await doFetch(auth)

    if (isDev && res.status >= 400) {
      try {
        const ct = res.headers.get("content-type") ?? ""
        const preview = (await res.clone().text().catch(() => "")).slice(0, 2000)
        console.error("[graphql.proxy] upstream error", {
          status: res.status,
          contentType: ct,
          targetUrl,
          body: preview,
        })
      } catch {
        // ignore
      }
    }

    const text = await res.text()
    const response = new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    })
    if (hadSession && res.status === 401) {
      clearSessionOnResponse(response)
    }
    return response
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    const cause = (() => {
      if (!e || typeof e !== "object") return undefined
      const maybeCause = (e as { cause?: unknown }).cause
      if (maybeCause instanceof Error) return maybeCause.message
      return maybeCause ? String(maybeCause) : undefined
    })()
    console.error("[graphql.proxy] failed", { message, cause, base, targetUrl })
    return NextResponse.json(
      {
        error: "GraphQL proxy failed",
        message,
        ...(cause ? { cause } : {}),
        ...(isDev ? { base, targetUrl } : {}),
      },
      { status: 500 }
    )
  }
}

