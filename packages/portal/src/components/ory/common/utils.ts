export function normalizeAnchorHref(rawHref: string): string {
  // Prevent hydration mismatches by rendering relative URLs,
  // even if Ory returns absolute URLs with different origins.
  if (!rawHref) return rawHref
  try {
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
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

export function getNodeLabel(node: any): string | undefined {
  const candidate =
    node?.meta?.label?.text ??
    node?.meta?.label?.context?.title ??
    node?.meta?.label?.context?.label

  return typeof candidate === 'string' ? candidate : undefined
}

export function getFallbackLabel(
  attributes: any,
  t: (key: string, defaultValue?: string) => string
): string | undefined {
  const name = attributes?.name as string | undefined
  if (!name) return undefined

  // Never show labels for internal control fields.
  if (name === 'method' || name === 'csrf_token') return undefined

  if (name.includes('traits.email')) return t('auth.field.email', 'Email')
  if (name.includes('traits.username')) return t('auth.field.username', 'Username')
  if (name.toLowerCase().includes('password')) return t('auth.field.password', 'Password')

  // Generic fallback: last segment, prettified
  const raw = name.split('.').pop() ?? name
  const pretty = raw.replace(/_/g, ' ')
  return pretty ? pretty.charAt(0).toUpperCase() + pretty.slice(1) : undefined
}

