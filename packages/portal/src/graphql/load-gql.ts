"use client"

const cache = new Map<string, Promise<string>>()

/**
 * Loads a `.gql` file from `/api/graphql-files/*` at runtime.
 * Files are served from `src/app/api/graphql/*` directory.
 */
export function loadGql(pathFromApiGraphql: string): Promise<string> {
  const key = pathFromApiGraphql.replace(/^\/+/, "")
  const isDev = process.env.NODE_ENV === "development"
  const existing = cache.get(key)
  if (existing && !isDev) return existing

  const p = fetch(`/api/graphql-files/${key}`, { cache: isDev ? "no-store" : "force-cache" })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load gql (${res.status})`)
      return res.text()
    })
    .then((txt) => txt.trim())

  if (!isDev) cache.set(key, p)
  return p
}


