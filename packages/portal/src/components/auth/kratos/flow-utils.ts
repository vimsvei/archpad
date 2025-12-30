import { asArray, asObject, asString } from "./types"

export function getFlowId(flow: unknown): string | undefined {
  const o = asObject(flow)
  const id = o ? asString(o.id) : null
  return id ?? undefined
}

export function getUi(flow: unknown): Record<string, unknown> | undefined {
  const o = asObject(flow)
  const ui = o ? asObject(o.ui) : null
  return ui ?? undefined
}

export function getUiNodes(flow: unknown): Record<string, unknown>[] {
  const ui = getUi(flow)
  const nodes = ui ? asArray(ui.nodes) : null
  if (!nodes) return []
  return nodes.map(asObject).filter((n): n is Record<string, unknown> => Boolean(n))
}

function getNodeAttributes(node: Record<string, unknown>): Record<string, unknown> | null {
  return asObject(node.attributes)
}

export function getInputFieldNamesByType(flow: unknown, type: string): string[] {
  const out: string[] = []
  for (const n of getUiNodes(flow)) {
    const attrs = getNodeAttributes(n)
    const name = attrs ? asString(attrs.name) : null
    const t = attrs ? asString(attrs.type) : null
    if (!name) continue
    if (name === "csrf_token" || name === "method") continue
    if (t && t.toLowerCase() === type.toLowerCase()) out.push(name)
  }
  return out
}

export function findNodeByName(flow: unknown, name: string): Record<string, unknown> | undefined {
  return getUiNodes(flow).find((n) => asString(getNodeAttributes(n)?.name) === name)
}

export function hasNode(flow: unknown, name: string): boolean {
  return Boolean(findNodeByName(flow, name))
}

export function getNodeValue(flow: unknown, name: string): string | undefined {
  const n = findNodeByName(flow, name)
  const attrs = n ? getNodeAttributes(n) : null
  const v = attrs ? attrs.value : undefined
  const s = asString(v)
  return s ?? (v == null ? undefined : String(v))
}

export function getCsrfToken(flow: unknown): string | undefined {
  return getNodeValue(flow, "csrf_token")
}

export function getFlowMessages(flow: unknown): string[] {
  const ui = getUi(flow)
  const msgs = ui ? asArray(ui.messages) : null
  if (!msgs) return []
  return msgs
    .map(asObject)
    .map((m) => (m ? asString(m.text) : null))
    .filter((t): t is string => typeof t === "string" && t.length > 0)
}

export function getNodeMessages(flow: unknown, name: string): string[] {
  const n = findNodeByName(flow, name)
  const msgs = n ? asArray(n.messages) : null
  if (!msgs) return []
  return msgs
    .map(asObject)
    .map((m) => (m ? asString(m.text) : null))
    .filter((t): t is string => typeof t === "string" && t.length > 0)
}

export function hasMethod(flow: unknown, methodValue: string): boolean {
  // In Kratos browser flows the method is typically represented by submit buttons
  // with attributes { name: "method", value: "<method>" }.
  return getUiNodes(flow).some(
    (n) => asString(getNodeAttributes(n)?.name) === "method" && asString(getNodeAttributes(n)?.value) === methodValue
  )
}

export function pickMethod(flow: unknown, preferred: string[], fallback: string): string {
  for (const m of preferred) {
    if (hasMethod(flow, m)) return m
  }
  return fallback
}

export function getAvailableMethods(flow: unknown): string[] {
  const values = new Set<string>()
  for (const n of getUiNodes(flow)) {
    const attrs = getNodeAttributes(n)
    const name = attrs ? asString(attrs.name) : null
    const val = attrs ? asString(attrs.value) : null
    if (name === "method" && typeof val === "string" && val.length > 0) {
      values.add(val)
    }
  }
  return Array.from(values)
}

export function getFlowMeta(flow: unknown): {
  id: string | null
  action: string | null
  httpMethod: string | null
  availableMethods: string[]
} {
  const id = getFlowId(flow) ?? null
  const ui = getUi(flow)
  const action = ui ? asString(ui.action) : null
  const httpMethod = ui ? asString(ui.method) : null
  const availableMethods = getAvailableMethods(flow)
  return { id, action, httpMethod, availableMethods }
}

export function guessEmailFieldName(flow: unknown): string {
  // Keep UI decoupled: we still want to submit using the exact field name
  // Kratos expects for this flow step.
  const candidates = ["email", "identifier", "traits.email"]
  for (const c of candidates) {
    if (hasNode(flow, c)) return c
  }
  return "email"
}


