"use client"

import * as React from "react"
import Link from "next/link"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useTranslate } from "@tolgee/react"

import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import { EmptyBlock } from "@/components/empty/empty"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DirectoryDataTableProps = {
  directorySlug: DirectorySlug
  data: DirectoryItem[]
  loading?: boolean
  onDelete: (id: string) => void
  toolbarActions?: React.ReactNode
}

export function DirectoryDataTable({
  directorySlug,
  data,
  loading,
  onDelete,
  toolbarActions,
}: DirectoryDataTableProps) {
  const { t } = useTranslate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const columns = React.useMemo<ColumnDef<DirectoryItem>[]>(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3"
          >
            {t("table.code")} <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original
          const code = String(row.getValue("code") ?? "").trim()
          const href = `/directories/${directorySlug}/${item.id}`
          return (
            <Link
              href={href}
              className={[
                "font-mono text-sm",
                "text-primary underline-offset-4 hover:underline",
                !code ? "text-muted-foreground" : "",
              ].join(" ")}
              onClick={(e) => e.stopPropagation()}
              aria-label={t("item.action.edit")}
            >
              {code || "—"}
            </Link>
          )
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3"
          >
            {t("table.name")} <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "description",
        header: t("table.description"),
        cell: ({ row }) => {
          const v = (row.getValue("description") as string | undefined | null) ?? ""
          return v ? <div className="text-muted-foreground line-clamp-2 text-sm">{v}</div> : null
        },
      },
      {
        accessorKey: "color",
        header: t("table.color"),
        enableSorting: false,
        cell: ({ row }) => {
          const item = row.original
          if (!item.color) return <span className="text-muted-foreground text-sm">—</span>
          return (
            <div className="flex items-center gap-2">
              <span
                className="inline-block size-3 rounded-full border"
                style={{ backgroundColor: item.color }}
                aria-label="Color"
              />
              <span className="font-mono text-xs">{item.color}</span>
            </div>
          )
        },
      },
      {
        accessorKey: "byDefault",
        header: t("table.by-default"),
        cell: ({ row }) => {
          const v = Boolean(row.getValue("byDefault"))
          return v ? <span>Yes</span> : <span className="text-muted-foreground">No</span>
        },
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        header: () => null,
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0" aria-label={t("table.item.actions")}>
                    <span className="sr-only">{t("table.item.actions")}</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("table.item.actions")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/directories/${directorySlug}/${item.id}`}>
                      {t("item.action.edit")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => {
                      // Radix closes menu on select; keep behavior but prevent navigation.
                      e.preventDefault()
                      onDelete(item.id)
                    }}
                  >
                    {t("item.action.delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [directorySlug, onDelete, t]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        {toolbarActions ? <div className="ml-auto flex items-center gap-2">{toolbarActions}</div> : null}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.column.id === "actions" ? "w-12 text-right" : undefined}
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
                <TableCell colSpan={columns.length} className="h-48">
                  <div className="flex items-center justify-center">
                    <Spinner className="h-6 w-6" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.id === "actions" ? "w-12 text-right" : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="mx-auto max-w-md py-6">
                    <EmptyBlock title={t("table.directory.no-results")} description={t("table.directory.no-results.description")} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

