"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import type {
  Environment,
} from "@/services/flow.rest"
import type {
  FlowRelatedItem,
  FlowSolutionItem,
  FlowPortItem,
  FlowType,
} from "@/@types/flow"
import { ArchimateDetailCard } from "@/components/shared/archimate/archimate-detail-card"
import { PropertiesSection, type PropertiesSectionField } from "@/components/shared/archimate/properties-section"
import {
  FlowStructurePanel,
  type FlowIntermediary,
  type FlowStructureColumn,
  type FlowStructureEntry,
} from "@/components/shared/archimate/flow-structure-panel"
import {
  createApplicationFlowRelationLayers,
  createTechnologyFlowRelationLayers,
} from "@/components/archimate/flow/relations-config"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"

const environmentValues: Environment[] = [
  "local",
  "dev",
  "test",
  "stage",
  "prod",
  "demo",
  "dr",
  "sandbox",
]

type FlowDetailV3Props = {
  flowId: string
  flowType: FlowType
  isSaving: boolean
  isDirty: boolean
  isDraftValid: boolean
  onBack: () => void
  onSave: () => void
  editState: {
    code: string
    name: string
    description: string
    environment: Environment | null
    sourceComponent: FlowRelatedItem | null
    sourceFunction: FlowRelatedItem | null
    targetComponent: FlowRelatedItem | null
    targetFunction: FlowRelatedItem | null
    sourceNode: FlowRelatedItem | null
    sourcePort: FlowPortItem | null
    targetNode: FlowRelatedItem | null
    targetPort: FlowPortItem | null
    requestDataObject: FlowRelatedItem | null
    responseDataObject: FlowRelatedItem | null
    dataObjects: FlowRelatedItem[]
    proxyComponents: FlowRelatedItem[]
    proxyNodes: FlowRelatedItem[]
    motivations: FlowRelatedItem[]
    solutions: FlowSolutionItem[]
  }
  onUpdateCode: (value: string) => void
  onUpdateName: (value: string) => void
  onUpdateDescription: (value: string) => void
  onUpdateEnvironment: (value: Environment | null) => void
  onMoveProxyUp: (id: string) => void
  onMoveProxyDown: (id: string) => void
  onRemoveProxy: (id: string) => void
  onRemoveDataObject: (id: string) => void
  onRemoveMotivation: (id: string) => void
  onRemoveSolution: (id: string) => void
}

function mapRelationItems(items: FlowRelatedItem[]): RelationGroupItem[] {
  return items.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    description: item.description,
  }))
}

function toStructureEntry(
  item: FlowRelatedItem,
  iconType: FlowStructureEntry["iconType"],
  href: string,
  subtitle?: string | null
): FlowStructureEntry {
  return {
    id: item.id,
    code: item.code,
    name: item.name,
    description: item.description,
    iconType,
    href,
    subtitle,
  }
}

