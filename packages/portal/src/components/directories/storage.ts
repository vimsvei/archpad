import type { ActionStamp, DirectoryItem, DirectoryRelation, DirectorySlug } from "@/types/directories"

const ITEMS_KEY_PREFIX = "archpad:directory:"
const RELATIONS_KEY = "archpad:directory-relations"
const STORE_VERSION_KEY = "archpad:directory-store-version"
const STORE_VERSION = 2

type CreateDirectoryItemInput = {
  code: string
  name: string
  description?: string
  color?: string | null
  byDefault?: boolean
}

function nowIso() {
  return new Date().toISOString()
}

function stamp(by?: string | null): ActionStamp {
  return { at: nowIso(), by: by ?? null }
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function ensureVersion() {
  if (typeof window === "undefined") return
  const raw = window.localStorage.getItem(STORE_VERSION_KEY)
  const v = raw ? Number(raw) : 0
  if (!Number.isFinite(v) || v < STORE_VERSION) {
    window.localStorage.setItem(STORE_VERSION_KEY, String(STORE_VERSION))
  }
}

function itemsKey(slug: DirectorySlug) {
  return `${ITEMS_KEY_PREFIX}${slug}`
}

function normalizeItems(slug: DirectorySlug, items: DirectoryItem[]): DirectoryItem[] {
  let changed = false
  const normalized = items.map((it: any) => {
    const next: DirectoryItem = {
      id: String(it.id ?? createId()),
      code: String(it.code ?? "").trim(),
      name: String(it.name ?? "").trim(),
      description: typeof it.description === "string" ? it.description : "",
      color: typeof it.color === "string" ? it.color : null,
      byDefault: typeof it.byDefault === "boolean" ? it.byDefault : false,
      created: it.created?.at ? it.created : it.createdAt ? { at: String(it.createdAt), by: null } : stamp(null),
      updated: it.updated?.at ? it.updated : it.updatedAt ? { at: String(it.updatedAt), by: null } : undefined,
    }
    if (!it.created && it.createdAt) changed = true
    if (!it.updated && it.updatedAt) changed = true
    if (!("byDefault" in it)) changed = true
    if (!("color" in it)) changed = true

    return next
  })

  // Keep stable ordering and persist migration if needed.
  if (changed && typeof window !== "undefined") {
    window.localStorage.setItem(itemsKey(slug), JSON.stringify(normalized))
  }
  return normalized
}

function seedItems(slug: DirectorySlug): DirectoryItem[] {
  // Minimal seed to make the UI non-empty on first open.
  if (slug === "node-types") {
    const created = stamp(null)
    return [
      { id: createId(), code: "APPLICATION", name: "Application", description: "", color: null, byDefault: false, created, updated: created },
      { id: createId(), code: "BUSINESS", name: "Business", description: "", color: null, byDefault: false, created, updated: created },
      { id: createId(), code: "TECHNOLOGY", name: "Technology", description: "", color: null, byDefault: false, created, updated: created },
    ]
  }
  return []
}

function readItems(slug: DirectorySlug): DirectoryItem[] {
  if (typeof window === "undefined") return []
  ensureVersion()
  const raw = window.localStorage.getItem(itemsKey(slug))
  const parsed = safeJsonParse<DirectoryItem[]>(raw, [])
  if (parsed.length) return normalizeItems(slug, parsed)

  const seeded = seedItems(slug)
  if (seeded.length) {
    window.localStorage.setItem(itemsKey(slug), JSON.stringify(seeded))
    return seeded
  }
  return []
}

function writeItems(slug: DirectorySlug, items: DirectoryItem[]) {
  if (typeof window === "undefined") return
  ensureVersion()
  window.localStorage.setItem(itemsKey(slug), JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("archpad:directory-items-changed", { detail: { slug } }))
}

function readAllRelations(): DirectoryRelation[] {
  if (typeof window === "undefined") return []
  ensureVersion()
  const raw = window.localStorage.getItem(RELATIONS_KEY)
  return safeJsonParse<DirectoryRelation[]>(raw, [])
}

function writeAllRelations(relations: DirectoryRelation[]) {
  if (typeof window === "undefined") return
  ensureVersion()
  window.localStorage.setItem(RELATIONS_KEY, JSON.stringify(relations))
  window.dispatchEvent(new CustomEvent("archpad:directory-relations-changed"))
}

export function getDirectoryItem(slug: DirectorySlug, id: string): DirectoryItem | null {
  const items = readItems(slug)
  return items.find((x) => x.id === id) ?? null
}

export function getDirectoryItems(slug: DirectorySlug): DirectoryItem[] {
  return readItems(slug)
}

export function createDirectoryItem(slug: DirectorySlug, input: CreateDirectoryItemInput): DirectoryItem {
  const items = readItems(slug)
  const createdStamp = stamp(null)
  const created: DirectoryItem = {
    id: createId(),
    code: input.code.trim(),
    name: input.name.trim(),
    description: input.description?.trim() ?? "",
    color: input.color?.trim() ? input.color.trim() : null,
    byDefault: input.byDefault ?? false,
    created: createdStamp,
    updated: createdStamp,
  }
  writeItems(slug, [created, ...items])
  return created
}

export function updateDirectoryItem(
  slug: DirectorySlug,
  id: string,
  patch: Partial<Pick<DirectoryItem, "code" | "name" | "description" | "color" | "byDefault">>
): DirectoryItem | null {
  const items = readItems(slug)
  let updated: DirectoryItem | null = null
  const next = items.map((it) => {
    if (it.id !== id) return it
    updated = {
      ...it,
      code: (patch.code ?? it.code).trim(),
      name: (patch.name ?? it.name).trim(),
      description: (patch.description ?? it.description ?? "").trim(),
      color: patch.color?.trim() ? patch.color.trim() : patch.color === "" ? null : it.color ?? null,
      byDefault: patch.byDefault ?? it.byDefault,
      updated: stamp(null),
    }
    return updated
  })
  if (!updated) return null
  writeItems(slug, next)
  return updated
}

export function deleteDirectoryItem(slug: DirectorySlug, id: string) {
  const items = readItems(slug)
  const next = items.filter((x) => x.id !== id)
  writeItems(slug, next)

  // Also remove relations where item is source/target.
  const relations = readAllRelations()
  const nextRelations = relations.filter(
    (r) =>
      !(r.sourceDirectorySlug === slug && r.sourceItemId === id) &&
      !(r.targetDirectorySlug === slug && r.targetItemId === id)
  )
  if (nextRelations.length !== relations.length) writeAllRelations(nextRelations)
}

export function getRelationsForSource(sourceDirectorySlug: DirectorySlug, sourceItemId: string): DirectoryRelation[] {
  return readAllRelations().filter(
    (r) => r.sourceDirectorySlug === sourceDirectorySlug && r.sourceItemId === sourceItemId
  )
}

export function addRelation(input: Omit<DirectoryRelation, "id" | "createdAt">): DirectoryRelation {
  const all = readAllRelations()
  const created: DirectoryRelation = { ...input, id: createId(), createdAt: nowIso() }
  writeAllRelations([created, ...all])
  return created
}

export function removeRelation(relationId: string) {
  const all = readAllRelations()
  const next = all.filter((r) => r.id !== relationId)
  writeAllRelations(next)
}

