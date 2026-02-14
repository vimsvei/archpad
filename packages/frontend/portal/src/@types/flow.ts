import type { Environment } from "@/services/flow.rest"

export type FlowLayer = "Application" | "Technology"
export type FlowType = "application" | "technology"

export type FlowRelatedItem = {
  id: string
  code: string
  name: string
  description: string | null
}

export type FlowSolutionItem = FlowRelatedItem & {
  label: string | null
}

export type FlowPortItem = FlowRelatedItem & {
  protocol: string | null
}

export type FlowListItem = {
  id: string
  code: string
  name: string
  description: string | null
  layer: FlowLayer
  flowType: FlowType
  environment: Environment | null
  source: FlowRelatedItem | null
  target: FlowRelatedItem | null
  createdAt: string | null
  createdBy: string | null
  updatedAt: string | null
  updatedBy: string | null
}

export type ApplicationFlowDetail = {
  id: string
  code: string
  name: string
  description: string | null
  layer: "Application"
  flowType: "application"
  environment: null
  source: {
    component: FlowRelatedItem | null
    function: FlowRelatedItem | null
  }
  target: {
    component: FlowRelatedItem | null
    function: FlowRelatedItem | null
  }
  requestDataObject: FlowRelatedItem | null
  responseDataObject: FlowRelatedItem | null
  dataObjects: FlowRelatedItem[]
  proxyComponents: Array<{
    order: number
    component: FlowRelatedItem
  }>
  motivations: FlowRelatedItem[]
  solutions: FlowSolutionItem[]
  createdAt: string | null
  createdBy: string | null
  updatedAt: string | null
  updatedBy: string | null
}

export type TechnologyFlowDetail = {
  id: string
  code: string
  name: string
  description: string | null
  layer: "Technology"
  flowType: "technology"
  environment: Environment | null
  source: {
    node: FlowRelatedItem | null
    port: FlowPortItem | null
  }
  target: {
    node: FlowRelatedItem | null
    port: FlowPortItem | null
  }
  proxyNodes: Array<{
    order: number
    node: FlowRelatedItem
  }>
  motivations: FlowRelatedItem[]
  solutions: FlowSolutionItem[]
  createdAt: string | null
  createdBy: string | null
  updatedAt: string | null
  updatedBy: string | null
}

export type FlowDetail = ApplicationFlowDetail | TechnologyFlowDetail

export type { Paginated } from "@archpad/contract"

