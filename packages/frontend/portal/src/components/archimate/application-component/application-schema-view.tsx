"use client"

import * as React from "react"
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useGetApplicationComponentFullQuery } from "@/store/apis/application-component-api"
import { ApplicationComponentNode, type ApplicationComponentNodeData } from "@/components/schema-elements/application-component-node"
import { useElkLayout } from "@/hooks/schema/use-elk-layout"
import { useSchemaExport } from "@/hooks/schema/use-schema-export"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useMemo } from "react"
import type { Node as ReactFlowNode } from "@xyflow/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileImage, FileText } from "lucide-react"

const nodeTypes = {
  "application-component": ApplicationComponentNode,
}

type ApplicationSchemaViewProps = {
  componentId: string
  componentName?: string
}

export function ApplicationSchemaView({
  componentId,
  componentName,
}: ApplicationSchemaViewProps) {
  const { data: componentData, isLoading, error } = useGetApplicationComponentFullQuery({ id: componentId })
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark" || theme === "dark"

  // Создаем узлы и связи на основе данных компонента
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!componentData) {
      return { initialNodes: [], initialEdges: [] }
    }

    // Цвет для нейтральных связей (потоков), видимый в обеих темах
    // Используем серый цвет средней яркости, который хорошо виден на светлом и темном фоне
    const edgeStrokeColor = isDark ? "#94a3b8" : "#475569" // slate-400 для темной темы, slate-600 для светлой

    const nodes: ReactFlowNode<ApplicationComponentNodeData>[] = []
    const edges: Edge[] = []

    // Основной компонент в центре
    const mainNode: ReactFlowNode<ApplicationComponentNodeData> = {
      id: componentData.id,
      type: "application-component",
      position: { x: 400, y: 300 },
      data: {
        id: componentData.id,
        name: componentData.name,
        isMain: true,
        interfaces: componentData.interfaces,
        functions: componentData.functions,
        events: componentData.events,
        dataObjects: componentData.dataObjects,
        systemSoftware: componentData.systemSoftware,
        products: [], // TODO: добавить когда будет в GraphQL
      },
    }
    nodes.push(mainNode)

    // Собираем компоненты из входящих flows (слева)
    const incomingComponents = new Map<string, { id: string; name: string; systemSoftware: Array<{ id: string; name: string }> }>()
    
    componentData.incomingFlows.forEach((flow) => {
      if (flow.sourceComponent) {
        const compId = flow.sourceComponent.id
        const compName = flow.sourceComponent.name
        
        if (!incomingComponents.has(compId)) {
          incomingComponents.set(compId, {
            id: compId,
            name: compName,
            systemSoftware: [], // TODO: загрузить системное ПО для связанных компонентов
          })
        }
      }
    })

    // Собираем компоненты из исходящих flows (справа)
    const outgoingComponents = new Map<string, { id: string; name: string; systemSoftware: Array<{ id: string; name: string }> }>()
    
    componentData.outgoingFlows.forEach((flow) => {
      if (flow.targetComponent) {
        const compId = flow.targetComponent.id
        const compName = flow.targetComponent.name
        
        if (!outgoingComponents.has(compId)) {
          outgoingComponents.set(compId, {
            id: compId,
            name: compName,
            systemSoftware: [], // TODO: загрузить системное ПО для связанных компонентов
          })
        }
      }
    })

    // Компоненты слева (из входящих flows)
    const incomingComponentsArray = Array.from(incomingComponents.values())
    incomingComponentsArray.forEach((comp, index) => {
      const node: ReactFlowNode<ApplicationComponentNodeData> = {
        id: comp.id,
        type: "application-component",
        position: { x: 100, y: 100 + index * 150 },
        data: {
          id: comp.id,
          name: comp.name,
          isMain: false,
          systemSoftware: comp.systemSoftware,
        },
      }
      nodes.push(node)
    })

    // Компоненты справа (из исходящих flows)
    const outgoingComponentsArray = Array.from(outgoingComponents.values())
    outgoingComponentsArray.forEach((comp, index) => {
      const node: ReactFlowNode<ApplicationComponentNodeData> = {
        id: comp.id,
        type: "application-component",
        position: { x: 700, y: 100 + index * 150 },
        data: {
          id: comp.id,
          name: comp.name,
          isMain: false,
          systemSoftware: comp.systemSoftware,
        },
      }
      nodes.push(node)
    })

    // Создаем связи (edges) после создания всех узлов
    // Создаем Set для быстрой проверки существования узлов
    const nodeIds = new Set(nodes.map((node) => node.id))

    // incomingFlows: потоки, которые входят в текущий компонент (sourceComponent -> targetComponent, где targetComponent = текущий)
    componentData.incomingFlows.forEach((flow) => {
      if (flow.sourceComponent && flow.targetComponent) {
        const sourceId = flow.sourceComponent.id
        const targetId = flow.targetComponent.id
        
        // Проверяем, что оба узла существуют
        if (nodeIds.has(sourceId) && nodeIds.has(targetId)) {
        edges.push({
          id: `edge-${flow.id}-incoming`,
            source: sourceId,
            target: targetId,
            type: "smoothstep",
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
              color: edgeStrokeColor,
          },
            style: { 
              strokeDasharray: "5,5", 
              strokeWidth: 2, 
              stroke: edgeStrokeColor,
              zIndex: 1,
            },
        })
        }
      }
    })

    // outgoingFlows: потоки, которые выходят из текущего компонента (sourceComponent -> targetComponent, где sourceComponent = текущий)
    componentData.outgoingFlows.forEach((flow) => {
      if (flow.sourceComponent && flow.targetComponent) {
        const sourceId = flow.sourceComponent.id
        const targetId = flow.targetComponent.id
        
        // Проверяем, что оба узла существуют
        if (nodeIds.has(sourceId) && nodeIds.has(targetId)) {
        edges.push({
          id: `edge-${flow.id}-outgoing`,
            source: sourceId,
            target: targetId,
            type: "smoothstep",
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
              color: edgeStrokeColor,
          },
            style: { 
              strokeDasharray: "5,5", 
              strokeWidth: 2, 
              stroke: edgeStrokeColor,
              zIndex: 1,
            },
        })
        }
      }
    })

    return { initialNodes: nodes, initialEdges: edges }
  }, [componentData, isDark])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { runLayout, isLayingOut } = useElkLayout(nodes, edges, setNodes, {
    direction: "RIGHT",
    spacing: 90,
    padding: 50,
  })

  // ReactFlow instance для экспорта
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance<ReactFlowNode<ApplicationComponentNodeData>, Edge> | null>(null)
  const { exportToPNG, exportToPDF } = useSchemaExport(
    reactFlowInstance as ReactFlowInstance | null,
    componentName || componentData?.name
  )

  const onInit = React.useCallback((instance: ReactFlowInstance<ReactFlowNode<ApplicationComponentNodeData>, Edge>) => {
    setReactFlowInstance(instance as ReactFlowInstance<ReactFlowNode<ApplicationComponentNodeData>, Edge> | null)
  }, [])

  // Обновляем узлы и связи при изменении данных
  React.useEffect(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  if (isLoading) {
    return (
      <Card className="flex min-h-0 flex-1 flex-col p-6">
        <div className="flex items-center justify-center gap-2 flex-1">
          <Spinner className="h-6 w-6" />
          <span className="text-muted-foreground">Loading schema...</span>
        </div>
      </Card>
    )
  }

  if (error || !componentData) {
    return (
      <Card className="flex min-h-0 flex-1 flex-col p-6">
        <div className="text-destructive">Error loading component data</div>
      </Card>
    )
  }


  return (
    <Card className="flex min-h-[600px] flex-1 flex-col p-0 overflow-hidden">
      <div className="flex items-center justify-end gap-2 px-3 py-2 border-b border-border">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void runLayout({ force: true })}
          disabled={isLayingOut || nodes.length === 0}
        >
          {isLayingOut ? "Laying out..." : "Auto layout"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              disabled={nodes.length === 0}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => void exportToPNG()}>
              <FileImage className="mr-2 h-4 w-4" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => void exportToPDF()}>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full min-w-0" style={{ height: 556 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </Card>
  )
}
