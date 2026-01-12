"use client"

import React, { useCallback } from "react"
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  useStore,
} from "@xyflow/react"
import { getEdgeParams } from "@/lib/utils"

export function FloatingEdge(props: EdgeProps) {
  const { id, source, target, markerEnd, style } = props
  // sourceHandle and targetHandle may not be in EdgeProps type, but they exist on the edge object
  const sourceHandle = (props as any).sourceHandle
  const targetHandle = (props as any).targetHandle
  
  const sourceNode = useStore(
    useCallback((store) => store.nodeLookup.get(source), [source]),
  )
  const targetNode = useStore(
    useCallback((store) => store.nodeLookup.get(target), [target]),
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
