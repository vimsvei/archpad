"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { getSheetConfig } from "@/components/shared/archimate/sheet-configs"
import type { ArchimateObjectType } from "@/components/shared/archimate/archimate-object-type"
import { getSheetTypeFromObjectType } from "@/components/shared/archimate/archimate-object-type"

export type ArchimateObjectIconType = ArchimateObjectType

type ArchimateObjectIconProps = {
  type: ArchimateObjectIconType
  className?: string
  size?: number
}

export function ArchimateObjectIcon({ type, className, size = 24 }: ArchimateObjectIconProps) {
  const sheetType = getSheetTypeFromObjectType(type)
  const config = getSheetConfig(sheetType)

  if (!config?.icon) {
    console.warn(`No icon configuration found for type: ${type}`)
    return null
  }

  const IconComponent = config.icon

  // icon is a React component, render it with props
  return (
    <IconComponent
      width={size}
      height={size}
      // `block` avoids baseline alignment issues that can visually offset icons
      // inside perfectly centered (e.g. rounded-full) containers.
      className={cn("shrink-0 block", className)}
      aria-hidden={true}
    />
  )
}

