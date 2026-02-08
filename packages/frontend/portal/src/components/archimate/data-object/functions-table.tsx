"use client"

import * as React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { RelatedItem } from "@/store/slices/data-object-edit-slice"
import { FunctionUsagesMapTab, type FunctionUsageRow } from "@/components/shared/archimate/maps-tabs/function-usages-map-tab"

export function FunctionsTable() {
  const editState = useSelector((s: RootState) => s.dataObjectEdit)
  const isLoading = editState.isSaving || editState.isLoading

  const rows: FunctionUsageRow[] = React.useMemo(() => {
    return (editState.functionUsages || [])
      .map((u) => {
        const fn = u.function
        if (!fn) return null
        const componentName = u.component?.name ?? "—"
        const componentCode = u.component?.code ?? ""
        return {
          id: u.id,
          functionId: fn.id,
          code: fn.code,
          name: fn.name,
          description: fn.description ?? null,
          componentName: componentCode ? `${componentCode} — ${componentName}` : componentName,
          accessKind: u.accessKind,
        }
      })
      .filter(Boolean) as FunctionUsageRow[]
  }, [editState.functionUsages])

  return (
    <FunctionUsagesMapTab
      items={rows}
      isLoading={isLoading}
      editFunctionPath={(functionId) => `/application/functions/${functionId}`}
    />
  )
}


