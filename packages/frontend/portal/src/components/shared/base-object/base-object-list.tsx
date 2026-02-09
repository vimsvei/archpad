"use client"

import * as React from "react"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SheetTrigger } from "@/components/ui/sheet"

import { EntityListPageShell, type PageSizeOption } from "@/components/common/entity-list-page-shell"
import { EntityDataTable } from "@/components/common/entity-data-table"
import { EntityColumnsMenu } from "@/components/common/entity-columns-menu"
import { usePersistedColumnVisibility } from "@/components/common/use-persisted-column-visibility"

import { BaseObjectNewItem } from "./base-object-new-item"
import type { BaseObject, BaseObjectValues } from "./base-object-types"

type ListQueryResult<T> = {
  data?: { items: T[]; pageCount: number } | undefined
  error?: unknown
  refetch: () => any
  isLoading: boolean
  isFetching: boolean
}

type BaseObjectListProps<TItem extends BaseObject> = {
  titleKey: string
  tableId: string
  columns: ColumnDef<TItem, any>[]
  /**
   * Must be an RTK Query hook (or compatible) that supports args {search,page,pageSize}.
   */
  useListQuery: (args: {
    search?: string
    page: number
    pageSize: number
  }) => ListQueryResult<TItem>
  create: {
    isLoading: boolean
    onCreate: (values: BaseObjectValues) => Promise<void>
    requireCode?: boolean
  }
  empty: {
    titleKey: string
    descriptionKey: string
  }
  initialColumnVisibility?: import("@tanstack/react-table").VisibilityState
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

export function BaseObjectList<TItem extends BaseObject>(props: BaseObjectListProps<TItem>) {
  const { t } = useTranslate()
  const { titleKey, tableId, columns, useListQuery, create, empty, initialColumnVisibility } = props

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, 300)

  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState<PageSizeOption>(25)

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  React.useEffect(() => {
    setPage(1)
  }, [debouncedSearch, pageSize])

  // Clear selection when the page or filter changes (data set changes).
  React.useEffect(() => {
    setRowSelection({})
  }, [debouncedSearch, page, pageSize])

  // Hide created/updated by default for list pages (can be enabled via Columns menu).
  // If the user already has a persisted visibility state, it will take precedence.
  const effectiveInitialColumnVisibility = React.useMemo(
    () => ({
      created: false,
      updated: false,
      ...(initialColumnVisibility ?? {}),
    }),
    [initialColumnVisibility]
  )

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(
    tableId,
    effectiveInitialColumnVisibility
  )

  const { data, error, refetch, isLoading, isFetching } = useListQuery({
    search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    page,
    pageSize,
  })

  const items = (data as any)?.items ?? []
  const pageCount = (data as any)?.pageCount ?? 1

  const selectionColumn = React.useMemo<ColumnDef<TItem>>(
    () => ({
      id: "select",
      enableHiding: false,
      enableSorting: false,
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            aria-label={t("table.select.all")}
            checked={
              table.getIsAllRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(Boolean(value))}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            aria-label={t("table.select.row")}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          />
        </div>
      ),
    }),
    [t]
  )

  const columnsWithSelection = React.useMemo(
    () => [selectionColumn, ...columns],
    [selectionColumn, columns]
  )

  return (
    <EntityListPageShell
      title={t(titleKey)}
      search={{
        value: search,
        placeholder: t("table.filter"),
        onChange: setSearch,
      }}
      actions={
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label={t("action.refresh")}
                onClick={() => void refetch()}
                disabled={isFetching}
              >
                <RefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.refresh")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <EntityColumnsMenu<TItem>
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
                ariaLabel={t("table.columns")}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("table.columns")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button size="icon" aria-label={t("action.create")}>
                  <Plus />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.create")}</TooltipContent>
          </Tooltip>
        </>
      }
      create={{
        open,
        onOpenChange: setOpen,
        title: t("action.create"),
        description: t(titleKey),
        content: (
          <BaseObjectNewItem
            submitLabel={t("action.create")}
            requireCode={create.requireCode}
            disabled={create.isLoading}
            onSubmit={async (values) => {
              try {
                setOpen(false)
                await create.onCreate(values)
                toast.success(t("action.created"))
              } catch (e: any) {
                toast.error(e?.message ?? t("action.create.failed"))
              } finally {
                void refetch()
              }
            }}
            onCancel={() => setOpen(false)}
          />
        ),
      }}
      table={
        <>
          <EntityDataTable
            tableId={tableId}
            data={items}
            columns={columnsWithSelection}
            loading={isLoading || isFetching}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            enableRowSelection={true}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            getRowId={(row: any) => row.id}
            emptyTitle={t(empty.titleKey)}
            emptyDescription={t(empty.descriptionKey)}
            className="flex min-h-0 flex-1 flex-col"
            maxHeightClassName="min-h-0 flex-1"
          />
          {error ? (
            <div className="text-destructive mt-2 text-sm">
              {(error as any)?.message ?? t("action.load.failed")}
            </div>
          ) : null}
        </>
      }
      pagination={{
        page,
        pageCount,
        onPageChange: setPage,
        pageSize,
        onPageSizeChange: setPageSize,
        pageSizeLabel: t("table.page.size"),
      }}
    />
  )
}


