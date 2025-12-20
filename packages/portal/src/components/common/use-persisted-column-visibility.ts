"use client"

import * as React from "react"
import type { VisibilityState } from "@tanstack/react-table"

function storageKey(tableId: string) {
  return `table.visibility.${tableId}`
}

export function usePersistedColumnVisibility(tableId: string) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(tableId))
      if (!raw) return
      const parsed = JSON.parse(raw) as VisibilityState
      if (parsed && typeof parsed === "object") setColumnVisibility(parsed)
    } catch {
      // ignore
    }
  }, [tableId])

  React.useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(tableId), JSON.stringify(columnVisibility))
    } catch {
      // ignore
    }
  }, [tableId, columnVisibility])

  return { columnVisibility, setColumnVisibility }
}


