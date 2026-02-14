"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { UnsavedChangesDialog } from "@/components/archimate/application-component/unsaved-changes-dialog"
import {
  useGetSystemSoftwareFullQuery,
  useUnlinkSystemSoftwareComponentMutation,
  useUnlinkSystemSoftwareNodeMutation,
  useUpdateSystemSoftwareMutation,
} from "@/store/apis/system-software-api"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import type { SystemSoftwareDirectoryFields } from "@/@types/system-software"
import type { TechnologyRadarZone } from "@archpad/contract"
import { SystemSoftwareDetailV3 } from "./component-detail-v3"
import {
  mapDirectoryIdByName,
  mapRelatedItems,
} from "@/components/shared/archimate/edit-mappers"
import { EditPageErrorState, EditPageLoadingState } from "@/components/shared/archimate/edit-page-state"
import { useUnsavedNavigationGuard } from "@/hooks/archimate/use-unsaved-navigation-guard"

type EditItemProps = {
  id: string
}

type DraftValues = {
  code: string
  name: string
  description: string
  version: string
  radarArea: TechnologyRadarZone | null
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()

  const { data: fullData, error: queryError, isLoading, isFetching } = useGetSystemSoftwareFullQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )
  const [updateItem, updateState] = useUpdateSystemSoftwareMutation()
  const [unlinkComponent] = useUnlinkSystemSoftwareComponentMutation()
  const [unlinkNode] = useUnlinkSystemSoftwareNodeMutation()

  const normalize = React.useCallback((value: DraftValues) => {
    return {
      code: value.code.trim(),
      name: value.name.trim(),
      description: value.description.trim(),
      version: value.version.trim(),
      radarArea: value.radarArea,
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const directoryFieldsBaselineRef = React.useRef<SystemSoftwareDirectoryFields | null>(null)

  const [draft, setDraft] = React.useState<DraftValues>({
    code: "",
    name: "",
    description: "",
    version: "",
    radarArea: null,
  })

  const [directoryFields, setDirectoryFields] = React.useState<SystemSoftwareDirectoryFields>({
    typeId: null,
    licenseTypeId: null,
  })
  const [relatedComponents, setRelatedComponents] = React.useState<
    Array<{ id: string; code: string; name: string; description?: string | null }>
  >([])
  const [relatedTechnologyNodes, setRelatedTechnologyNodes] = React.useState<
    Array<{ id: string; code: string; name: string; description?: string | null }>
  >([])

  const { items: softwareTypes = [] } = useDirectoryItems("software-types")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")

  React.useEffect(() => {
    if (!fullData) return

    const initial: DraftValues = {
      code: fullData.code ?? "",
      name: fullData.name ?? "",
      description: fullData.description ?? "",
      version: fullData.version ?? "",
      radarArea: fullData.radarArea ?? null,
    }

    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [fullData, normalize])

  React.useEffect(() => {
    if (!fullData) return

    const initialFields: SystemSoftwareDirectoryFields = {
      typeId: mapDirectoryIdByName(softwareTypes, fullData.type),
      licenseTypeId: mapDirectoryIdByName(licenseTypes, fullData.license),
    }

    directoryFieldsBaselineRef.current = initialFields
    setDirectoryFields(initialFields)
  }, [fullData, softwareTypes, licenseTypes])

  React.useEffect(() => {
    if (!fullData) return

    setRelatedComponents(mapRelatedItems(fullData.components))
    setRelatedTechnologyNodes(mapRelatedItems(fullData.technologyNodes))
  }, [fullData])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false

    const basicFieldsChanged = JSON.stringify(normalize(draft)) !== JSON.stringify(baselineRef.current)

    const directoryFieldsChanged = directoryFieldsBaselineRef.current
      ? JSON.stringify(directoryFields) !== JSON.stringify(directoryFieldsBaselineRef.current)
      : false

    return basicFieldsChanged || directoryFieldsChanged
  }, [draft, normalize, directoryFields])

  const isDraftValid = React.useMemo(() => {
    return Boolean(draft.name.trim())
  }, [draft.name])

  const goBack = React.useCallback(() => {
    router.push("/technologies/system-software")
  }, [router])

  const handleSave = React.useCallback(async () => {
    if (!fullData) return false

    if (!isDraftValid) {
      toast.error(t("form.invalid"))
      return false
    }

    const normalized = normalize(draft)

    try {
      await updateItem({
        id: fullData.id,
        input: {
          code: normalized.code,
          name: normalized.name,
          description: normalized.description ? normalized.description : undefined,
          version: normalized.version ? normalized.version : undefined,
          radarArea: normalized.radarArea ?? undefined,
          typeId: directoryFields.typeId ?? undefined,
          licenseTypeId: directoryFields.licenseTypeId ?? undefined,
        },
      }).unwrap()

      toast.success(t("action.saved"))
      baselineRef.current = normalized
      directoryFieldsBaselineRef.current = { ...directoryFields }
      return true
    } catch (error: any) {
      toast.error(error?.message ?? t("action.save.failed"))
      return false
    }
  }, [directoryFields, draft, fullData, isDraftValid, normalize, t, updateItem])

  const handleDirectoryFieldChange = React.useCallback(
    (fieldName: keyof SystemSoftwareDirectoryFields, value: string | null) => {
      setDirectoryFields((prev) => ({ ...prev, [fieldName]: value }))
    },
    []
  )

  const handleRemoveComponentRelation = React.useCallback(
    async (componentId: string) => {
      if (!fullData) return
      try {
        await unlinkComponent({ id: fullData.id, componentId }).unwrap()
        setRelatedComponents((prev) => prev.filter((item) => item.id !== componentId))
        toast.success(t("action.deleted"))
      } catch (error: any) {
        toast.error(error?.message ?? t("action.delete.failed"))
      }
    },
    [fullData, t, unlinkComponent]
  )

  const handleRemoveNodeRelation = React.useCallback(
    async (nodeId: string) => {
      if (!fullData) return
      try {
        await unlinkNode({ id: fullData.id, nodeId }).unwrap()
        setRelatedTechnologyNodes((prev) => prev.filter((item) => item.id !== nodeId))
        toast.success(t("action.deleted"))
      } catch (error: any) {
        toast.error(error?.message ?? t("action.delete.failed"))
      }
    },
    [fullData, t, unlinkNode]
  )

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
        title={t("technologies.system-software")}
        backLabel={t("action.back")}
        onBack={handleBack}
        loadingLabel={t("loading")}
      />
    )
  }

  if (queryError || !fullData) {
    const errorMessage = (queryError as any)?.message ?? t("error.not-found")

    return (
      <EditPageErrorState
        title={t("technologies.system-software")}
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
      <SystemSoftwareDetailV3
        softwareId={id}
        isSaving={updateState.isLoading}
        isDirty={isDirty}
        isDraftValid={isDraftValid}
        onBack={handleBack}
        onSave={() => void handleSave()}
        editState={{
          code: draft.code,
          name: draft.name,
          description: draft.description,
          version: draft.version,
          radarArea: draft.radarArea,
          typeId: directoryFields.typeId,
          licenseTypeId: directoryFields.licenseTypeId,
          components: relatedComponents,
          technologyNodes: relatedTechnologyNodes,
        }}
        onUpdateCode={(value) => setDraft((prev) => ({ ...prev, code: value }))}
        onUpdateName={(value) => setDraft((prev) => ({ ...prev, name: value }))}
        onUpdateDescription={(value) => setDraft((prev) => ({ ...prev, description: value }))}
        onUpdateVersion={(value) => setDraft((prev) => ({ ...prev, version: value }))}
        onUpdateRadarArea={(value) => setDraft((prev) => ({ ...prev, radarArea: value }))}
        onUpdateTypeId={(value) => handleDirectoryFieldChange("typeId", value)}
        onUpdateLicenseTypeId={(value) => handleDirectoryFieldChange("licenseTypeId", value)}
        onRemoveComponent={handleRemoveComponentRelation}
        onRemoveTechnologyNode={handleRemoveNodeRelation}
      />

      <UnsavedChangesDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        componentName={draft.name || fullData.name || t("technologies.system-software")}
        isSaving={updateState.isLoading}
        isValid={isDraftValid}
        onCancel={handleDialogCancel}
        onSave={handleDialogSave}
      />
    </div>
  )
}
