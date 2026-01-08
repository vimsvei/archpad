import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

/**
 * Public API endpoint for getting solution data.
 * Does not require authentication.
 */
async function loadGqlServer(pathFromApiGraphql: string): Promise<string> {
  const key = pathFromApiGraphql.replace(/^\/+/, "")
  
  const possiblePaths = [
    join(process.cwd(), "packages/portal/src/app/api/graphql", key),
    join(process.cwd(), "src/app/api/graphql", key),
  ]
  
  for (const filePath of possiblePaths) {
    try {
      const content = await readFile(filePath, "utf-8")
      if (content.trim()) {
        return content.trim()
      }
    } catch {
      continue
    }
  }
  
  throw new Error(`Failed to load gql file: ${key}`)
}

function getGraphqlGatewayBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_GRAPHQL_ENDPOINT ??
    process.env.API_GATEWAY_INTERNAL_URL ??
    "http://oathkeeper:4455"
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if id is UUID or code
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    
    let query: string
    let variables: Record<string, unknown>
    
    if (isUuid) {
      query = await loadGqlServer("solutions/get-solution-full.gql")
      variables = { id }
    } else {
      query = await loadGqlServer("solutions/get-solution-full-by-code.gql")
      variables = { code: id }
    }
    
    // Make request to Hasura directly with public role
    // Bypass Oathkeeper for public access
    const hasuraUrl = process.env.HASURA_ENDPOINT || 
                     process.env.NEXT_PUBLIC_HASURA_ENDPOINT ||
                     "http://hasura:8080/v1/graphql"
    
    // For public access, we may need admin secret or configure Hasura to allow public role
    const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Hasura-Role": "public",
    }
    
    // If admin secret is available, use it (for public queries with admin privileges)
    if (hasuraAdminSecret) {
      headers["x-hasura-admin-secret"] = hasuraAdminSecret
    }
    
    const response = await fetch(hasuraUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    })
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      return NextResponse.json(
        { error: `GraphQL request failed: ${response.status} ${errorText}` },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    
    if (data.errors && data.errors.length > 0) {
      return NextResponse.json(
        { error: `GraphQL errors: ${data.errors.map((e: any) => e.message).join("; ")}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch solution:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
