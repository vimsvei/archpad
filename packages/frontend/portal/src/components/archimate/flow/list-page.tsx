"use client"

import * as React from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { Pencil, RefreshCcw } from "lucide-react"
import type { FlowLayerFilter } from "@/services/flow.rest"
import type { FlowListItem } from "@/@types/flow"
import { useGetFlowsQuery } from "@/store/apis/flow-api"
import { EntityListPageShell, type PageSizeOption } from "@/components/common/entity-list-page-shell"
import { EntityDataTable } from "@/components/common/entity-data-table"
import { EntityColumnsMenu } from "@/components/common/entity-columns-menu"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import { usePersistedColumnVisibility } from "@/hooks/use-persisted-column-visibility"
import { formatDateTime } from "@/lib/datetime/format-date-time"

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, value])
  return debounced
}

export function ListPage() {
  const { t } = useTranslate()

  const [search, setSearch] = React.useState("")
  const [layer, setLayer] = React.useState<FlowLayerFilter>("application")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState<PageSizeOption>(25)
  const debouncedSearch = useDebouncedValue(search, 300)

  React.useEffect(() => {
    setPage(1)
  }, [layer, debouncedSearch, pageSize])

  const { data, error, refetch, isLoading, isFetching } = useGetFlowsQuery({
    layer,
    search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    page,
    pageSize,
  })

  const columns = React.useMemo<ColumnDef<FlowListItem>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: ({ row }) => (
          <ArchimateObjectIcon
            type={row.original.flowType === "application" ? "application-flow" : "technology-flow"}
            className="text-foreground opacity-80"
          />
        ),
      },
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => (
          <Link
            href={`/flows/${row.original.id}`}
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
        id: "flowType",
        header: t("flow.type"),
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.flowType === "application"
              ? t("flow.application")
              : t("flow.technology")}
          </span>
        ),
      },
      {
        id: "source",
        header: t("flow.source"),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.source?.name ?? "—"}
          </span>
        ),
      },
      {
        id: "target",
        header: t("flow.target"),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.target?.name ?? "—"}
          </span>
        ),
      },
      {
        id: "environment",
        header: t("flow.environment"),
        cell: ({ row }) => {
          if (!row.original.environment) {
            return <span className="text-muted-foreground text-sm">—</span>
          }
          return (
            <span className="text-sm">
              {t(`flow.environment.${row.original.environment}`)}
            </span>
          )
        },
      },
      {
        accessorKey: "description",
        header: t("table.description"),
        cell: ({ row }) => {
          const value = row.original.description
          return value ? (
            <div className="text-muted-foreground text-sm max-w-[360px] whitespace-normal break-words line-clamp-2">
              {value}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )
        },
      },
      {
        id: "created",
        header: t("table.created"),
        cell: ({ row }) => {
          const at = formatDateTime(row.original.createdAt)
          const by = row.original.createdBy ?? null
          if (!at && !by) return null
          return (
            <div className="flex flex-col leading-snug">
              {at ? <div className="text-sm">{at}</div> : null}
              {by ? <div className="text-muted-foreground text-xs">{by}</div> : null}
            </div>
          )
        },
      },
      {
        id: "updated",
        header: t("table.updated"),
        cell: ({ row }) => {
          const at = formatDateTime(row.original.updatedAt)
          const by = row.original.updatedBy ?? null
          if (!at && !by) return null
          return (
            <div className="flex flex-col leading-snug">
              {at ? <div className="text-sm">{at}</div> : null}
              {by ? <div className="text-muted-foreground text-xs">{by}</div> : null}
            </div>
          )
        },
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        header: () => null,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button asChild size="icon" variant="ghost" aria-label={t("action.edit")}>
              <Link href={`/flows/${row.original.id}`}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">{t("action.edit")}</span>
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [t]
  )

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(
    "flows",
    {
      created: false,
      updated: false,
      environment: layer === "application" ? false : true,
    }
  )

  const items = data?.items ?? []
  const pageCount = data?.pageCount ?? 1

  return (
    <EntityListPageShell
      title={t("portfolio.flows")}
      search={{
        value: search,
        placeholder: t("table.filter"),
        onChange: setSearch,
      }}
      actions={(
        <>
          <Button
            variant={layer === "application" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayer("application")}
          >
            {t("flow.application")}
          </Button>
          <Button
            variant={layer === "technology" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayer("technology")}
          >
            {t("flow.technology")}
          </Button>

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
              <EntityColumnsMenu<FlowListItem>
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
                ariaLabel={t("table.columns")}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("table.columns")}</TooltipContent>
          </Tooltip>
        </>
      )}
      table={(
        <>
          <EntityDataTable
            tableId="flows"
            data={items}
            columns={columns}
            loading={isLoading || isFetching}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            emptyTitle={t("table.flows.no-results")}
            emptyDescription={t("table.flows.no-results.description")}
            className="flex min-h-0 flex-1 flex-col"
            maxHeightClassName="min-h-0 flex-1"
          />
          {error ? (
            <div className="text-destructive mt-2 text-sm">
              {(error as any)?.message ?? t("action.load.failed")}
            </div>
          ) : null}
        </>
      )}
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

