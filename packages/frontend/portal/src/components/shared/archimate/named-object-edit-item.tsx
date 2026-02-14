"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import { UnsavedChangesDialog } from "@/components/archimate/application-component/unsaved-changes-dialog"
import { EditPageErrorState, EditPageLoadingState } from "@/components/shared/archimate/edit-page-state"
import { NamedObjectDetailV3 } from "@/components/shared/archimate/named-object-detail-v3"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"
import type {
  NamedObjectRecord,
  UpdateNamedObjectInput,
} from "@/components/shared/archimate/named-object-types"
import type { RelationLayer } from "@/components/archimate/application-component/component-detail-v3/relations-panel"
import { useUnsavedNavigationGuard } from "@/hooks/archimate/use-unsaved-navigation-guard"

type QueryResult<TItem> = {
  data?: TItem
  error?: unknown
  isLoading: boolean
  isFetching: boolean
}

type MutationState = {
  isLoading: boolean
}

type UpdateMutationTrigger<TItem extends NamedObjectRecord> = (args: {
  id: string
  input: UpdateNamedObjectInput
}) => {
  unwrap: () => Promise<TItem>
}

type NamedObjectEditItemProps<TItem extends NamedObjectRecord> = {
  id: string
  titleKey: string
  iconType: ArchimateObjectIconType
  backPath: string
  useGetItemQuery: (
    args: { id: string },
    options?: { refetchOnMountOrArgChange?: boolean }
  ) => QueryResult<TItem>
  useUpdateMutation: () => [UpdateMutationTrigger<TItem>, MutationState]
  buildRelationLayers?: (item: TItem) => RelationLayer[]
}

export function NamedObjectEditItem<TItem extends NamedObjectRecord>({
  id,
  titleKey,
  iconType,
  backPath,
  useGetItemQuery,
  useUpdateMutation,
  buildRelationLayers,
}: NamedObjectEditItemProps<TItem>) {
  const { t } = useTranslate()
  const router = useRouter()

  const { data, error, isLoading, isFetching } = useGetItemQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )
  const [updateItem, updateState] = useUpdateMutation()

  const normalize = React.useCallback((value: { code: string; name: string; description: string }) => {
    return {
      code: value.code.trim(),
      name: value.name.trim(),
      description: value.description.trim(),
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const [draft, setDraft] = React.useState({
    code: "",
    name: "",
    description: "",
  })

  React.useEffect(() => {
    if (!data) return

    const initial = {
      code: data.code ?? "",
      name: data.name ?? "",
      description: data.description ?? "",
    }

    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [data, normalize])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    return JSON.stringify(normalize(draft)) !== JSON.stringify(baselineRef.current)
  }, [draft, normalize])

  const isDraftValid = React.useMemo(() => {
    return Boolean(draft.name.trim())
  }, [draft.name])

  const relationLayers = React.useMemo(() => {
    if (!data || !buildRelationLayers) return []
    return buildRelationLayers(data)
  }, [buildRelationLayers, data])

  const goBack = React.useCallback(() => {
    router.push(backPath)
  }, [backPath, router])

  const handleSave = React.useCallback(async () => {
    if (!data) return false

    if (!isDraftValid) {
      toast.error(t("form.invalid"))
      return false
    }

    const normalized = normalize(draft)

    try {
      await updateItem({
        id: data.id,
        input: {
          code: normalized.code,
          name: normalized.name,
          description: normalized.description ? normalized.description : undefined,
        },
      }).unwrap()

      toast.success(t("action.saved"))
      baselineRef.current = normalized
      return true
    } catch (queryError: any) {
      toast.error(queryError?.message ?? t("action.save.failed"))
      return false
    }
  }, [data, draft, isDraftValid, normalize, t, updateItem])

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

  if (isLoading || isFetching) {
    return (
      <EditPageLoadingState
        title={t(titleKey)}
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
        title={t(titleKey)}
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
      <NamedObjectDetailV3
        objectId={id}
        titleKey={titleKey}
        iconType={iconType}
        isSaving={updateState.isLoading}
        isDirty={isDirty}
        isDraftValid={isDraftValid}
        onBack={handleBack}
        onSave={() => void handleSave()}
        editState={{
          code: draft.code,
          name: draft.name,
          description: draft.description,
          layer: data.layer ?? null,
        }}
        onUpdateCode={(value) => setDraft((prev) => ({ ...prev, code: value }))}
        onUpdateName={(value) => setDraft((prev) => ({ ...prev, name: value }))}
        onUpdateDescription={(value) => setDraft((prev) => ({ ...prev, description: value }))}
        relations={relationLayers.length > 0 ? { layers: relationLayers } : undefined}
      />

      <UnsavedChangesDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        componentName={draft.name || data.name || t(titleKey)}
        isSaving={updateState.isLoading}
        isValid={isDraftValid}
        onCancel={handleDialogCancel}
        onSave={handleDialogSave}
      />
    </div>
  )
}
