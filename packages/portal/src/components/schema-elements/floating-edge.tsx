"use client"

import React from "react"
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react"

export function FloatingEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
}
