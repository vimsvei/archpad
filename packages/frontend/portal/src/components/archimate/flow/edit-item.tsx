"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"
import type { FlowPortItem, FlowRelatedItem, FlowSolutionItem, FlowType } from "@/@types/flow"
import type { Environment } from "@/services/flow.rest"
import { FlowDetailV3 } from "@/components/archimate/flow/flow-detail-v3"
import { EditPageErrorState, EditPageLoadingState } from "@/components/shared/archimate/edit-page-state"
import { UnsavedChangesDialog } from "@/components/archimate/application-component/unsaved-changes-dialog"
import { useUnsavedNavigationGuard } from "@/hooks/archimate/use-unsaved-navigation-guard"
import { useGetFlowQuery, useUpdateFlowMutation } from "@/store/apis/flow-api"

type EditItemProps = {
  id: string
}

type DraftState = {
  code: string
  name: string
  description: string
  environment: Environment | null
}

type Snapshot = {
  code: string
  name: string
  description: string
  environment: Environment | null
  requestDataObjectId: string | null
  responseDataObjectId: string | null
  proxyComponentIds: string[]
  proxyNodeIds: string[]
  motivationIds: string[]
  solutionIds: string[]
}

function normalizeDraft(value: DraftState): DraftState {
  return {
    code: value.code.trim(),
    name: value.name.trim(),
    description: value.description.trim(),
    environment: value.environment ?? null,
  }
}

