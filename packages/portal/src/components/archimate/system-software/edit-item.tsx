"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BaseObjectItem } from "@/components/shared/base-object/base-object-item"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useGetSystemSoftwareByIdQuery,
  useUpdateSystemSoftwareMutation,
} from "@/store/apis/system-software-api"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import type { SystemSoftwareDirectoryFields } from "@/@types/system-software"
import { MarkdownEditor } from "../application-component/markdown-editor"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const { data: item, error, isLoading, isFetching } = useGetSystemSoftwareByIdQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )
  const [updateItem, updateState] = useUpdateSystemSoftwareMutation()

  const normalize = React.useCallback((v: BaseObjectValues) => {
    return {
      code: v.code.trim(),
      name: v.name.trim(),
      description: v.description.trim(),
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const directoryFieldsBaselineRef = React.useRef<SystemSoftwareDirectoryFields | null>(null)
  const [draft, setDraft] = React.useState<BaseObjectValues & { version: string }>({
    code: "",
    name: "",
    description: "",
    version: "",
  })

  const [directoryFields, setDirectoryFields] = React.useState<SystemSoftwareDirectoryFields>({
    typeId: null,
    licenseTypeId: null,
  })
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [tab, setTab] = React.useState<string>("general")

  // Load directory items from Redux store (preloaded on app start)
  const { items: softwareTypes = [] } = useDirectoryItems("software-types")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")

  React.useEffect(() => {
    if (!item) return
    const initial: BaseObjectValues & { version: string } = {
      code: item.code ?? "",
      name: item.name ?? "",
      description: item.description ?? "",
      version: item.version ?? "",
    }
    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [item, normalize])

  // Initialize directory fields from item data
  React.useEffect(() => {
    if (!item) return
    
    const updateDirectoryField = (directoryItems: typeof softwareTypes, itemField?: { name: string } | null) => {
      if (!itemField?.name || directoryItems.length === 0) {
        return null
      }
      const found = directoryItems.find((item) => item.name === itemField.name)
      return found?.id ?? null
    }

    const initialFields: SystemSoftwareDirectoryFields = {
      typeId: updateDirectoryField(softwareTypes, item.type) ?? null,
      licenseTypeId: updateDirectoryField(licenseTypes, item.license) ?? null,
    }
    
    directoryFieldsBaselineRef.current = initialFields
    setDirectoryFields(initialFields)
  }, [item, softwareTypes, licenseTypes])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    
    // Check basic fields
    const basicFieldsChanged = JSON.stringify(normalize(draft)) !== JSON.stringify(baselineRef.current)
    
    // Check version
    const versionChanged = (item?.version ?? "") !== draft.version
    
    // Check directory fields
    const directoryFieldsChanged = directoryFieldsBaselineRef.current
      ? JSON.stringify(directoryFields) !== JSON.stringify(directoryFieldsBaselineRef.current)
      : false
    
    return basicFieldsChanged || versionChanged || directoryFieldsChanged
  }, [draft, normalize, directoryFields, item])

  const isDraftValid = React.useMemo(() => {
    return Boolean(draft.name.trim())
  }, [draft.name])

  const goBack = React.useCallback(() => {
    router.push("/technologies/system-software")
  }, [router])

  const handleBack = React.useCallback(() => {
    if (isDirty) {
      setConfirmOpen(true)
      return
    }
    goBack()
  }, [isDirty, goBack])

  const handleSave = React.useCallback(async () => {
    if (!item) return
    if (!isDraftValid) {
      toast.error(tr("form.invalid", "Please fill required fields"))
      return
    }

    const normalized = normalize(draft)
    await updateItem({
      id: item.id,
      input: {
        code: normalized.code,
        name: normalized.name,
        description: normalized.description ? normalized.description : undefined,
        version: draft.version.trim() ? draft.version.trim() : undefined,
        typeId: directoryFields.typeId ?? undefined,
        licenseTypeId: directoryFields.licenseTypeId ?? undefined,
      },
    }).unwrap()

    toast.success(tr("action.saved", "Saved"))
    baselineRef.current = normalize(draft)
    directoryFieldsBaselineRef.current = { ...directoryFields }
  }, [draft, directoryFields, isDraftValid, item, normalize, tr, updateItem])

  const handleDirectoryFieldChange = React.useCallback(
    (fieldName: keyof SystemSoftwareDirectoryFields, value: string | null) => {
      setDirectoryFields((prev) => ({ ...prev, [fieldName]: value }))
    },
    []
  )

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("technologies.system-software")}</h1>
        </div>
        <Card className="p-10">
          <div className="flex items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        </Card>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("technologies.system-software")}</h1>
        </div>
        <Card className="p-6">
          <div className="text-muted-foreground">{(error as any)?.message ?? "Item not found."}</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {t("technologies.system-software")}: {item.name}
            </h1>
            <p className="text-muted-foreground text-sm">ID: {item.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label={tr("action.save", "Save")}
                onClick={() => void handleSave()}
                disabled={!isDirty || updateState.isLoading || !isDraftValid}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.save", "Save")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="general">
            {tr("tabs.general", "Общие")}
          </TabsTrigger>
          <TabsTrigger value="description">
            {tr("tabs.description", "Description")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-0">
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left area: 2/3 - General fields */}
              <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
                {/* General fields card */}
                <Card className="flex-shrink-0 flex flex-col gap-4 p-6">
                  <BaseObjectItem
                    values={draft}
                    onChange={(values) => setDraft((prev) => ({ ...prev, ...values }))}
                    submitLabel={tr("action.save", "Save")}
                    hideActions
                    hideDescription
                    disabled={updateState.isLoading}
                    onSubmit={async (values) => {
                      try {
                        const normalized = normalize(values)
                        await updateItem({
                          id: item.id,
                          input: {
                            code: normalized.code,
                            name: normalized.name,
                            description: normalized.description ? normalized.description : undefined,
                            version: draft.version.trim() ? draft.version.trim() : undefined,
                          },
                        }).unwrap()
                        toast.success(tr("action.saved", "Saved"))
                        baselineRef.current = normalize(values)
                      } catch (e: any) {
                        toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
                      }
                    }}
                  />
                  
                  {/* Version field */}
                  <div className="grid gap-2">
                    <Label htmlFor="system-software-version">{tr("table.version", "Версия")}</Label>
                    <Input
                      id="system-software-version"
                      value={draft.version}
                      onChange={(e) => setDraft((prev) => ({ ...prev, version: e.target.value }))}
                      disabled={updateState.isLoading || !item}
                      placeholder={tr("table.version.placeholder", "Введите версию")}
                    />
                  </div>
                </Card>
              </div>

              {/* Right area: 1/3 - Directory fields */}
              <Card className="lg:col-span-1 flex flex-col gap-4 p-6">
                  
                {/* Software Type */}
                <div className="grid gap-2">
                  <Label htmlFor="software-type">{tr("directory.software.type", "Тип ПО")}</Label>
                    <Select
                      value={directoryFields.typeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("typeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="software-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {softwareTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* License Type */}
                <div className="grid gap-2">
                  <Label htmlFor="license-type">{tr("directory.license.type", "Тип лицензии")}</Label>
                    <Select
                      value={directoryFields.licenseTypeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("licenseTypeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="license-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {licenseTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>
          </div>
          </TabsContent>

          <TabsContent value="description" className="flex min-h-0 flex-1 flex-col mt-0">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <MarkdownEditor
                key={item.id}
                value={draft.description}
                onChange={(markdown) => {
                  setDraft((prev) => ({ ...prev, description: markdown }))
                }}
                disabled={updateState.isLoading || !item}
                placeholder={tr("description.placeholder", "Enter description...")}
              />
            </Card>
          </TabsContent>
        </TabsContents>
      </Tabs>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tr("dialog.unsaved.title", "Unsaved changes")}</DialogTitle>
            <DialogDescription>
              {tr("dialog.unsaved.description", "Save your changes before leaving?")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              {tr("action.cancel", "Cancel")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false)
                goBack()
              }}
            >
              {tr("action.discard", "Don't save")}
            </Button>
            <Button
              onClick={() => {
                void (async () => {
                  try {
                    await handleSave()
                    setConfirmOpen(false)
                    goBack()
                  } catch (e: any) {
                    toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
                  }
                })()
              }}
              disabled={updateState.isLoading || !isDraftValid}
            >
              {tr("action.save", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

