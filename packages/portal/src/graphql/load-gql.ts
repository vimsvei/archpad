"use client"

const cache = new Map<string, Promise<string>>()

/**
 * Loads a `.gql` file from `/public/graphql/*` at runtime.
 * Turbopack-friendly: no custom bundler loaders required.
 */
export function loadGql(pathFromPublicGraphql: string): Promise<string> {
  const key = pathFromPublicGraphql.replace(/^\/+/, "")
  const existing = cache.get(key)
  if (existing) return existing

  const p = fetch(`/graphql/${key}`, { cache: "force-cache" })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load gql (${res.status})`)
      return res.text()
    })
    .then((txt) => txt.trim())

  cache.set(key, p)
  return p
}


