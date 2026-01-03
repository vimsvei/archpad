"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyBlock } from "@/components/empty/empty"

type EntityDataTableProps<TData> = {
  tableId: string
  data: TData[]
  columns: ColumnDef<TData, any>[]
  loading?: boolean
  emptyTitle: string
  emptyDescription?: string
  /**
   * Container sizing classes for the scrollable table wrapper.
   * Defaults to a viewport-based max height, but can be overridden to "min-h-0 flex-1"
   * when the parent is a flex container and should consume all free space.
   */
  maxHeightClassName?: string
  /** Root wrapper className (useful for flex layouts) */
  className?: string
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  enableRowSelection?: boolean
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  getRowId?: (originalRow: TData, index: number) => string
}

export function EntityDataTable<TData>({
  tableId,
  data,
  columns,
  loading,
  emptyTitle,
  emptyDescription,
  maxHeightClassName = "max-h-[60vh]",
  className,
  columnVisibility: controlledVisibility,
  onColumnVisibilityChange,
  enableRowSelection,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  getRowId,
}: EntityDataTableProps<TData>) {
  const [uncontrolledVisibility, setUncontrolledVisibility] =
    React.useState<VisibilityState>({})
  const columnVisibility = controlledVisibility ?? uncontrolledVisibility
  const setColumnVisibility = onColumnVisibilityChange ?? setUncontrolledVisibility

  const [uncontrolledRowSelection, setUncontrolledRowSelection] =
    React.useState<RowSelectionState>({})
  const rowSelection = controlledRowSelection ?? uncontrolledRowSelection
  const setRowSelection = onRowSelectionChange ?? setUncontrolledRowSelection

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: Boolean(enableRowSelection),
    onRowSelectionChange: setRowSelection,
    getRowId,
    state: { columnVisibility, rowSelection },
  })

  const fixedWidthClass = React.useCallback((columnId: string) => {
    if (columnId === "created" || columnId === "updated") {
      return "w-[300px] min-w-[300px] max-w-[300px]"
    }
    if (columnId === "select") {
      return "w-[44px] min-w-[44px] max-w-[44px]"
    }
    return ""
  }, [])

  return (
    <div className={cn("w-full min-w-0 max-w-full flex flex-col", className)}>
      {/* Vertical scroll lives here; horizontal scroll lives inside Table (table-container) */}
      <div className={cn("overflow-auto rounded-md border max-w-full flex-1 min-h-0 relative", maxHeightClassName)}>
        <Table className="min-w-max" containerClassName="overflow-x-auto">
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      // Keep header visible when table content scrolls
                      "sticky top-0 z-10 bg-card",
                      fixedWidthClass(header.column.id)
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-48">
                  <div className="flex items-center justify-center">
                    <Spinner className="h-6 w-6" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(fixedWidthClass(cell.column.id))}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                  <div className="mx-auto max-w-md py-6">
                    <EmptyBlock title={emptyTitle} description={emptyDescription} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


