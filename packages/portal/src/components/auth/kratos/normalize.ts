export function normalizeAnchorHref(rawHref: string): string {
  // Prevent hydration mismatches by rendering relative URLs,
  // even if Kratos returns absolute URLs with different origins.
  if (!rawHref) return rawHref
  try {
    if (rawHref.startsWith("http://") || rawHref.startsWith("https://")) {
      const u = new URL(rawHref)
      return `${u.pathname}${u.search}${u.hash}`
    }
  } catch {
    // keep as-is
  }
  return rawHref
}

export function normalizeFormAction(rawAction: string | undefined): string | undefined {
  if (!rawAction) return rawAction
  return normalizeAnchorHref(rawAction)
}


