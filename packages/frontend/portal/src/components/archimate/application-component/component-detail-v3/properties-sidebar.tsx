"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDirectoryItems } from "@/hooks/use-directory-items"

export type DirectoryFields = {
  licenseTypeId: string | null
  architectureStyleId: string | null
  criticalLevelId: string | null
  failoverTypeId: string | null
  recoveryTimeId: string | null
  redundancyTypeId: string | null
  monitoringLevelId: string | null
  scalingTypeId: string | null
}

export type PropertiesSidebarProps = {
  t: (key: string) => string
  code: string
  stateId: string | null
  directoryFields: DirectoryFields
  onCodeChange: (v: string) => void
  onStateChange: (v: string | null) => void
  onDirectoryFieldChange: (field: keyof DirectoryFields, value: string | null) => void
}

const fieldClass = "h-8 w-full min-w-0 border-border bg-background text-sm"

/**
 * Properties sidebar with all classifiers: code, state, license, architecture,
 * critical level, failover, recovery, redundancy, monitoring, scaling.
 * Select fields match Code input width (w-full).
 */
export function PropertiesSidebar({
  t,
  code,
  stateId,
  directoryFields,
  onCodeChange,
  onStateChange,
  onDirectoryFieldChange,
}: PropertiesSidebarProps) {
  const { items: componentStates = [] } = useDirectoryItems("component-states")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")
  const { items: architectureStyles = [] } = useDirectoryItems("architecture-styles")
  const { items: criticalLevels = [] } = useDirectoryItems("critical-levels")
  const { items: failoverTypes = [] } = useDirectoryItems("failover-types")
  const { items: recoveryTimes = [] } = useDirectoryItems("recovery-times")
  const { items: redundancyTypes = [] } = useDirectoryItems("redundancy-types")
  const { items: monitoringLevels = [] } = useDirectoryItems("monitoring-levels")
  const { items: scalingTypes = [] } = useDirectoryItems("scaling-types")

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">
        {t("tab.properties")}
      </h3>

      <div className="space-y-4 w-full min-w-0">
        <div className="grid gap-2">
          <Label htmlFor="code" className="text-xs text-muted-foreground">
            {t("table.code")}
          </Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="state" className="text-xs text-muted-foreground">
            {t("item.state")}
          </Label>
          <Select
            value={stateId ?? ""}
            onValueChange={(v) => onStateChange(v || null)}
          >
            <SelectTrigger id="state" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="architecture" className="text-xs text-muted-foreground">
            {t("directory.architecture.style")}
          </Label>
          <Select
            value={directoryFields.architectureStyleId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("architectureStyleId", v || null)
            }
          >
            <SelectTrigger id="architecture" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="license" className="text-xs text-muted-foreground">
            {t("directory.license.type")}
          </Label>
          <Select
            value={directoryFields.licenseTypeId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("licenseTypeId", v || null)
            }
          >
            <SelectTrigger id="license" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="critical" className="text-xs text-muted-foreground">
            {t("directory.critical.level")}
          </Label>
          <Select
            value={directoryFields.criticalLevelId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("criticalLevelId", v || null)
            }
          >
            <SelectTrigger id="critical" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="failover" className="text-xs text-muted-foreground">
            {t("directory.failover.type")}
          </Label>
          <Select
            value={directoryFields.failoverTypeId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("failoverTypeId", v || null)
            }
          >
            <SelectTrigger id="failover" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="recovery" className="text-xs text-muted-foreground">
            {t("directory.recovery.time")}
          </Label>
          <Select
            value={directoryFields.recoveryTimeId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("recoveryTimeId", v || null)
            }
          >
            <SelectTrigger id="recovery" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="redundancy" className="text-xs text-muted-foreground">
            {t("directory.redundancy.type")}
          </Label>
          <Select
            value={directoryFields.redundancyTypeId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("redundancyTypeId", v || null)
            }
          >
            <SelectTrigger id="redundancy" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="monitoring" className="text-xs text-muted-foreground">
            {t("directory.monitoring.level")}
          </Label>
          <Select
            value={directoryFields.monitoringLevelId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("monitoringLevelId", v || null)
            }
          >
            <SelectTrigger id="monitoring" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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

        <div className="grid gap-2">
          <Label htmlFor="scaling" className="text-xs text-muted-foreground">
            {t("directory.scaling.type")}
          </Label>
          <Select
            value={directoryFields.scalingTypeId ?? ""}
            onValueChange={(v) =>
              onDirectoryFieldChange("scalingTypeId", v || null)
            }
          >
            <SelectTrigger id="scaling" className={fieldClass}>
              <SelectValue placeholder={t("select.placeholder")} />
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
      </div>
    </div>
  )
}
