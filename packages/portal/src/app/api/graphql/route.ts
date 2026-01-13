import { NextResponse } from "next/server"
import { getAccessTokenFromCookies, getRefreshTokenFromCookies, setTokensOnResponse } from "@/lib/auth/oauth"
import { exchangeRefreshToken } from "@/lib/auth/hydra"

type GraphQLRequestBody = {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

function getGraphqlGatewayBaseUrl(): string {
  // Для серверных компонентов приоритет у внутренних адресов
  const url = process.env.API_GATEWAY_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_GRAPHQL_ENDPOINT
  if (!url) {
    throw new Error('API_GATEWAY_INTERNAL_URL or NEXT_PUBLIC_API_GRAPHQL_ENDPOINT must be set')
  }
  return url
}

export async function POST(request: Request) {
  const base = getGraphqlGatewayBaseUrl()
  const target = new URL(base)
  // Oathkeeper rule matches /graphql<...> and strips "/graphql", so:
  // - request to /graphql/v1/graphql -> upstream /v1/graphql (Hasura GraphQL endpoint)
  target.pathname = "/graphql/v1/graphql"

  const body = (await request.json()) as GraphQLRequestBody

  // Prefer our stored Hydra access token (opaque) and send it as Bearer.
  // This is what Oathkeeper expects for /graphql/* and /rest/*.
  const token = await getAccessTokenFromCookies()
  const refreshTokenFromCookie = await getRefreshTokenFromCookies()
  const auth = token ? `Bearer ${token}` : request.headers.get("authorization")

  async function doFetch(currentAuth: string | null) {
    return fetch(target.toString(), {
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

  let refreshedTokens: { accessToken: string; refreshToken?: string } | null = null
  let currentAuth: string | null = auth

  // Pre-refresh if no access token available but refresh token exists.
  if (!currentAuth && refreshTokenFromCookie) {
    try {
      refreshedTokens = await exchangeRefreshToken({ refreshToken: refreshTokenFromCookie })
      currentAuth = `Bearer ${refreshedTokens.accessToken}`
    } catch {
      // ignore
    }
  }

  let res = await doFetch(currentAuth)

  // If access token is expired, try refresh once and retry.
  if (res.status === 401 && !refreshedTokens) {
    if (refreshTokenFromCookie) {
      try {
        refreshedTokens = await exchangeRefreshToken({ refreshToken: refreshTokenFromCookie })
        res = await doFetch(`Bearer ${refreshedTokens.accessToken}`)
      } catch {
        // ignore refresh errors, return original 401 response
      }
    }
  }

  const text = await res.text()
  const response = new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  })
  if (refreshedTokens) {
    setTokensOnResponse(response, refreshedTokens)
  }
  return response
}

