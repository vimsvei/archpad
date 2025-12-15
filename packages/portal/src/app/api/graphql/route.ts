import { NextResponse } from "next/server"
import { getAccessTokenFromCookies } from "@/lib/auth/oauth"

type GraphQLRequestBody = {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

export async function POST(request: Request) {
  const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
  if (!endpoint) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not set" },
      { status: 500 }
    )
  }

  const body = (await request.json()) as GraphQLRequestBody

  // Prefer our stored Hydra access token (opaque) and send it as Bearer.
  // This is what Oathkeeper expects for /graphql/* and /rest/*.
  const token = await getAccessTokenFromCookies()
  const auth = token ? `Bearer ${token}` : request.headers.get("authorization")

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(auth ? { authorization: auth } : {}),
    },
    body: JSON.stringify(body),
    // We want fresh data for directories in dev.
    cache: "no-store",
  })

  const text = await res.text()
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  })
}

