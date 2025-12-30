import { getUiNodes } from "./flow-utils"
import { asObject, asString } from "./types"

export type AuthFlowKind = "login" | "registration" | "recovery" | "verification" | "settings"

export type CanonicalField =
  | "email"
  | "password"
  | "firstName"
  | "lastName"
  | "phone"
  | "acceptedTos"
  | "code"

function text(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v)
}

function nodeLabel(node: unknown): string {
  const n = asObject(node)
  const meta = n ? asObject(n.meta) : null
  const label = meta ? asObject(meta.label) : null
  const ctx = label ? asObject(label.context) : null
  const t =
    (label ? asString(label.text) : null) ??
    (ctx ? asString(ctx.title) : null) ??
    (ctx ? asString(ctx.label) : null) ??
    ""
  return text(t)
}

function scoreNodeForField(node: unknown, field: CanonicalField): number {
  const n = asObject(node)
  const attrs = n ? asObject(n.attributes) : null
  const name = text(attrs ? attrs.name : "").toLowerCase()
  const type = text(attrs ? attrs.type : "").toLowerCase()
  const label = nodeLabel(node).toLowerCase()

  // Skip internal control fields
  if (name === "csrf_token" || name === "method") return -1000

  let score = 0

  const add = (s: number) => {
    score += s
  }

  if (field === "email") {
    if (type === "email") add(50)
    if (name.includes("traits.email")) add(80)
    if (name.includes("email")) add(40)
    if (name.includes("identifier")) add(20)
    if (label.includes("email") || label.includes("e-mail") || label.includes("почт")) add(10)
  }

  if (field === "password") {
    if (type === "password") add(60)
    if (name.includes("password")) add(60)
    if (label.includes("password") || label.includes("парол")) add(10)
  }

  if (field === "firstName") {
    if (name.endsWith(".first")) add(80)
    if (name.includes("first")) add(40)
    if (name.includes("given_name")) add(30)
    if (label.includes("first") || label.includes("имя")) add(10)
  }

  if (field === "lastName") {
    if (name.endsWith(".last")) add(80)
    if (name.includes("last")) add(40)
    if (name.includes("family_name")) add(30)
    if (label.includes("last") || label.includes("фамил")) add(10)
  }

  if (field === "phone") {
    if (type === "tel") add(60)
    if (name.includes("phone")) add(60)
    if (label.includes("phone") || label.includes("тел")) add(10)
  }

  if (field === "acceptedTos") {
    if (type === "checkbox") add(60)
    if (name.includes("accepted_tos")) add(80)
    if (label.includes("terms") || label.includes("tos") || label.includes("услов")) add(10)
  }

  if (field === "code") {
    if (name === "code") add(100)
    if (name.includes("code")) add(40)
    if (label.includes("code") || label.includes("код")) add(10)
  }

  return score
}

function fallbackName(kind: AuthFlowKind, field: CanonicalField): string {
  if (kind === "login") {
    if (field === "email") return "identifier"
    if (field === "password") return "password"
  }
  if (kind === "registration") {
    if (field === "email") return "traits.email"
    if (field === "password") return "password"
    if (field === "firstName") return "traits.name.first"
    if (field === "lastName") return "traits.name.last"
    if (field === "phone") return "traits.phone"
    if (field === "acceptedTos") return "traits.accepted_tos"
  }
  if (kind === "settings") {
    // Settings "profile" method uses the same schema/traits keys as registration.
    if (field === "email") return "traits.email"
    if (field === "firstName") return "traits.name.first"
    if (field === "lastName") return "traits.name.last"
    if (field === "phone") return "traits.phone"
    if (field === "acceptedTos") return "traits.accepted_tos"
    if (field === "password") return "password"
  }
  if (kind === "recovery" || kind === "verification") {
    if (field === "email") return "email"
    if (field === "code") return "code"
  }
  // fallback: canonical key (last resort)
  return field
}

export function resolveFieldName(flow: unknown, kind: AuthFlowKind, field: CanonicalField): string {
  const nodes = getUiNodes(flow)

  let best: { node: unknown; score: number } | null = null
  for (const n of nodes) {
    const s = scoreNodeForField(n, field)
    if (!best || s > best.score) best = { node: n, score: s }
  }

  const bn = best ? asObject(best.node) : null
  const attrs = bn ? asObject(bn.attributes) : null
  const chosenName = text(attrs ? attrs.name : "")
  if (best && best.score >= 40 && chosenName) return chosenName

  return fallbackName(kind, field)
}


