"use client"

import * as React from "react"
import Link from "next/link"
import { MoreHorizontal, Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"

import type { DirectorySlug } from "@/@types/directories"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslate } from "@tolgee/react"
import {
  useDeleteDirectoryItemMutation,
  useGetDirectoryItemsQuery,
  useCreateDirectoryItemMutation,
} from "@/store/apis/directory-api"
import { SheetTrigger } from "@/components/ui/sheet"
import { EntityListPageShell, type PageSizeOption } from "@/components/common/entity-list-page-shell"
import { EntityDataTable } from "@/components/common/entity-data-table"
import { EntityColumnsMenu } from "@/components/common/entity-columns-menu"
import { usePersistedColumnVisibility } from "@/components/common/use-persisted-column-visibility"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DirectoryItem } from "@/@types/directories"

type DirectoryListPageProps = {
  directorySlug: DirectorySlug
}

export function DirectoryListPage({ directorySlug }: DirectoryListPageProps) {
  const { t } = useTranslate()
  const meta = getDirectoryMeta(directorySlug)
  const title = t(meta.titleKey)
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState<PageSizeOption>(25)

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const formatNowWithTz = React.useCallback(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }).format(new Date())
    } catch {
      return new Date().toString()
    }
  }, [])

  const formatDateTime = React.useCallback((iso?: string | null) => {
    if (!iso) return null
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(iso))
    } catch {
      return iso
    }
  }, [])

  const {
    data: remoteItems,
    error: remoteError,
    refetch,
    isLoading,
    isFetching,
  } = useGetDirectoryItemsQuery(directorySlug)

  const [createItem, createState] = useCreateDirectoryItemMutation()
  const [deleteItem] = useDeleteDirectoryItemMutation()

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(
    `directory:${directorySlug}`
  )

  const itemsAll = remoteItems ?? []
  const normalizedSearch = search.trim().toLowerCase()

  const filtered = React.useMemo(() => {
    if (!normalizedSearch) return itemsAll
    return itemsAll.filter((it) => (it.name ?? "").toLowerCase().includes(normalizedSearch))
  }, [itemsAll, normalizedSearch])

  React.useEffect(() => {
    setPage(1)
  }, [normalizedSearch, pageSize])

  const total = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, pageCount)
  const pageStart = (safePage - 1) * pageSize
  const pageItems = filtered.slice(pageStart, pageStart + pageSize)

  const columns = React.useMemo<ColumnDef<DirectoryItem>[]>(
    () => [
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => {
          const item = row.original
          const code = String(item.code ?? "").trim()
          const href = `/directories/${directorySlug}/${item.id}`
          return (
            <Link
              href={href}
              className={[
                "font-mono text-sm",
                "text-primary underline-offset-4 hover:underline",
                !code ? "text-muted-foreground" : "",
              ].join(" ")}
            >
              {code || "—"}
            </Link>
          )
        },
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
            <div className="text-muted-foreground text-sm max-w-[400px] whitespace-normal break-words line-clamp-2">
              {v}
            </div>
          ) : null
        },
      },
      {
        accessorKey: "color",
        header: t("table.color"),
        cell: ({ row }) => {
          const c = row.original.color
          if (!c) return <span className="text-muted-foreground text-sm">—</span>
          return (
            <div className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full border" style={{ backgroundColor: c }} />
              <span className="font-mono text-xs">{c}</span>
            </div>
          )
        },
      },
      {
        accessorKey: "byDefault",
        header: t("table.by-default"),
        cell: ({ row }) => {
          const v = Boolean(row.original.byDefault)
          return (
            <div className="flex items-center justify-center">
              <Checkbox checked={v} disabled aria-label={t("table.by-default")} />
            </div>
          )
        },
      },
      {
        id: "created",
        header: t("table.created"),
        cell: ({ row }) => {
          const at = formatDateTime(row.original.created?.at)
          const by = row.original.created?.by ?? null
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
          const at = formatDateTime(row.original.updated?.at)
          const by = row.original.updated?.by ?? null
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
                    <Link href={`/directories/${directorySlug}/${item.id}`}>{t("item.action.edit")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => {
                      e.preventDefault()
                      const ok = window.confirm("Delete this item?")
                      if (!ok) return
                      void (async () => {
                        try {
                          await deleteItem({ slug: directorySlug, id: item.id }).unwrap()
                          toast.success("Deleted")
                        } catch (err: any) {
                          toast.error(err?.message ?? "Failed to delete")
                        }
                      })()
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
    [deleteItem, directorySlug, formatDateTime, t]
  )

  return (
    <EntityListPageShell
      title={title}
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
              <EntityColumnsMenu<DirectoryItem>
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
        title: t("create.item"),
        description: title,
        content: (
          <DirectoryItemForm
            i18nPrefix="item"
            submitLabel={t("action.create")}
            disabled={createState.isLoading}
            onSubmit={async (values) => {
              try {
                setOpen(false)
                await createItem({
                  slug: directorySlug,
                  input: {
                    ...values,
                    code: values.code ? values.code : undefined,
                  },
                }).unwrap()
                toast.success(`${tr("directory.item.created", "Created")} ${title}`, {
                  description: formatNowWithTz(),
                  className:
                    "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-50",
                })
              } catch (e: any) {
                setOpen(false)
                toast.error(
                  `${tr("directory.item.error", tr("ditectory.item.error", "Error"))} ${title}`,
                  {
                    className:
                      "border-red-600 bg-red-50 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-50",
                  }
                )
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
            tableId={`directory:${directorySlug}`}
            data={pageItems}
            columns={columns}
            loading={isLoading || isFetching}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            emptyTitle={t("table.directory.no-results")}
            emptyDescription={t("table.directory.no-results.description")}
            className="flex min-h-0 flex-1 flex-col"
            maxHeightClassName="min-h-0 flex-1"
          />
          {remoteError ? (
            <div className="text-destructive mt-2 text-sm">
              {(remoteError as any)?.message ?? "Failed to load directory items"}
            </div>
          ) : null}
        </>
      }
      pagination={{
        page: safePage,
        pageCount,
        onPageChange: setPage,
        pageSize,
        onPageSizeChange: setPageSize,
        pageSizeLabel: tr("table.page.size", "Rows per page"),
      }}
    />
  )
}

