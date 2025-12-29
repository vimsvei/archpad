"use client"

import * as React from "react"
import ApplicationComponent from "@/components/icons/ApplicationComponent"
import ApplicationDataObject from "@/components/icons/ApplicationDataObject"
import ApplicationFunction2 from "@/components/icons/ApplicationFunction2"
import ApplicationInterface from "@/components/icons/ApplicationInterface"
import ApplicationEvent from "@/components/icons/ApplicationEvent"
import { SystemSoftwareIcon } from "@/components/icons/system-software-icon"
import TechnicalNode from "@/components/icons/TechnicalNode"
import Network from "@/components/icons/Network"
import type { SheetType } from "./archimate-object-type"

// Re-export SheetType for backward compatibility
export type { SheetType }

export type SheetConfig = {
  /** Translation key for the table name (e.g., "application.data-objects") */
  tableKey: string
  /** Icon component for this sheet type */
  icon: React.ComponentType<{ width?: number; height?: number; className?: string }>
  /** Whether items of this type can be created */
  canCreate?: boolean
  /** Whether items of this type can be added from existing items */
  canAdd?: boolean
  /** Whether items of this type can be deleted */
  canDelete?: boolean
}

/**
 * Configuration for different sheet types used in AddExistingItemsSheet.
 * Each entry defines the translation key and icon component.
 * If translation is missing, the translation key will be displayed.
 */
export const SHEET_CONFIGS: Record<SheetType, SheetConfig> = {
  "system-software": {
    tableKey: "technologies.system-software",
    icon: (props) => <SystemSoftwareIcon width={24} height={24} {...props} />,
    canAdd: true,
    canDelete: true,
  },
  "data-objects": {
    tableKey: "application.data-objects",
    icon: (props) => <ApplicationDataObject width={24} height={24} {...props} />,
    canCreate: true,
    canAdd: true,
    canDelete: true,
  },
  parent: {
    tableKey: "hierarchy.parent",
    icon: (props) => <ApplicationComponent width={24} height={24} {...props} />,
    canAdd: true,
    canDelete: true,
  },
  child: {
    tableKey: "hierarchy.children",
    icon: (props) => <ApplicationComponent width={24} height={24} {...props} />,
    canAdd: true,
    canDelete: true,
  },
  functions: {
    tableKey: "application.functions",
    icon: (props) => <ApplicationFunction2 width={24} height={24} {...props} />,
    canCreate: true,
    canAdd: true,
    canDelete: true,
  },
  interfaces: {
    tableKey: "application.interfaces",
    icon: (props) => <ApplicationInterface width={24} height={24} {...props} />,
    canCreate: true,
    canAdd: true,
    canDelete: true,
  },
  events: {
    tableKey: "application.events",
    icon: (props) => <ApplicationEvent width={24} height={24} {...props} />,
    canCreate: true,
    canAdd: true,
    canDelete: true,
  },
  node: {
    tableKey: "technologies.nodes",
    icon: (props) => <TechnicalNode width={24} height={24} {...props} />,
    canAdd: true,
    canDelete: true,
  },
  network: {
    tableKey: "technologies.networks",
    icon: (props) => <Network width={24} height={24} {...props} />,
    canAdd: true,
    canDelete: true,
  },
}

/**
 * Get sheet configuration by type
 */
export function getSheetConfig(type: SheetType | null): SheetConfig | null {
  if (!type) return null
  return SHEET_CONFIGS[type] || null
}

