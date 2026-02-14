import type { ApplicationComponentDirectoryFields } from "@/@types/application-component"
import type { ApplicationComponentFull } from "@/services/application-component.graphql"
import { mapRelatedItem, mapRelatedItems } from "@/components/shared/archimate/edit-mappers"

type ApplicationFlow = ApplicationComponentFull["incomingFlows"][number]

function mapFlowItems(flows: ApplicationFlow[]): Array<{
  id: string
  code: string
  name: string
  description: string | null
  sourceComponent: string | null
  sourceFunction: null
  sourceInterface: null
  targetComponent: string | null
  targetFunction: null
  targetInterface: null
}> {
  return (flows ?? []).map((flow) => ({
    id: String(flow.id),
    code: String(flow.code ?? ""),
    name: String(flow.name ?? ""),
    description: flow.description ?? null,
    sourceComponent: flow.sourceComponent?.name ?? null,
    sourceFunction: null,
    sourceInterface: null,
    targetComponent: flow.targetComponent?.name ?? null,
    targetFunction: null,
    targetInterface: null,
  }))
}

function mapStakeholders(
  componentId: string,
  stakeholders: ApplicationComponentFull["stakeholders"]
) {
  return (stakeholders ?? []).map((item) => ({
    id: `${componentId}-${item.stakeholderId}-${item.roleId}`,
    stakeholderId: item.stakeholderId,
    stakeholderName: item.stakeholderName,
    roleId: item.roleId,
    roleName: item.roleName,
  }))
}

function buildDirectoryFields(
  fullData: ApplicationComponentFull,
  stateId: string | null
): ApplicationComponentDirectoryFields {
  return {
    stateId,
    licenseTypeId: fullData.licenseType?.id ?? null,
    architectureStyleId: fullData.style?.id ?? null,
    criticalLevelId: fullData.criticalLevel?.id ?? null,
    failoverTypeId: fullData.failoverType?.id ?? null,
    recoveryTimeId: fullData.recoveryTime?.id ?? null,
    redundancyTypeId: fullData.redundancyType?.id ?? null,
    monitoringLevelId: fullData.monitoringLevel?.id ?? null,
    scalingTypeId: fullData.scalingType?.id ?? null,
  }
}

export function mapApplicationComponentToLoadPayload(
  componentId: string,
  fullData: ApplicationComponentFull
) {
  const stateId = fullData.state?.id ?? null

  return {
    code: fullData.code,
    name: fullData.name,
    description: fullData.description ?? "",
    stateId,
    directoryFields: buildDirectoryFields(fullData, stateId),
    functions: mapRelatedItems(fullData.functions),
    dataObjects: mapRelatedItems(fullData.dataObjects),
    interfaces: mapRelatedItems(fullData.interfaces),
    events: mapRelatedItems(fullData.events),
    systemSoftware: (fullData.systemSoftware ?? []).map((item) => ({
      ...mapRelatedItem(item),
      kind: String(item.kind ?? ""),
    })),
    technologyNodes: mapRelatedItems(fullData.technologyNodes),
    technologyNetworks: mapRelatedItems(fullData.technologyNetworks),
    parents: mapRelatedItems(fullData.parents),
    children: mapRelatedItems(fullData.children),
    businessActors: mapRelatedItems(fullData.businessActors),
    businessRoles: mapRelatedItems(fullData.businessRoles),
    businessProcesses: mapRelatedItems(fullData.businessProcesses),
    stakeholders: mapStakeholders(componentId, fullData.stakeholders),
    incomingFlows: mapFlowItems(fullData.incomingFlows),
    outgoingFlows: mapFlowItems(fullData.outgoingFlows),
  }
}
