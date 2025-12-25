"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { MoreHorizontal, Plus, RefreshCw, Grid2x2Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Icon, type IconType } from "./icon-mapping"

export type RelatedItem = {
  id: string
  code: string
  name: string
  [key: string]: unknown
}

type RelatedItemsTableProps<T extends RelatedItem> = {
  title: string
  items: T[]
  isLoading?: boolean
  iconType?: IconType
  editPath?: (item: T) => string
  onRefresh?: () => void
  onAdd?: () => void
  onAddExisting?: () => void
  onDelete?: (item: T) => void
  additionalColumns?: ColumnDef<T>[]
}

export function RelatedItemsTable<T extends RelatedItem>({
  title,
  items,
  isLoading,
  iconType,
  editPath,
  onRefresh,
  onAdd,
  onAddExisting,
  onDelete,
  additionalColumns = [],
}: RelatedItemsTableProps<T>) {
  const { t } = useTranslate()

  const columns: ColumnDef<T>[] = React.useMemo(
    () => [
      ...(iconType
        ? [
            {
              id: "icon",
              header: () => null,
              cell: () => (
                <div className="flex items-center justify-center w-6 h-6">
                  <Icon iconType={iconType} className="w-5 h-5" />
                </div>
              ),
            } as ColumnDef<T>,
          ]
        : []),
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => {
          const href = editPath ? editPath(row.original) : undefined
          if (href) {
            return (
              <Link
                href={href}
                className="font-mono text-sm text-primary underline-offset-4 hover:underline"
              >
                {row.original.code}
              </Link>
            )
          }
          return <span className="font-mono text-sm">{row.original.code}</span>
        },
      },
      {
        accessorKey: "name",
        header: t("table.name"),
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
      },
      ...additionalColumns,
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        header: () => null,
        cell: ({ row }) => {
          const item = row.original
          const href = editPath ? editPath(item) : undefined
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
                  {href && (
                    <DropdownMenuItem asChild>
                      <Link href={href}>{t("action.edit")}</Link>
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(item)}>
                        {t("action.delete", "Delete")}
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [t, iconType, editPath, onDelete, additionalColumns]
  )

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
                aria-label={t("action.update", "Update")}
          >
            <RefreshCw className={isLoading ? "animate-spin" : ""} />
          </Button>
            </TooltipTrigger>
            <TooltipContent>{t("action.update", "Update")}</TooltipContent>
          </Tooltip>
          {onAddExisting && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onAddExisting}
                  aria-label={t("action.add", "Add")}
                >
                  <Grid2x2Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("action.add", "Add")}</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onAdd}
                aria-label={t("action.create", "Create")}
          >
            <Plus />
          </Button>
            </TooltipTrigger>
            <TooltipContent>{t("action.create", "Create")}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-6 pb-6">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const key = column.id || (column as any).accessorKey || ""
                return (
                  <TableHead key={key}>
                    {typeof column.header === "function"
                      ? column.header({} as any)
                      : column.header}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {t("table.no-results", "No results")}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => {
                    const key = column.id || (column as any).accessorKey || ""
                    let cellValue: React.ReactNode
                    if (column.cell) {
                      if (typeof column.cell === "function") {
                        cellValue = column.cell({ row: { original: item } } as any)
                      } else {
                        cellValue = column.cell
                      }
                    } else {
                      cellValue = (item as any)[(column as any).accessorKey || ""]
                    }
                    return (
                      <TableCell key={key}>
                        {cellValue}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

