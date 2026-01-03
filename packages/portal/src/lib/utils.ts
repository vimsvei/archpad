import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Position, type Node } from "@xyflow/react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type HandleBounds = {
  id?: string
  x: number
  y: number
  width: number
  height: number
}

function getNodeAbsolutePosition(node: any): { x: number; y: number } {
  // In React Flow store internals, nodes usually have `internals.positionAbsolute`.
  // Fallbacks cover other shapes.
  return (
    node?.internals?.positionAbsolute ??
    node?.positionAbsolute ??
    node?.position ??
    { x: 0, y: 0 }
  )
}

function getHandleCenterPoint(node: any, handleId: string | null | undefined, handleType: "source" | "target") {
  if (!handleId) return null
  const bounds: HandleBounds[] | undefined = node?.internals?.handleBounds?.[handleType]
  if (!bounds?.length) return null
  const hb = bounds.find((b) => b.id === handleId)
  if (!hb) return null

  const abs = getNodeAbsolutePosition(node)
  return {
    x: abs.x + hb.x + hb.width / 2,
    y: abs.y + hb.y + hb.height / 2,
    position: hb.x <= 1 ? Position.Left : Position.Right,
  }
}

// Rectangle perimeter intersection method (used when handle ids are not provided).
function getPointOnPerimeter(node: any, angle: number) {
  const abs = getNodeAbsolutePosition(node)
  const width = node?.measured?.width ?? node?.width ?? 0
  const height = node?.measured?.height ?? node?.height ?? 0

  const halfWidth = width / 2
  const halfHeight = height / 2
  const tanAngle = Math.tan(angle)

  let x: number
  let y: number

  if (Math.abs(tanAngle) <= halfHeight / halfWidth) {
    // Intersects vertical sides
    x = angle > -Math.PI / 2 && angle < Math.PI / 2 ? halfWidth : -halfWidth
    y = halfWidth * tanAngle
  } else {
    // Intersects horizontal sides
    y = angle > 0 ? halfHeight : -halfHeight
    x = halfHeight / tanAngle
  }

  return {
    x: abs.x + halfWidth + x,
    y: abs.y + halfHeight + y,
  }
}

/**
 * Returns edge endpoints that "float" to either specific handles (if provided)
 * or to the node perimeter.
 *
 * Based on React Flow floating edges idea, extended with handle support.
 */
export function getEdgeParams(
  source: Node | any,
  target: Node | any,
  sourceHandleId?: string | null,
  targetHandleId?: string | null,
) {
  const sourceHandle = getHandleCenterPoint(source, sourceHandleId ?? null, "source")
  const targetHandle = getHandleCenterPoint(target, targetHandleId ?? null, "target")

  if (sourceHandle && targetHandle) {
    return {
      sx: sourceHandle.x,
      sy: sourceHandle.y,
      tx: targetHandle.x,
      ty: targetHandle.y,
      sourcePos: sourceHandle.position,
      targetPos: targetHandle.position,
    }
  }

  const sourceAbs = getNodeAbsolutePosition(source)
  const targetAbs = getNodeAbsolutePosition(target)
  const sourceWidth = source?.measured?.width ?? source?.width ?? 0
  const sourceHeight = source?.measured?.height ?? source?.height ?? 0
  const targetWidth = target?.measured?.width ?? target?.width ?? 0
  const targetHeight = target?.measured?.height ?? target?.height ?? 0

  const sourceCenter = { x: sourceAbs.x + sourceWidth / 2, y: sourceAbs.y + sourceHeight / 2 }
  const targetCenter = { x: targetAbs.x + targetWidth / 2, y: targetAbs.y + targetHeight / 2 }

  const dx = targetCenter.x - sourceCenter.x
  const dy = targetCenter.y - sourceCenter.y
  const angle = Math.atan2(dy, dx)

  const sourcePoint = getPointOnPerimeter(source, angle)
  const targetPoint = getPointOnPerimeter(target, angle + Math.PI)

  return {
    sx: sourcePoint.x,
    sy: sourcePoint.y,
    tx: targetPoint.x,
    ty: targetPoint.y,
    sourcePos: dx >= 0 ? Position.Right : Position.Left,
    targetPos: dx >= 0 ? Position.Left : Position.Right,
  }
}
