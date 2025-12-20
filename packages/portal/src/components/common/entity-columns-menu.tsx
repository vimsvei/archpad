"use client"

import * as React from "react"
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type VisibilityState,
} from "@tanstack/react-table"
import { Columns3Cog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type EntityColumnsMenuProps<TData> = {
  columns: ColumnDef<TData, any>[]
  columnVisibility: VisibilityState
  onColumnVisibilityChange: OnChangeFn<VisibilityState>
  ariaLabel?: string
}

export function EntityColumnsMenu<TData>({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  ariaLabel = "Columns",
}: EntityColumnsMenuProps<TData>) {
  // We create a lightweight table instance to reuse TanStack's column hiding logic.
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: onColumnVisibilityChange as any,
    state: { columnVisibility },
  })

  const leafColumns = table.getAllLeafColumns().filter((c) => c.getCanHide())
  const visibleLeafCount = leafColumns.filter((c) => c.getIsVisible()).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          <Columns3Cog className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Columns ({visibleLeafCount}/{leafColumns.length})
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {leafColumns.map((col) => {
          const label =
            typeof col.columnDef.header === "string" ? col.columnDef.header : col.id
          return (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.getIsVisible()}
              onCheckedChange={(v) => col.toggleVisibility(Boolean(v))}
            >
              {label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