function reorderById<T extends { id: string }>(
  items: T[],
  id: string,
  direction: "up" | "down"
): T[] {
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return items

  if (direction === "up" && index === 0) return items
  if (direction === "down" && index === items.length - 1) return items

  const next = [...items]
  const offset = direction === "up" ? -1 : 1
  const targetIndex = index + offset

  const temp = next[targetIndex]
  next[targetIndex] = next[index]
  next[index] = temp
  return next
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()

  const { data, error, isLoading, isFetching } = useGetFlowQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )
  const [updateFlow, updateState] = useUpdateFlowMutation()

  const baselineRef = React.useRef<Snapshot | null>(null)
  const [flowType, setFlowType] = React.useState<FlowType>("application")
  const [draft, setDraft] = React.useState<DraftState>({
    code: "",
    name: "",
    description: "",
    environment: null,
  })

  const [sourceComponent, setSourceComponent] = React.useState<FlowRelatedItem | null>(null)
  const [sourceFunction, setSourceFunction] = React.useState<FlowRelatedItem | null>(null)
  const [targetComponent, setTargetComponent] = React.useState<FlowRelatedItem | null>(null)
  const [targetFunction, setTargetFunction] = React.useState<FlowRelatedItem | null>(null)
  const [sourceNode, setSourceNode] = React.useState<FlowRelatedItem | null>(null)
  const [sourcePort, setSourcePort] = React.useState<FlowPortItem | null>(null)
  const [targetNode, setTargetNode] = React.useState<FlowRelatedItem | null>(null)
  const [targetPort, setTargetPort] = React.useState<FlowPortItem | null>(null)

  const [requestDataObject, setRequestDataObject] = React.useState<FlowRelatedItem | null>(null)
  const [responseDataObject, setResponseDataObject] = React.useState<FlowRelatedItem | null>(null)
  const [dataObjects, setDataObjects] = React.useState<FlowRelatedItem[]>([])
  const [proxyComponents, setProxyComponents] = React.useState<FlowRelatedItem[]>([])
  const [proxyNodes, setProxyNodes] = React.useState<FlowRelatedItem[]>([])
  const [motivations, setMotivations] = React.useState<FlowRelatedItem[]>([])
  const [solutions, setSolutions] = React.useState<FlowSolutionItem[]>([])

  React.useEffect(() => {
    if (!data) return

    setFlowType(data.flowType)
    setDraft({
      code: data.code ?? "",
      name: data.name ?? "",
      description: data.description ?? "",
      environment: data.flowType === "technology" ? (data.environment ?? "dev") : null,
    })

    if (data.flowType === "application") {
      setSourceComponent(data.source.component)
      setSourceFunction(data.source.function)
      setTargetComponent(data.target.component)
      setTargetFunction(data.target.function)
      setSourceNode(null)
      setSourcePort(null)
      setTargetNode(null)
      setTargetPort(null)
      setRequestDataObject(data.requestDataObject)
      setResponseDataObject(data.responseDataObject)
      setDataObjects(data.dataObjects ?? [])
      setProxyComponents((data.proxyComponents ?? []).map((item) => item.component))
      setProxyNodes([])
      setMotivations(data.motivations ?? [])
      setSolutions(data.solutions ?? [])

      baselineRef.current = {
        ...normalizeDraft({
          code: data.code ?? "",
          name: data.name ?? "",
          description: data.description ?? "",
          environment: null,
        }),
        requestDataObjectId: data.requestDataObject?.id ?? null,
        responseDataObjectId: data.responseDataObject?.id ?? null,
        proxyComponentIds: (data.proxyComponents ?? []).map((item) => item.component.id),
        proxyNodeIds: [],
        motivationIds: (data.motivations ?? []).map((item) => item.id),
        solutionIds: (data.solutions ?? []).map((item) => item.id),
      }
      return
    }

    setSourceComponent(null)
    setSourceFunction(null)
    setTargetComponent(null)
    setTargetFunction(null)
    setSourceNode(data.source.node)
    setSourcePort(data.source.port)
    setTargetNode(data.target.node)
    setTargetPort(data.target.port)
    setRequestDataObject(null)
    setResponseDataObject(null)
    setDataObjects([])
    setProxyComponents([])
    setProxyNodes((data.proxyNodes ?? []).map((item) => item.node))
    setMotivations(data.motivations ?? [])
    setSolutions(data.solutions ?? [])

    baselineRef.current = {
      ...normalizeDraft({
        code: data.code ?? "",
        name: data.name ?? "",
        description: data.description ?? "",
        environment: data.environment ?? "dev",
      }),
      requestDataObjectId: null,
      responseDataObjectId: null,
      proxyComponentIds: [],
      proxyNodeIds: (data.proxyNodes ?? []).map((item) => item.node.id),
      motivationIds: (data.motivations ?? []).map((item) => item.id),
      solutionIds: (data.solutions ?? []).map((item) => item.id),
    }
  }, [data])

  const currentSnapshot = React.useMemo<Snapshot>(() => {
    const normalizedDraft = normalizeDraft(draft)
    return {
      ...normalizedDraft,
      requestDataObjectId: requestDataObject?.id ?? null,
      responseDataObjectId: responseDataObject?.id ?? null,
      proxyComponentIds: proxyComponents.map((item) => item.id),
      proxyNodeIds: proxyNodes.map((item) => item.id),
      motivationIds: motivations.map((item) => item.id),
      solutionIds: solutions.map((item) => item.id),
    }
  }, [
    draft,
    motivations,
    proxyComponents,
    proxyNodes,
    requestDataObject?.id,
    responseDataObject?.id,
    solutions,
  ])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    return JSON.stringify(currentSnapshot) !== JSON.stringify(baselineRef.current)
  }, [currentSnapshot])

  const isDraftValid = React.useMemo(() => Boolean(draft.name.trim()), [draft.name])

  const goBack = React.useCallback(() => {
    router.push("/flows")
  }, [router])

  const handleSave = React.useCallback(async () => {
    if (!data) return false

    if (!isDraftValid) {
      toast.error(t("form.invalid"))
      return false
    }

    const normalized = normalizeDraft(draft)

    try {
      if (data.flowType === "application") {
        await updateFlow({
          id: data.id,
          input: {
            code: normalized.code,
            name: normalized.name,
            description: normalized.description ? normalized.description : null,
            requestDataObjectId: requestDataObject?.id ?? null,
            responseDataObjectId: responseDataObject?.id ?? null,
            proxyComponentIds: proxyComponents.map((item) => item.id),
            motivationIds: motivations.map((item) => item.id),
            solutionIds: solutions.map((item) => item.id),
          },
        }).unwrap()
      } else {
        await updateFlow({
          id: data.id,
          input: {
            code: normalized.code,
            name: normalized.name,
            description: normalized.description ? normalized.description : null,
            environment: normalized.environment ?? undefined,
            proxyNodeIds: proxyNodes.map((item) => item.id),
            motivationIds: motivations.map((item) => item.id),
            solutionIds: solutions.map((item) => item.id),
          },
        }).unwrap()
      }

      baselineRef.current = currentSnapshot
      toast.success(t("action.saved"))
      return true
    } catch (saveError: any) {
      toast.error(saveError?.message ?? t("action.save.failed"))
      return false
    }
  }, [
    currentSnapshot,
    data,
    draft,
    isDraftValid,
    motivations,
    proxyComponents,
    proxyNodes,
    requestDataObject?.id,
    responseDataObject?.id,
    solutions,
    t,
    updateFlow,
  ])

  const {
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleBack,
    handleDialogCancel,
    handleDialogSave,
  } = useUnsavedNavigationGuard({
    isDirty,
    onBackNavigation: goBack,
    onSave: handleSave,
  })

  const handleRemoveDataObject = React.useCallback((relationId: string) => {
    setDataObjects((prev) => prev.filter((item) => item.id !== relationId))
    setRequestDataObject((prev) => (prev?.id === relationId ? null : prev))
    setResponseDataObject((prev) => (prev?.id === relationId ? null : prev))
  }, [])

  const handleRemoveMotivation = React.useCallback((relationId: string) => {
    setMotivations((prev) => prev.filter((item) => item.id !== relationId))
  }, [])

  const handleRemoveSolution = React.useCallback((relationId: string) => {
    setSolutions((prev) => prev.filter((item) => item.id !== relationId))
  }, [])

  const handleMoveProxyUp = React.useCallback((relationId: string) => {
    if (flowType === "application") {
      setProxyComponents((prev) => reorderById(prev, relationId, "up"))
      return
    }
    setProxyNodes((prev) => reorderById(prev, relationId, "up"))
  }, [flowType])

  const handleMoveProxyDown = React.useCallback((relationId: string) => {
    if (flowType === "application") {
      setProxyComponents((prev) => reorderById(prev, relationId, "down"))
      return
    }
    setProxyNodes((prev) => reorderById(prev, relationId, "down"))
  }, [flowType])

  const handleRemoveProxy = React.useCallback((relationId: string) => {
    if (flowType === "application") {
      setProxyComponents((prev) => prev.filter((item) => item.id !== relationId))
      return
    }
    setProxyNodes((prev) => prev.filter((item) => item.id !== relationId))
  }, [flowType])

  if (isLoading || isFetching) {
    return (
      <EditPageLoadingState
        title={t("portfolio.flows")}
        backLabel={t("action.back")}
        onBack={handleBack}
        loadingLabel={t("loading")}
      />
    )
  }

  if (error || !data) {
    const errorMessage = (error as any)?.message ?? t("error.not-found")
    return (
      <EditPageErrorState
        title={t("portfolio.flows")}
        backLabel={t("action.back")}
        onBack={handleBack}
        errorTitle={t("error.title")}
        errorMessage={errorMessage}
        retryLabel={t("action.retry")}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FlowDetailV3
        flowId={id}
        flowType={flowType}
        isSaving={updateState.isLoading}
        isDirty={isDirty}
        isDraftValid={isDraftValid}
        onBack={handleBack}
        onSave={() => void handleSave()}
        editState={{
          code: draft.code,
          name: draft.name,
          description: draft.description,
          environment: draft.environment,
          sourceComponent,
          sourceFunction,
          targetComponent,
          targetFunction,
          sourceNode,
          sourcePort,
          targetNode,
          targetPort,
          requestDataObject,
          responseDataObject,
          dataObjects,
          proxyComponents,
          proxyNodes,
          motivations,
          solutions,
        }}
        onUpdateCode={(value) => setDraft((prev) => ({ ...prev, code: value }))}
        onUpdateName={(value) => setDraft((prev) => ({ ...prev, name: value }))}
        onUpdateDescription={(value) => setDraft((prev) => ({ ...prev, description: value }))}
        onUpdateEnvironment={(value) => setDraft((prev) => ({ ...prev, environment: value }))}
        onMoveProxyUp={handleMoveProxyUp}
        onMoveProxyDown={handleMoveProxyDown}
        onRemoveProxy={handleRemoveProxy}
        onRemoveDataObject={handleRemoveDataObject}
        onRemoveMotivation={handleRemoveMotivation}
        onRemoveSolution={handleRemoveSolution}
      />

      <UnsavedChangesDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        componentName={draft.name || data.name || t("portfolio.flows")}
        isSaving={updateState.isLoading}
        isValid={isDraftValid}
        onCancel={handleDialogCancel}
        onSave={handleDialogSave}
      />
    </div>
  )
}
