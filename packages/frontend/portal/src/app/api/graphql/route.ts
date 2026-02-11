import { NextResponse } from "next/server"
import { getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceSessionAccess } from "@/lib/auth/auth-service"
import { createServerLogger } from "@archpad/logger"

const log = createServerLogger("api.graphql")

const TENANT_COOKIE_NAME = "archpad_tenant_id"

function getTenantIdFromCookies(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const match = cookieHeader.match(
    new RegExp(`(?:^|;)\\s*${TENANT_COOKIE_NAME}\\s*=\\s*([^;]+)`, "i")
  )
  const val = match?.[1]?.trim()
  return val && /^[a-f0-9-]{36}$/i.test(val) ? val : null
}

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
      } catch (e) {
        // If session is invalid/expired, let upstream respond 401.
        if (isDev) {
          const msg = e instanceof Error ? e.message : String(e)
          log.error({ sessionId: sessionId.slice(0, 8) + "...", message: msg }, undefined, e instanceof Error ? e.stack : undefined)
        }
        auth = incomingAuth
      }
    } else if (isDev) {
      log.error({ message: "No sessionId in cookies; request will go without Bearer token" })
    }

    const tenantId = getTenantIdFromCookies(request)

    async function doFetch(currentAuth: string | null) {
      const headers: Record<string, string> = {
        "content-type": "application/json",
        ...(currentAuth ? { authorization: currentAuth } : {}),
      }
      if (tenantId) headers["x-hasura-tenant-id"] = tenantId

      return fetch(targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        cache: "no-store",
      })
    }

    const res = await doFetch(auth)

    if (res.status >= 400) {
      try {
        const ct = res.headers.get("content-type") ?? ""
        const preview = (await res.clone().text().catch(() => "")).slice(0, 2000)
        const reason =
          res.status === 401
            ? "Upstream (Hasura/Oathkeeper) returned 401 Unauthorized. Possible causes: JWT invalid/expired, auth-service /session/access failed (403), misconfiguration."
            : res.status === 403
              ? "Upstream returned 403 Forbidden."
              : `Upstream returned ${res.status}.`
        log.error({
          message: `api-graphql request failed: ${reason}`,
          status: res.status,
          contentType: ct,
          targetUrl,
          hadSession,
          bodyPreview: preview,
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
    // Do NOT clear session on data fetch 401: upstream 401 can be due to misconfiguration
    // (auth-service 403, Oathkeeper) or transient issues, not necessarily invalid session.
    // Session invalidation is handled by /api/auth/me and explicit logout.
    return response
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    const cause = (() => {
      if (!e || typeof e !== "object") return undefined
      const maybeCause = (e as { cause?: unknown }).cause
      if (maybeCause instanceof Error) return maybeCause.message
      return maybeCause ? String(maybeCause) : undefined
    })()
    log.error({ message, cause, base, targetUrl }, undefined, e instanceof Error ? e.stack : undefined)
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

