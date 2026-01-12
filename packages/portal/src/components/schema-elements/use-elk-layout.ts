"use client"

import * as React from "react"
import type { Edge, Node } from "@xyflow/react"
import type { Dispatch, SetStateAction } from "react"

type ElkModule = {
  default: new (opts?: any) => {
    layout: (graph: any, opts?: any) => Promise<any>
  }
}

async function loadElk(): Promise<any> {
  // IMPORTANT for Next.js/Turbopack:
  // Do NOT import `elkjs` root or `elk-api` here, because those may pull Node-oriented code
  // that tries to `require('web-worker')`, causing a build error.
  // The bundled build is browser-friendly and avoids that dependency.
  const candidates = ["elkjs/lib/elk.bundled", "elkjs/lib/elk.bundled.js"]

  let lastErr: unknown = null
  for (const spec of candidates) {
    try {
      // Keep as a dynamic string import so Next can code-split it to client runtime.
      const mod: any = await import(spec as any)
      return mod?.default ?? mod
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Failed to load elkjs")
}

export type ElkLayoutOptions = {
  /**
   * Direction of layout.
   * - RIGHT: left -> right
   * - DOWN: top -> bottom
   */
  direction?: "RIGHT" | "DOWN"
  /** Horizontal/vertical spacing between nodes */
  spacing?: number
  /** Padding around the whole graph */
  padding?: number
}

function getNodeSize(node: any): { width: number; height: number } {
  const w = node?.measured?.width ?? node?.width ?? 0
  const h = node?.measured?.height ?? node?.height ?? 0

  // Fallback sizes to avoid 0x0 graphs (ELK can still work, but results degrade).
  return {
    width: Math.max(80, Number(w) || 0),
    height: Math.max(40, Number(h) || 0),
  }
}

/**
 * ELK-based auto layout for React Flow.
 * - Runs on client only (dynamic import)
 * - Uses measured node sizes when available
 */
export function useElkLayout<T extends Node = Node>(
  nodes: T[],
  edges: Edge[],
  setNodes: Dispatch<SetStateAction<T[]>>,
  options?: ElkLayoutOptions,
) {
  const [isLayingOut, setIsLayingOut] = React.useState(false)
  const elkRef = React.useRef<any>(null)
  const lastSignatureRef = React.useRef<string>("")

  const direction = options?.direction ?? "RIGHT"
  const spacing = options?.spacing ?? 80
  const padding = options?.padding ?? 40

  const runLayout = React.useCallback(async (opts?: { force?: boolean }) => {
    if (!nodes.length) return

    // Avoid layout loops: only rerun when the topology changes.
    const signature = JSON.stringify({
      n: nodes.map((n) => n.id).sort(),
      e: edges.map((e) => `${e.source}->${e.target}`).sort(),
      d: direction,
    })
    if (!opts?.force && signature === lastSignatureRef.current) return

    setIsLayingOut(true)
    try {
      if (!elkRef.current) {
        const ElkCtor: any = await loadElk()
        elkRef.current = new ElkCtor()
      }

      const elk = elkRef.current

      const elkGraph = {
        id: "root",
        layoutOptions: {
          "elk.algorithm": "layered",
          "elk.direction": direction,
          "elk.spacing.nodeNode": String(spacing),
          "elk.layered.spacing.nodeNodeBetweenLayers": String(spacing),
          "elk.padding": `[top=${padding},left=${padding},bottom=${padding},right=${padding}]`,
        },
        children: nodes.map((n) => {
          const { width, height } = getNodeSize(n)
          return { id: n.id, width, height }
        }),
        edges: edges.map((e) => ({
          id: e.id,
          sources: [e.source],
          targets: [e.target],
        })),
      }

      const laidOut = await elk.layout(elkGraph)
      const positions = new Map<string, { x: number; y: number }>()
      for (const ch of laidOut?.children ?? []) {
        if (typeof ch?.x === "number" && typeof ch?.y === "number") {
          positions.set(ch.id, { x: ch.x, y: ch.y })
        }
      }

      setNodes((prev) =>
        prev.map((n) => {
          const p = positions.get(n.id)
          return p ? { ...n, position: { x: p.x, y: p.y } } : n
        }),
      )

      lastSignatureRef.current = signature
    } finally {
      setIsLayingOut(false)
    }
  }, [nodes, edges, setNodes, direction, spacing, padding])

  // Auto-run once when sizes are likely available.
  React.useEffect(() => {
    if (!nodes.length) return
    // Wait a tick so React Flow can measure nodes.
    const t = window.setTimeout(() => {
      void runLayout()
    }, 0)
    return () => window.clearTimeout(t)
  }, [nodes.length, edges.length, runLayout])

  return { runLayout, isLayingOut }
}


