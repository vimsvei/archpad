"use client"

import * as React from "react"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
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
  const { titleKey, tableId, columns, useListQuery, create, empty } = props

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, 300)

  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState<PageSizeOption>(25)

  React.useEffect(() => {
    setPage(1)
  }, [debouncedSearch, pageSize])

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(tableId)

  const { data, error, refetch, isLoading, isFetching } = useListQuery({
    search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    page,
    pageSize,
  })

  const items = (data as any)?.items ?? []
  const pageCount = (data as any)?.pageCount ?? 1

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  return (
    <EntityListPageShell
      title={t(titleKey)}
      search={{
        value: search,
        placeholder: tr("table.filter", "Filter..."),
        onChange: setSearch,
      }}
      actions={
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label={tr("action.refresh", "Refresh")}
                onClick={() => void refetch()}
                disabled={isFetching}
              >
                <RefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.refresh", "Refresh")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <EntityColumnsMenu<TItem>
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
                ariaLabel={tr("table.columns", "Columns")}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("table.columns", "Columns")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button size="icon" aria-label={tr("action.create", "Create")}>
                  <Plus />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.create", "Create")}</TooltipContent>
          </Tooltip>
        </>
      }
      create={{
        open,
        onOpenChange: setOpen,
        title: tr("action.create", "Create"),
        description: t(titleKey),
        content: (
          <BaseObjectNewItem
            submitLabel={tr("action.create", "Create")}
            requireCode={create.requireCode}
            disabled={create.isLoading}
            onSubmit={async (values) => {
              try {
                setOpen(false)
                await create.onCreate(values)
                toast.success(tr("action.created", "Created"))
              } catch (e: any) {
                toast.error(e?.message ?? tr("action.createFailed", "Failed to create"))
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
            columns={columns}
            loading={isLoading || isFetching}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            emptyTitle={t(empty.titleKey)}
            emptyDescription={t(empty.descriptionKey)}
            className="flex min-h-0 flex-1 flex-col"
            maxHeightClassName="min-h-0 flex-1"
          />
          {error ? (
            <div className="text-destructive mt-2 text-sm">
              {(error as any)?.message ?? tr("action.loadFailed", "Failed to load")}
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
        pageSizeLabel: tr("table.page.size", "Rows per page"),
      }}
    />
  )
}


