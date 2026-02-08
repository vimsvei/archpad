"use client"

import * as React from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { useTheme } from "next-themes"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "./base-node"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import { cn } from "@/lib/utils"
import { getLayerBackgroundColor } from "./schema-colors"
import { ArtifactIcon } from "./artifact-icon"
import { SCHEMA_STYLE } from "./schema-style"
import {
  CONTENT_BLOCK_WIDTH,
  TECHNOLOGY_BLOCK_MIN_WIDTH,
  RELATED_COMPONENT_MIN_WIDTH,
  DATA_OBJECT_BLOCK_MIN_WIDTH,
} from "./schema-sizes"

export type ApplicationComponentNodeData = {
  id: string
  name: string
  isMain?: boolean
  interfaces?: Array<{ id: string; name: string }>
  functions?: Array<{ id: string; name: string }>
  events?: Array<{ id: string; name: string }>
  dataObjects?: Array<{ id: string; name: string }>
  systemSoftware?: Array<{ id: string; name: string }>
  products?: Array<{ id: string; name: string }>
}

function ItemRow({ 
  icon, 
  children 
}: { 
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2 w-full">
      <span className="text-xs leading-tight flex-1 line-clamp-2">{children}</span>
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}

function NodeItem({
  className,
  widthPx,
  style,
  icon,
  children,
  handles,
}: {
  className?: string
  widthPx?: number
  style?: React.CSSProperties
  icon: React.ReactNode
  children: React.ReactNode
  handles?: {
    targetId: string
    sourceId: string
  }
}) {
  return (
    <div
      className={cn("group relative py-1.5 px-2 flex items-start border border-black", className)}
      style={{ ...(widthPx ? { width: `${widthPx}px` } : undefined), ...style }}
    >
      {handles && (
        <>
          <Handle
            type="target"
            id={handles.targetId}
            position={Position.Left}
            className="!bg-transparent !border !border-black !rounded-full transition-opacity"
            style={{
              width: SCHEMA_STYLE.nestedHandle.sizePx,
              height: SCHEMA_STYLE.nestedHandle.sizePx,
              left: -SCHEMA_STYLE.nestedHandle.offsetPx,
              opacity: SCHEMA_STYLE.nestedHandle.opacity.idle,
            }}
          />
          <Handle
            type="source"
            id={handles.sourceId}
            position={Position.Right}
            className="!bg-transparent !border !border-black !rounded-full transition-opacity"
            style={{
              width: SCHEMA_STYLE.nestedHandle.sizePx,
              height: SCHEMA_STYLE.nestedHandle.sizePx,
              right: -SCHEMA_STYLE.nestedHandle.offsetPx,
              opacity: SCHEMA_STYLE.nestedHandle.opacity.idle,
            }}
          />
          {/* Hover: make handles more visible */}
          <style jsx>{`
            .group:hover :global(.react-flow__handle) {
              opacity: ${SCHEMA_STYLE.nestedHandle.opacity.hover};
            }
          `}</style>
        </>
      )}
      <ItemRow icon={icon}>{children}</ItemRow>
    </div>
  )
}

export function ApplicationComponentNode(props: NodeProps) {
  const data = props.data as ApplicationComponentNodeData
  const { name, isMain = false, interfaces = [], functions = [], events = [], dataObjects = [], systemSoftware = [], products = [] } = data
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark" || theme === "dark"

  // Показываем контент только для основного компонента
  const showContent = isMain
  const hasContent = interfaces.length + functions.length + events.length + dataObjects.length > 0

  // Цвет фона для Application layer
  const backgroundColor = getLayerBackgroundColor("application", isDark)
  // Цвет фона для Technology layer (для технологических блоков)
  const technologyBackgroundColor = getLayerBackgroundColor("technology", isDark)

  return (
    <BaseNode 
      className="w-fit"
      style={{ 
        backgroundColor: backgroundColor, 
        background: backgroundColor,
        ...(!isMain && { minWidth: `${RELATED_COMPONENT_MIN_WIDTH}px` }),
      }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <BaseNodeHeader className="px-3 py-1.5 min-h-[30px]">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <BaseNodeHeaderTitle className="truncate text-xs font-semibold flex-1">{name}</BaseNodeHeaderTitle>
          <div className="shrink-0 w-6 h-6 flex items-center justify-center">
            <ArchimateObjectIcon type="application-component" className="shrink-0" size={24} />
          </div>
        </div>
      </BaseNodeHeader>

      {showContent && hasContent && (
        <BaseNodeContent className="p-0 gap-0 py-[10px]">
          <div className="flex flex-col">
            {/* Interfaces */}
            {interfaces.length > 0 && (
              <div className="px-3">
                {interfaces.map((it, idx) => (
                  <div key={it.id} className={cn(idx > 0 && "pt-[5px]")}>
                    <NodeItem
                      widthPx={CONTENT_BLOCK_WIDTH}
                      className="rounded-none"
                      style={{ minHeight: SCHEMA_STYLE.itemMinHeightPx, borderRadius: SCHEMA_STYLE.radius.rectPx }}
                      handles={{
                        targetId: `target-application-interface-${it.id}`,
                        sourceId: `source-application-interface-${it.id}`,
                      }}
                      icon={<ArchimateObjectIcon type="application-interface" size={24} />}
                    >
                      {it.name}
                    </NodeItem>
                  </div>
                ))}
              </div>
            )}

            {/* Functions */}
            {functions.length > 0 && (
              <div className={cn("px-3", interfaces.length > 0 && "pt-5")}>
                {functions.map((it, idx) => (
                  <div key={it.id} className={cn(idx > 0 && "pt-[5px]")}>
                    <NodeItem
                      widthPx={CONTENT_BLOCK_WIDTH}
                      className="rounded-none"
                      style={{ minHeight: SCHEMA_STYLE.itemMinHeightPx, borderRadius: SCHEMA_STYLE.radius.pillPx }}
                      handles={{
                        targetId: `target-application-function-${it.id}`,
                        sourceId: `source-application-function-${it.id}`,
                      }}
                      icon={<ArchimateObjectIcon type="application-function" size={24} />}
                    >
                      {it.name}
                    </NodeItem>
                  </div>
                ))}
              </div>
            )}

            {/* Events */}
            {events.length > 0 && (
              <div className={cn("px-3", (interfaces.length > 0 || functions.length > 0) && "pt-5")}>
                {events.map((it, idx) => (
                  <div key={it.id} className={cn(idx > 0 && "pt-[5px]")}>
                    <NodeItem
                      widthPx={CONTENT_BLOCK_WIDTH}
                      className="rounded-none"
                      style={{ minHeight: SCHEMA_STYLE.itemMinHeightPx, borderRadius: SCHEMA_STYLE.radius.pillPx }}
                      handles={{
                        targetId: `target-application-event-${it.id}`,
                        sourceId: `source-application-event-${it.id}`,
                      }}
                      icon={<ArchimateObjectIcon type="application-event" size={24} />}
                    >
                      {it.name}
                    </NodeItem>
                  </div>
                ))}
              </div>
            )}

            {/* Data Objects: 2-up grid, last odd full-width */}
            {dataObjects.length > 0 && (
              <div className={cn("pt-5")}>
                <div className="px-3">
                  <div className="flex flex-row flex-wrap gap-[5px]" style={{ width: `${CONTENT_BLOCK_WIDTH}px` }}>
                    {dataObjects.map((it, idx) => {
                      const isOddCount = dataObjects.length % 2 !== 0
                      const isLastOdd = isOddCount && idx === dataObjects.length - 1
                      return (
                        <NodeItem
                          key={it.id}
                          className="rounded-none"
                          style={{
                            minHeight: SCHEMA_STYLE.itemMinHeightPx,
                            borderRadius: SCHEMA_STYLE.radius.rectPx,
                            ...(isLastOdd
                              ? { flex: "0 0 100%", width: "100%" }
                              : { flex: "1 1 0%", minWidth: `${DATA_OBJECT_BLOCK_MIN_WIDTH}px` }),
                          }}
                          icon={<ArchimateObjectIcon type="application-data-object" size={24} />}
                        >
                          {it.name}
                        </NodeItem>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </BaseNodeContent>
      )}

      {/* Technologies: системное ПО и продукты в футере */}
      {(systemSoftware.length > 0 || (isMain && products.length > 0)) && (() => {
        const artifactItems = isMain ? products : []
        const systemSoftwareItems = systemSoftware
        
        return (
          <div className="border-t border-black py-[10px]">
            <div className="px-3">
              {/* Artifacts (Products) */}
              {artifactItems.length > 0 && (
                <div className="pt-0">
                  <div className="flex flex-row flex-wrap gap-[5px]" style={{ width: `${CONTENT_BLOCK_WIDTH}px` }}>
                    {artifactItems.map((it, idx) => {
                      const isOddCount = artifactItems.length % 2 !== 0
                      const isLastOdd = isOddCount && idx === artifactItems.length - 1
                      return (
                        <NodeItem
                          key={it.id}
                          className="rounded-none"
                          style={{
                            backgroundColor: technologyBackgroundColor,
                            background: technologyBackgroundColor,
                            minHeight: SCHEMA_STYLE.itemMinHeightPx,
                            borderRadius: SCHEMA_STYLE.radius.rectPx,
                            ...(isLastOdd
                              ? { flex: "0 0 100%", width: "100%" }
                              : { flex: "1 1 0%", minWidth: `${TECHNOLOGY_BLOCK_MIN_WIDTH}px` }),
                          }}
                          icon={<ArtifactIcon size={24} className="text-black" />}
                        >
                          {it.name}
                        </NodeItem>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* System Software */}
              {systemSoftwareItems.length > 0 && (
                <div className={cn(artifactItems.length > 0 && "pt-5")}>
                  <div className="flex flex-row flex-wrap gap-[5px]" style={{ width: `${CONTENT_BLOCK_WIDTH}px` }}>
                    {systemSoftwareItems.map((it, idx) => {
                      const isOddCount = systemSoftwareItems.length % 2 !== 0
                      const isLastOdd = isOddCount && idx === systemSoftwareItems.length - 1
                      return (
                        <NodeItem
                          key={it.id}
                          className="rounded-none"
                          style={{
                            backgroundColor: technologyBackgroundColor,
                            background: technologyBackgroundColor,
                            minHeight: SCHEMA_STYLE.itemMinHeightPx,
                            borderRadius: SCHEMA_STYLE.radius.rectPx,
                            ...(isLastOdd
                              ? { flex: "0 0 100%", width: "100%" }
                              : { flex: "1 1 0%", minWidth: `${TECHNOLOGY_BLOCK_MIN_WIDTH}px` }),
                          }}
                          icon={<ArchimateObjectIcon type="system-software" size={24} />}
                        >
                          {it.name}
                        </NodeItem>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })()}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </BaseNode>
  )
}
