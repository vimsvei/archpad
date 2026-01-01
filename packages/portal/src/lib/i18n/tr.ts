export type Tr = (key: string, fallback?: string) => string

/**
 * Creates a `tr()` helper from Tolgee `t()`.
 *
 * - `tr(key)` -> returns translation (or key if missing)
 * - `tr(key, fallback)` -> returns translation (or fallback if missing)
 */
export function createTr(t: (key: string, defaultValue?: string) => string): Tr {
  return (key: string, fallback?: string) => t(key, fallback)
}


