"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { getSheetConfig } from "@/components/archimate/sheet-configs"
import type { ArchimateObjectType } from "@/components/archimate/archimate-object-type"
import { getSheetTypeFromObjectType } from "@/components/archimate/archimate-object-type"

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
      className={cn("shrink-0", className)}
      aria-hidden={true}
    />
  )
}

