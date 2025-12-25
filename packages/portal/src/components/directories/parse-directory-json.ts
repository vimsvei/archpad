import type { CreateDirectoryItemInput } from "@/services/directories.rest"

export type DirectoryImportLink = {
  parentIndex: number
  childIndex: number
}

export type DirectoryJSONParseResult = {
  inputs: CreateDirectoryItemInput[]
  links: DirectoryImportLink[]
}

type RawDirectoryJSON = {
  items?: unknown
}

type RawDirectoryItem = {
  name?: unknown
  code?: unknown
  description?: unknown
  color?: unknown
  byDefault?: unknown
  items?: unknown
  children?: unknown
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function asString(v: unknown): string | undefined {
  if (typeof v === "string") return v
  if (v === null || v === undefined) return undefined
  return String(v)
}

function asBoolean(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v
  if (typeof v === "number") return v !== 0
  if (typeof v === "string") {
    const s = v.trim().toLowerCase()
    if (s === "true" || s === "1" || s === "да" || s === "yes") return true
    if (s === "false" || s === "0" || s === "нет" || s === "no") return false
  }
  return undefined
}

/**
 * Парсит JSON файл для импорта справочника.
 *
 * Формат:
 * {
 *   "items": [
 *     { "name": "...", "items": [ { "name": "..." } ] }
 *   ]
 * }
 *
 * Особенности:
 * - Все элементы находятся в корневом массиве `items`
 * - Каждый элемент может иметь вложенный массив `items` (дерево)
 * - Каждый узел дерева становится отдельной записью справочника
 * - После создания записей нужно связать родителей с детьми через таблицу связей
 *
 * @throws Error если JSON невалиден или отсутствует/некорректен `items`,
 *               или если у элемента нет обязательного поля `name`.
 */
export function parseDirectoryJSON(jsonText: string): DirectoryJSONParseResult {
  let raw: unknown
  try {
    raw = JSON.parse(jsonText)
  } catch {
    throw new Error("Некорректный JSON")
  }

  if (!isObject(raw)) throw new Error("JSON должен быть объектом")

  const root = raw as RawDirectoryJSON
  if (!Array.isArray(root.items)) throw new Error("JSON должен содержать массив items")

  const inputs: CreateDirectoryItemInput[] = []
  const links: DirectoryImportLink[] = []

  const walk = (node: unknown, parentIndex: number | null) => {
    if (!isObject(node)) throw new Error("Элемент items должен быть объектом")
    const it = node as RawDirectoryItem

    const name = asString(it.name)?.trim()
    if (!name) throw new Error("Каждый элемент JSON должен содержать непустое поле name")

    const input: CreateDirectoryItemInput = { name }

    const code = asString(it.code)?.trim()
    if (code) input.code = code

    const description = asString(it.description)?.trim()
    if (description) input.description = description

    const color = asString(it.color)?.trim()
    if (color) input.color = color

    const byDefault = asBoolean(it.byDefault)
    if (byDefault !== undefined) input.byDefault = byDefault

    const myIndex = inputs.length
    inputs.push(input)

    if (parentIndex !== null) {
      links.push({ parentIndex, childIndex: myIndex })
    }

    const childrenRaw = it.items ?? it.children
    if (childrenRaw === undefined || childrenRaw === null) return
    if (!Array.isArray(childrenRaw)) throw new Error("Поле items/children у элемента должно быть массивом")
    for (const child of childrenRaw) {
      walk(child, myIndex)
    }
  }

  for (const item of root.items) {
    walk(item, null)
  }

  return { inputs, links }
}


