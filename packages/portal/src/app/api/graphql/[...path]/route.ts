import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params
  const relativePath = pathSegments.join("/")
  
  // Security: prevent path traversal
  if (relativePath.includes("..") || relativePath.startsWith("/")) {
    return new NextResponse("Not Found", { status: 404 })
  }

  try {
    const filePath = join(process.cwd(), "src", "app", "api", "graphql", relativePath)
    const content = await readFile(filePath, "utf-8")
    
    return new NextResponse(content, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Failed to load GraphQL file:", error)
    return new NextResponse("Not Found", { status: 404 })
  }
}

