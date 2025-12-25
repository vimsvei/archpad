"use client"

import * as React from "react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BaseObjectItem } from "@/components/shared/base-object/base-object-item"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useUpdateApplicationComponentMutation,
} from "@/store/apis/application-component-api"
import { useGetDirectoryItemsQuery } from "@/store/apis/directory-api"
import type { ApplicationComponent, ApplicationComponentDirectoryFields } from "@/@types/application-component"
import { MarkdownEditor } from "./markdown-editor"

type GeneralTabProps = {
  item: ApplicationComponent
  draft: BaseObjectValues
  setDraft: React.Dispatch<React.SetStateAction<BaseObjectValues>>
  directoryFields: ApplicationComponentDirectoryFields
  onDirectoryFieldChange: (fieldName: keyof ApplicationComponentDirectoryFields, value: string | null) => void
  normalize: (v: BaseObjectValues) => { code: string; name: string; description: string }
  baselineRef: React.MutableRefObject<{ code: string; name: string; description: string } | null>
  tr: (key: string, fallback: string) => string
  isSaving: boolean
}

export function GeneralTab({
  item,
  draft,
  setDraft,
  directoryFields,
  onDirectoryFieldChange,
  normalize,
  baselineRef,
  tr,
  isSaving,
}: GeneralTabProps) {
  const { t } = useTranslate()
  const [updateItem, updateState] = useUpdateApplicationComponentMutation()

  // Load directory items for all directories from Redux (database)
  const { data: componentStates = [] } = useGetDirectoryItemsQuery("component-states")
  const { data: licenseTypes = [] } = useGetDirectoryItemsQuery("license-types")
  const { data: architectureStyles = [] } = useGetDirectoryItemsQuery("architecture-styles")
  const { data: criticalLevels = [] } = useGetDirectoryItemsQuery("critical-levels")
  const { data: failoverTypes = [] } = useGetDirectoryItemsQuery("failover-types")
  const { data: recoveryTimes = [] } = useGetDirectoryItemsQuery("recovery-times")
  const { data: redundancyTypes = [] } = useGetDirectoryItemsQuery("redundancy-types")
  const { data: monitoringLevels = [] } = useGetDirectoryItemsQuery("monitoring-levels")
  const { data: scalingTypes = [] } = useGetDirectoryItemsQuery("scaling-types")

  // Initialize stateId from item.state when componentStates are loaded
  React.useEffect(() => {
    if (!item?.state?.name || componentStates.length === 0 || directoryFields.stateId !== null) {
      return
    }
    const found = componentStates.find((state) => state.name === item.state?.name)
    if (found) {
      onDirectoryFieldChange("stateId", found.id)
    }
  }, [item, componentStates, directoryFields.stateId, onDirectoryFieldChange])

  return (
    <div className="min-h-0 flex-1 flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 h-full">
        {/* Left area: 2/3 - General fields + State + Description */}
        <div className="lg:col-span-2 flex flex-col min-h-0 flex-1">
          {/* General fields card - содержит все поля включая Description */}
          <Card className="flex-1 flex flex-col gap-4 p-6 min-h-0">
            <BaseObjectItem
              values={draft}
              onChange={setDraft}
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
                    },
                  }).unwrap()
                  toast.success(tr("action.saved", "Saved"))
                  baselineRef.current = normalize(values)
                } catch (e: any) {
                  toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
                }
              }}
            />
            
            {/* State field */}
            <div className="grid gap-2 flex-shrink-0">
              <Label htmlFor="component-state">{tr("item.state", "Состояние")}</Label>
              <Select
                value={directoryFields.stateId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("stateId", value || null)}
                disabled={updateState.isLoading || !item}
              >
                <SelectTrigger id="component-state" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                </SelectTrigger>
                <SelectContent>
                  {componentStates.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description field - занимает все свободное пространство */}
            <div className="flex-1 flex flex-col min-h-0">
              <Label htmlFor="description">{tr("item.description", "Описание")}</Label>
              <div className="flex-1 min-h-0 mt-2">
                <MarkdownEditor
                  key={item.id}
                  value={draft.description}
                  onChange={(markdown) => {
                    setDraft((prev) => ({ ...prev, description: markdown }))
                  }}
                  disabled={isSaving || !item}
                  placeholder={tr("description.placeholder", "Enter description...")}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right area: 1/3 - Directory fields */}
        <Card className="lg:col-span-1 flex flex-col gap-4 p-6">
          
          {/* License Type */}
          <div className="grid gap-2">
            <Label htmlFor="license-type">{tr("directory.license.type", "Тип лицензии")}</Label>
              <Select
                value={directoryFields.licenseTypeId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("licenseTypeId", value || null)}
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

          {/* Architecture Style */}
          <div className="grid gap-2">
            <Label htmlFor="architecture-style">{tr("directory.architecture.style", "Архитектурный стиль")}</Label>
              <Select
                value={directoryFields.architectureStyleId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("architectureStyleId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="architecture-style" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {architectureStyles.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Critical Level */}
          <div className="grid gap-2">
            <Label htmlFor="critical-level">{tr("directory.critical.level", "Уровень критичности")}</Label>
              <Select
                value={directoryFields.criticalLevelId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("criticalLevelId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="critical-level" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {criticalLevels.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Failover Type */}
          <div className="grid gap-2">
            <Label htmlFor="failover-type">{tr("directory.failover.type", "Тип отказоустойчивости")}</Label>
              <Select
                value={directoryFields.failoverTypeId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("failoverTypeId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="failover-type" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {failoverTypes.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recovery Time */}
          <div className="grid gap-2">
            <Label htmlFor="recovery-time">{tr("directory.recovery.time", "Время восстановления")}</Label>
              <Select
                value={directoryFields.recoveryTimeId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("recoveryTimeId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="recovery-time" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {recoveryTimes.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Redundancy Type */}
          <div className="grid gap-2">
            <Label htmlFor="redundancy-type">{tr("directory.redundancy.type", "Тип избыточности")}</Label>
              <Select
                value={directoryFields.redundancyTypeId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("redundancyTypeId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="redundancy-type" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {redundancyTypes.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Monitoring Level */}
          <div className="grid gap-2">
            <Label htmlFor="monitoring-level">{tr("directory.monitoring.level", "Уровень мониторинга")}</Label>
              <Select
                value={directoryFields.monitoringLevelId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("monitoringLevelId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="monitoring-level" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {monitoringLevels.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Scaling Type */}
          <div className="grid gap-2">
            <Label htmlFor="scaling-type">{tr("directory.scaling.type", "Тип масштабирования")}</Label>
              <Select
                value={directoryFields.scalingTypeId ?? ""}
                onValueChange={(value) => onDirectoryFieldChange("scalingTypeId", value || null)}
                disabled={updateState.isLoading || !item}
              >
              <SelectTrigger id="scaling-type" className="w-full">
                <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
              </SelectTrigger>
              <SelectContent>
                {scalingTypes.map((item) => (
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
  )
}

