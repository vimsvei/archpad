"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
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
}: EntityDataTableProps<TData>) {
  const [uncontrolledVisibility, setUncontrolledVisibility] =
    React.useState<VisibilityState>({})
  const columnVisibility = controlledVisibility ?? uncontrolledVisibility
  const setColumnVisibility = onColumnVisibilityChange ?? setUncontrolledVisibility

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
  })

  const fixedWidthClass = React.useCallback((columnId: string) => {
    if (columnId === "created" || columnId === "updated") {
      return "w-[300px] min-w-[300px] max-w-[300px]"
    }
    return ""
  }, [])

  return (
    <div className={cn("w-full min-w-0 max-w-full", className)}>
      {/* Vertical scroll lives here; horizontal scroll lives inside Table (table-container) */}
      <div className={cn("overflow-y-auto overflow-x-hidden rounded-md border max-w-full", maxHeightClassName)}>
        <Table className="min-w-max">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(fixedWidthClass(header.column.id))}
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
                <TableRow key={row.id}>
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


