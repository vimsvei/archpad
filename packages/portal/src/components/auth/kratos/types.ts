export type JsonObject = Record<string, unknown>

export function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null
}

export function asObject(value: unknown): JsonObject | null {
  return isObject(value) ? value : null
}

export function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

export function asArray(value: unknown): unknown[] | null {
  return Array.isArray(value) ? value : null
}


