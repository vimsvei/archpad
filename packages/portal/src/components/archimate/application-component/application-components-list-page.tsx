"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"
import type { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ApplicationComponentForm } from "@/components/archimate/application-component/application-component-form"
import {
  useCreateApplicationComponentMutation,
  useGetApplicationComponentsQuery,
} from "@/store/apis/application-component-api"
import { EntityDataTable } from "@/components/common/entity-data-table"
import type { ApplicationComponent } from "@/@types/application-component"
import { EntityListPageShell, type PageSizeOption } from "@/components/common/entity-list-page-shell"
import { SheetTrigger } from "@/components/ui/sheet"
import { EntityColumnsMenu } from "@/components/common/entity-columns-menu"
import { usePersistedColumnVisibility } from "@/components/common/use-persisted-column-visibility"

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

export function ApplicationComponentsListPage() {
  const { t } = useTranslate()
  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, 300)

  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState<PageSizeOption>(25)

  React.useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  React.useEffect(() => {
    setPage(1)
  }, [pageSize])

  const {
    data,
    error,
    refetch,
    isLoading,
    isFetching,
  } = useGetApplicationComponentsQuery({
    search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    page,
    pageSize,
  })

  const [createItem, createState] = useCreateApplicationComponentMutation()

  const items = data?.items ?? []
  const pageCount = data?.pageCount ?? 1

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(
    "application-component"
  )

  const columns = React.useMemo<ColumnDef<ApplicationComponent>[]>(
    () => [
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => (
          <Link
            href={`/application/components/${row.original.id}`}
            className="font-mono text-sm text-primary underline-offset-4 hover:underline"
          >
            {row.original.code}
          </Link>
        ),
      },
      {
        accessorKey: "name",
        header: t("table.name"),
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
      },
      {
        accessorKey: "description",
        header: t("table.description"),
        cell: ({ row }) => {
          const v = row.original.description
          return v ? (
            <div className="text-muted-foreground line-clamp-2 text-sm">{v}</div>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )
        },
      },
    ],
    [t]
  )

  return (
    <EntityListPageShell
      title={t("application.component")}
      search={{
        value: search,
        placeholder: "Filter by name...",
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
              <EntityColumnsMenu<ApplicationComponent>
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
                ariaLabel={tr("table.columns", "Columns")}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("table.columns", "Columns")}</TooltipContent>
          </Tooltip>

          {/*
            SheetTrigger must live inside <Sheet>. EntityListPageShell wraps content in <Sheet>,
            so we pass trigger via actions slot.
          */}
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
        description: t("application.component"),
        content: (
          <ApplicationComponentForm
            submitLabel={tr("action.create", "Create")}
            disabled={createState.isLoading}
            onSubmit={async (values) => {
              try {
                setOpen(false)
                await createItem({
                  input: {
                    code: values.code.trim(),
                    name: values.name.trim(),
                    description: values.description.trim() ? values.description.trim() : undefined,
                  },
                }).unwrap()
                toast.success(tr("application.component.created", "Created"))
              } catch (e: any) {
                toast.error(e?.message ?? "Failed to create")
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
            tableId="application-components"
            data={items}
            columns={columns}
            loading={isLoading || isFetching}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            emptyTitle={tr("table.components.no-results", "No results")}
            emptyDescription={tr(
              "table.components.no-results.description",
              "No components match your filters."
            )}
            className="flex min-h-0 flex-1 flex-col"
            maxHeightClassName="min-h-0 flex-1"
          />
          {error ? (
            <div className="text-destructive mt-2 text-sm">
              {(error as any)?.message ?? "Failed to load application components"}
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


