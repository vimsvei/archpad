"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import type { RootState, AppDispatch } from "@/store/store"
import { updateDirectoryField } from "@/store/slices/application-component-edit-slice"

type ClassificationTabProps = {
  tr: (key: string, fallback?: string) => string
  isSaving: boolean
}

export function ClassificationTab({ tr, isSaving }: ClassificationTabProps) {
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")
  const { items: architectureStyles = [] } = useDirectoryItems("architecture-styles")
  const { items: criticalLevels = [] } = useDirectoryItems("critical-levels")
  const { items: failoverTypes = [] } = useDirectoryItems("failover-types")
  const { items: recoveryTimes = [] } = useDirectoryItems("recovery-times")
  const { items: redundancyTypes = [] } = useDirectoryItems("redundancy-types")
  const { items: monitoringLevels = [] } = useDirectoryItems("monitoring-levels")
  const { items: scalingTypes = [] } = useDirectoryItems("scaling-types")

  const disabled = isSaving

  return (
    <div className="min-h-0 flex-1 flex flex-col h-full">
      <Card className="flex min-h-0 flex-1 flex-col p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column: Architecture Style and License Type */}
          <div className="flex flex-col gap-4">
            {/* Architecture Style */}
            <div className="grid gap-2">
              <Label htmlFor="architecture-style">{tr("directory.architecture.style")}</Label>
              <Select
                value={editState.directoryFields.architectureStyleId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "architectureStyleId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="architecture-style" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {architectureStyles.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* License Type */}
            <div className="grid gap-2">
              <Label htmlFor="license-type">{tr("directory.license.type")}</Label>
              <Select
                value={editState.directoryFields.licenseTypeId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "licenseTypeId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="license-type" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {licenseTypes.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column: All other fields */}
          <div className="flex flex-col gap-4">
            {/* Critical Level */}
            <div className="grid gap-2">
              <Label htmlFor="critical-level">{tr("directory.critical.level")}</Label>
              <Select
                value={editState.directoryFields.criticalLevelId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "criticalLevelId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="critical-level" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {criticalLevels.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Failover Type */}
            <div className="grid gap-2">
              <Label htmlFor="failover-type">{tr("directory.failover.type")}</Label>
              <Select
                value={editState.directoryFields.failoverTypeId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "failoverTypeId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="failover-type" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {failoverTypes.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recovery Time */}
            <div className="grid gap-2">
              <Label htmlFor="recovery-time">{tr("directory.recovery.time")}</Label>
              <Select
                value={editState.directoryFields.recoveryTimeId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "recoveryTimeId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="recovery-time" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {recoveryTimes.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Redundancy Type */}
            <div className="grid gap-2">
              <Label htmlFor="redundancy-type">{tr("directory.redundancy.type")}</Label>
              <Select
                value={editState.directoryFields.redundancyTypeId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "redundancyTypeId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="redundancy-type" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {redundancyTypes.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monitoring Level */}
            <div className="grid gap-2">
              <Label htmlFor="monitoring-level">{tr("directory.monitoring.level")}</Label>
              <Select
                value={editState.directoryFields.monitoringLevelId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "monitoringLevelId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="monitoring-level" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {monitoringLevels.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scaling Type */}
            <div className="grid gap-2">
              <Label htmlFor="scaling-type">{tr("directory.scaling.type")}</Label>
              <Select
                value={editState.directoryFields.scalingTypeId ?? ""}
                onValueChange={(value) =>
                  dispatch(updateDirectoryField({ field: "scalingTypeId", value: value || null }))
                }
                disabled={disabled}
              >
                <SelectTrigger id="scaling-type" className="w-full">
                  <SelectValue placeholder={tr("select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {scalingTypes.map((it) => (
                    <SelectItem key={it.id} value={it.id}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
