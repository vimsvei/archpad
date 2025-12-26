"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  ApplicationComponent,
  ApplicationFunction2,
  ApplicationDataObject,
  SystemSoftware,
} from "@/components/icons"

export type ArchimateObjectIconType =
  | "application-component"
  | "application-function"
  | "application-data-object"
  | "system-software"

type ArchimateObjectIconProps = {
  type: ArchimateObjectIconType
  className?: string
  size?: number
}

export function ArchimateObjectIcon({ type, className, size = 24 }: ArchimateObjectIconProps) {
  const commonProps = {
    width: size,
    height: size,
    "aria-hidden": true as const,
    focusable: false as const,
    className: cn("shrink-0", className),
  }

  switch (type) {
    case "application-component":
      return <ApplicationComponent {...commonProps} />
    case "application-function":
      return <ApplicationFunction2 {...commonProps} />
    case "application-data-object":
      return <ApplicationDataObject {...commonProps} />
    case "system-software":
      return <SystemSoftware {...commonProps} />
    default:
      return null
  }
}


