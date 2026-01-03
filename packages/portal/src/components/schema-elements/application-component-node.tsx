"use client"

import * as React from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { useTheme } from "next-themes"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "./base-node"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import { cn } from "@/lib/utils"
import { getLayerBackgroundColor } from "./schema-colors"

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

export function ApplicationComponentNode(props: NodeProps) {
  const data = props.data as ApplicationComponentNodeData
  const { name, isMain = false, interfaces = [], functions = [], events = [], dataObjects = [], systemSoftware = [], products = [] } = data
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark" || theme === "dark"

  // Объединяем все объекты контента в правильном порядке
  const contentItems = React.useMemo(() => {
    const items: Array<{ id: string; name: string; type: "application-interface" | "application-function" | "application-event" | "application-data-object" }> = []
    
    interfaces.forEach((item: { id: string; name: string }) => items.push({ ...item, type: "application-interface" }))
    functions.forEach((item: { id: string; name: string }) => items.push({ ...item, type: "application-function" }))
    events.forEach((item: { id: string; name: string }) => items.push({ ...item, type: "application-event" }))
    dataObjects.forEach((item: { id: string; name: string }) => items.push({ ...item, type: "application-data-object" }))
    
    return items
  }, [interfaces, functions, events, dataObjects])

  // Показываем контент только для основного компонента
  const showContent = isMain

  // Цвет фона для Application layer
  const backgroundColor = getLayerBackgroundColor("application", isDark)

  return (
    <BaseNode 
      className={cn("w-fit", !isMain && "min-w-[250px]")}
      style={{ backgroundColor: backgroundColor, background: backgroundColor }}
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

      {showContent && contentItems.length > 0 && (
        <BaseNodeContent className="p-0 gap-0 py-[10px]">
          <div className="flex flex-col">
            {contentItems.map((item, index) => {
              const prevItem = index > 0 ? contentItems[index - 1] : null
              const isDifferentCategory = prevItem && prevItem.type !== item.type
              const spacing = isDifferentCategory ? "pt-5" : index > 0 ? "pt-[5px]" : ""
              
              return (
                <div key={item.id} className={cn("px-3", spacing)}>
                  <div className="min-h-[30px] py-1.5 px-2 flex items-start border border-black rounded w-[300px]">
                    <ItemRow
                      icon={<ArchimateObjectIcon type={item.type} size={24} />}
                    >
                      {item.name}
                    </ItemRow>
                  </div>
                </div>
              )
            })}
          </div>
        </BaseNodeContent>
      )}

      {/* Technologies: системное ПО и продукты в футере */}
      {(systemSoftware.length > 0 || (isMain && products.length > 0)) && (
        <div className="border-t border-black py-[10px]">
          <div className="flex flex-col">
            <div className="text-xs font-semibold text-black uppercase px-3 pt-2 pb-1">
              Technologies
            </div>
            <div className="flex flex-col">
              {(isMain ? [...products, ...systemSoftware] : systemSoftware).map((item: { id: string; name: string }, index: number) => {
                const isProduct = isMain && products.some((p: { id: string; name: string }) => p.id === item.id)
                
                return (
                  <div key={item.id} className={cn("px-3", index > 0 && "pt-[10px]")}>
                    <div className="min-h-[30px] py-1.5 px-2 flex items-start border border-black rounded w-[300px]">
                      <ItemRow
                        icon={
                          isProduct ? (
                            <div className="w-6 h-6 bg-muted rounded border flex items-center justify-center" />
                          ) : (
                            <ArchimateObjectIcon type="system-software" size={24} />
                          )
                        }
                      >
                        {item.name}
                      </ItemRow>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </BaseNode>
  )
}
