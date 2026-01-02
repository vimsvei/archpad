"use client"

import * as React from "react"
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useGetApplicationComponentFullQuery } from "@/store/apis/application-component-api"
import { ApplicationComponentNode, type ApplicationComponentNodeData } from "@/components/schema-elements/application-component-node"
import { FloatingEdge } from "@/components/schema-elements/floating-edge"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useMemo } from "react"
import type { Node as ReactFlowNode } from "@xyflow/react"

const nodeTypes = {
  "application-component": ApplicationComponentNode,
}

const edgeTypes = {
  floating: FloatingEdge,
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

  // Создаем узлы и связи на основе данных компонента
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!componentData) {
      return { initialNodes: [], initialEdges: [] }
    }

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

    // Отладочный вывод
    console.log("=== Application Schema Debug ===")
    console.log("Main component:", componentData.id, componentData.name)
    console.log("Incoming flows:", componentData.incomingFlows.length)
    componentData.incomingFlows.forEach((flow) => {
      console.log("  Incoming:", {
        flowId: flow.id,
        flowName: flow.name,
        source: flow.sourceComponent?.id,
        sourceName: flow.sourceComponent?.name,
        target: flow.targetComponent?.id,
        targetName: flow.targetComponent?.name,
      })
    })
    console.log("Outgoing flows:", componentData.outgoingFlows.length)
    componentData.outgoingFlows.forEach((flow) => {
      console.log("  Outgoing:", {
        flowId: flow.id,
        flowName: flow.name,
        source: flow.sourceComponent?.id,
        sourceName: flow.sourceComponent?.name,
        target: flow.targetComponent?.id,
        targetName: flow.targetComponent?.name,
      })
    })
    console.log("Incoming components:", Array.from(incomingComponents.values()).map(c => c.name))
    console.log("Outgoing components:", Array.from(outgoingComponents.values()).map(c => c.name))
    console.log("================================")

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

    // Создаем связи (edges)
    // incomingFlows: потоки, которые входят в текущий компонент (sourceComponent -> targetComponent, где targetComponent = текущий)
    componentData.incomingFlows.forEach((flow) => {
      if (flow.sourceComponent && flow.targetComponent) {
        edges.push({
          id: `edge-${flow.id}-incoming`,
          source: flow.sourceComponent.id,
          target: flow.targetComponent.id,
          type: "floating",
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: { strokeDasharray: "5,5", strokeWidth: 2, stroke: "#000000" },
        })
      }
    })

    // outgoingFlows: потоки, которые выходят из текущего компонента (sourceComponent -> targetComponent, где sourceComponent = текущий)
    componentData.outgoingFlows.forEach((flow) => {
      if (flow.sourceComponent && flow.targetComponent) {
        edges.push({
          id: `edge-${flow.id}-outgoing`,
          source: flow.sourceComponent.id,
          target: flow.targetComponent.id,
          type: "floating",
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: { strokeDasharray: "5,5", strokeWidth: 2, stroke: "#000000" },
        })
      }
    })

    return { initialNodes: nodes, initialEdges: edges }
  }, [componentData])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

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
    <Card className="flex min-h-0 flex-1 flex-col p-0 overflow-hidden">
      <div className="flex-1 w-full" style={{ minHeight: 0 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </Card>
  )
}

