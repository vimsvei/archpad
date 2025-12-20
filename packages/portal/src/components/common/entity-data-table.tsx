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

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("overflow-auto rounded-md border", maxHeightClassName)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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


