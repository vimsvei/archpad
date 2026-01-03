"use client"

import React, { useCallback } from "react"
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  useStore,
} from "@xyflow/react"
import { getEdgeParams } from "@/lib/utils"

export function FloatingEdge({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  markerEnd,
  style,
}: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source]),
  )
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
  )

  if (!sourceNode || !targetNode) {
    return null
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
    sourceHandle,
    targetHandle,
  )

  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  })

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
}