export function FlowDetailV3({
  flowId,
  flowType,
  isSaving,
  isDirty,
  isDraftValid,
  onBack,
  onSave,
  editState,
  onUpdateCode,
  onUpdateName,
  onUpdateDescription,
  onUpdateEnvironment,
  onMoveProxyUp,
  onMoveProxyDown,
  onRemoveProxy,
  onRemoveDataObject,
  onRemoveMotivation,
  onRemoveSolution,
}: FlowDetailV3Props) {
  const { t } = useTranslate()

  const isApplicationFlow = flowType === "application"

  const sourceColumn = React.useMemo<FlowStructureColumn>(() => {
    if (isApplicationFlow) {
      const entries: FlowStructureEntry[] = []
      if (editState.sourceComponent) {
        entries.push(
          toStructureEntry(
            editState.sourceComponent,
            "application-component",
            `/application/components/${editState.sourceComponent.id}`
          )
        )
      }
      if (editState.sourceFunction) {
        entries.push(
          toStructureEntry(
            editState.sourceFunction,
            "application-function",
            `/common/functions/${editState.sourceFunction.id}`
          )
        )
      }
      return {
        titleKey: "flow.endpoint.source",
        entries,
      }
    }

    const entries: FlowStructureEntry[] = []
    if (editState.sourceNode) {
      entries.push(
        toStructureEntry(
          editState.sourceNode,
          "technology-node",
          `/technologies/nodes/${editState.sourceNode.id}`
        )
      )
    }
    if (editState.sourcePort) {
      entries.push(
        toStructureEntry(
          editState.sourcePort,
          "application-interface",
          "#",
          editState.sourcePort.protocol ?? null
        )
      )
    }
    return {
      titleKey: "flow.endpoint.source",
      entries,
    }
  }, [editState.sourceComponent, editState.sourceFunction, editState.sourceNode, editState.sourcePort, isApplicationFlow])

  const targetColumn = React.useMemo<FlowStructureColumn>(() => {
    if (isApplicationFlow) {
      const entries: FlowStructureEntry[] = []
      if (editState.targetComponent) {
        entries.push(
          toStructureEntry(
            editState.targetComponent,
            "application-component",
            `/application/components/${editState.targetComponent.id}`
          )
        )
      }
      if (editState.targetFunction) {
        entries.push(
          toStructureEntry(
            editState.targetFunction,
            "application-function",
            `/common/functions/${editState.targetFunction.id}`
          )
        )
      }
      return {
        titleKey: "flow.endpoint.target",
        entries,
      }
    }

    const entries: FlowStructureEntry[] = []
    if (editState.targetNode) {
      entries.push(
        toStructureEntry(
          editState.targetNode,
          "technology-node",
          `/technologies/nodes/${editState.targetNode.id}`
        )
      )
    }
    if (editState.targetPort) {
      entries.push(
        toStructureEntry(
          editState.targetPort,
          "application-interface",
          "#",
          editState.targetPort.protocol ?? null
        )
      )
    }
    return {
      titleKey: "flow.endpoint.target",
      entries,
    }
  }, [editState.targetComponent, editState.targetFunction, editState.targetNode, editState.targetPort, isApplicationFlow])

  const intermediaries = React.useMemo<FlowIntermediary[]>(() => {
    if (isApplicationFlow) {
      return editState.proxyComponents.map((item) => ({
        id: item.id,
        entries: [
          toStructureEntry(
            item,
            "application-component",
            `/application/components/${item.id}`
          ),
        ],
      }))
    }

    return editState.proxyNodes.map((item) => ({
      id: item.id,
      entries: [
        toStructureEntry(
          item,
          "technology-node",
          `/technologies/nodes/${item.id}`
        ),
      ],
    }))
  }, [editState.proxyComponents, editState.proxyNodes, isApplicationFlow])

  const relationLayers = React.useMemo(() => {
    if (isApplicationFlow) {
      return createApplicationFlowRelationLayers({
        dataObjects: mapRelationItems(editState.dataObjects),
        motivations: mapRelationItems(editState.motivations),
        solutions: mapRelationItems(editState.solutions),
        onRemoveDataObject,
        onRemoveMotivation,
        onRemoveSolution,
      })
    }

    return createTechnologyFlowRelationLayers({
      motivations: mapRelationItems(editState.motivations),
      solutions: mapRelationItems(editState.solutions),
      onRemoveMotivation,
      onRemoveSolution,
    })
  }, [
    editState.dataObjects,
    editState.motivations,
    editState.solutions,
    isApplicationFlow,
    onRemoveDataObject,
    onRemoveMotivation,
    onRemoveSolution,
  ])

  const environmentOptions = React.useMemo(
    () =>
      environmentValues.map((value) => ({
        value,
        label: t(`flow.environment.${value}`),
      })),
    [t]
  )

  const propertiesFields = React.useMemo<PropertiesSectionField[]>(() => {
    const common: PropertiesSectionField[] = [
      {
        kind: "input",
        id: `${flowId}-code`,
        label: t("table.code"),
        value: editState.code,
        onChange: onUpdateCode,
      },
      {
        kind: "input",
        id: `${flowId}-state`,
        label: t("item.state"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
    ]

    if (isApplicationFlow) {
      return [
        ...common,
        {
          kind: "input",
          id: `${flowId}-request-object`,
          label: t("flow.request-data-object"),
          value: editState.requestDataObject?.name ?? "—",
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-response-object`,
          label: t("flow.response-data-object"),
          value: editState.responseDataObject?.name ?? "—",
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-protocol`,
          label: t("flow.field.protocol"),
          value: t("flow.field.not-connected"),
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-data-format`,
          label: t("flow.field.data-format"),
          value: t("flow.field.not-connected"),
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-frequency`,
          label: t("flow.field.frequency"),
          value: t("flow.field.not-connected"),
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-volume-per-day`,
          label: t("flow.field.volume-per-day"),
          value: t("flow.field.not-connected"),
          disabled: true,
          readOnly: true,
        },
        {
          kind: "input",
          id: `${flowId}-critical-level`,
          label: t("flow.field.critical-level"),
          value: t("flow.field.not-connected"),
          disabled: true,
          readOnly: true,
        },
      ]
    }

    return [
      ...common,
      {
        kind: "select",
        id: `${flowId}-environment`,
        label: t("flow.environment"),
        value: editState.environment ?? "dev",
        options: environmentOptions,
        onValueChange: (value) => onUpdateEnvironment(value as Environment),
        disabled: isSaving,
      },
      {
        kind: "input",
        id: `${flowId}-protocol`,
        label: t("flow.field.protocol"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
      {
        kind: "input",
        id: `${flowId}-bandwidth`,
        label: t("flow.field.bandwidth"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
      {
        kind: "input",
        id: `${flowId}-latency`,
        label: t("flow.field.latency"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
      {
        kind: "input",
        id: `${flowId}-encryption`,
        label: t("flow.field.encryption"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
      {
        kind: "input",
        id: `${flowId}-critical-level`,
        label: t("flow.field.critical-level"),
        value: t("flow.field.not-connected"),
        disabled: true,
        readOnly: true,
      },
    ]
  }, [
    editState.code,
    editState.environment,
    editState.requestDataObject?.name,
    editState.responseDataObject?.name,
    environmentOptions,
    flowId,
    isApplicationFlow,
    isSaving,
    onUpdateCode,
    onUpdateEnvironment,
    t,
  ])

  return (
    <ArchimateDetailCard
      t={(key) => t(key)}
      header={{
        name: editState.name,
        onNameChange: onUpdateName,
        onBack,
        onSave,
        isSaving,
        isDirty,
        isDraftValid,
        placeholder: isApplicationFlow ? t("flow.application") : t("flow.technology"),
        iconType: isApplicationFlow ? "application-flow" : "technology-flow",
      }}
      description={{
        editorKey: flowId,
        value: editState.description,
        onChange: onUpdateDescription,
        disabled: isSaving,
      }}
      mainBeforeRelations={(
        <FlowStructurePanel
          t={(key) => t(key)}
          source={sourceColumn}
          intermediaries={intermediaries}
          target={targetColumn}
          onMoveIntermediaryUp={onMoveProxyUp}
          onMoveIntermediaryDown={onMoveProxyDown}
          onRemoveIntermediary={onRemoveProxy}
        />
      )}
      relations={{
        titleKey: "flow.relationships",
        layers: relationLayers,
      }}
      sidebar={(
        <PropertiesSection
          title={t("tab.properties")}
          fields={propertiesFields}
        />
      )}
    />
  )
}

