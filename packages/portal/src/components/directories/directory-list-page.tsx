"use client"

import * as React from "react"
import Link from "next/link"
import { LibraryBig, MoreHorizontal, Plus, RefreshCcw, Upload } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"

import type { DirectorySlug } from "@/@types/directories"
import { DirectoryLinkType } from "@/@types/directory-link-type"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { parseDirectoryCSV } from "@/components/directories/parse-directory-csv"
import { parseDirectoryJSON } from "@/components/directories/parse-directory-json"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslate } from "@tolgee/react"
import { useTr } from "@/lib/i18n/use-tr"
import {
  useDeleteDirectoryItemMutation,
  useCreateDirectoryItemMutation,
  useBulkCreateDirectoryItemsMutation,
  useBulkUpsertDirectoryItemsMutation,
  useCreateDirectoryLinkMutation,
  useBulkCreateDirectoryLinksMutation,
} from "@/store/apis/directory-api"
import { useDirectoryItems } from "@/hooks/use-directory-items"
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

  const tr = useTr()

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

  // Get items from Redux store (preloaded on app start)
  // Auto-refresh when page is visited
  const { items: remoteItems, isLoading, refetch } = useDirectoryItems(directorySlug, {
    refreshOnMount: true, // Refresh when directory page is visited
    autoRefresh: true,
  })

  const [remoteError, setRemoteError] = React.useState<Error | null>(null)
  const isFetching = isLoading

  // Wrap refetch to handle errors
  const handleRefetch = React.useCallback(async () => {
    try {
      setRemoteError(null)
      await refetch()
    } catch (error) {
      setRemoteError(error as Error)
    }
  }, [refetch])

  const [createItem, createState] = useCreateDirectoryItemMutation()
  const [deleteItem] = useDeleteDirectoryItemMutation()
  const [bulkCreateItems, bulkCreateState] = useBulkCreateDirectoryItemsMutation()
  const [bulkUpsertItems, bulkUpsertState] = useBulkUpsertDirectoryItemsMutation()
  const [createLink] = useCreateDirectoryLinkMutation()
  const [bulkCreateLinks] = useBulkCreateDirectoryLinksMutation()

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = React.useState(false)

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

  const handleFileUpload = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const lower = file.name.toLowerCase()
      const isCsv = lower.endsWith(".csv")
      const isJson = lower.endsWith(".json")
      if (!isCsv && !isJson) {
        toast.error("Пожалуйста, выберите файл формата CSV или JSON")
        return
      }

      try {
        setIsImporting(true)
        const text = await file.text()
        const parsed = isCsv
          ? { inputs: parseDirectoryCSV(text), links: [] as Array<{ parentIndex: number; childIndex: number }> }
          : parseDirectoryJSON(text)

        if (parsed.inputs.length === 0) {
          toast.error("Файл не содержит данных для загрузки")
          return
        }

        // Idempotent import: create only missing by code where possible
        const created = await bulkUpsertItems({ slug: directorySlug, inputs: parsed.inputs }).unwrap()

        if (parsed.links.length > 0) {
          // Для JSON: создаём связи parent->child (иерархия) после создания записей.
          // Предполагаем, что порядок ответа совпадает с порядком входного массива.
          const linkInputs = parsed.links.map(({ parentIndex, childIndex }) => {
            const parent = created[parentIndex]!
            const child = created[childIndex]!
            // Prefer linking by code when available (matches JSON id_strategy=code and supports future linking to existing records)
            const sourceCode = parent.code?.trim() ? parent.code.trim() : undefined
            const targetCode = child.code?.trim() ? child.code.trim() : undefined
            return {
              ...(sourceCode ? { sourceCode } : { sourceId: parent.id }),
              ...(targetCode ? { targetCode } : { targetId: child.id }),
              type: DirectoryLinkType.HIERARCHY,
            }
          })
          await bulkCreateLinks({ slug: directorySlug, inputs: linkInputs }).unwrap()
        }

        toast.success(
          `Импорт завершён: создано/обновлено ${created.length}`,
          {
          description: formatNowWithTz(),
          className:
            "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-50",
          }
        )
        void handleRefetch()
      } catch (error: any) {
        toast.error("Ошибка при загрузке файла", {
          description: error?.message ?? "Не удалось загрузить данные из файла",
          className:
            "border-red-600 bg-red-50 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-50",
        })
      } finally {
        setIsImporting(false)
        // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    },
    [bulkCreateLinks, bulkUpsertItems, directorySlug, formatNowWithTz, refetch]
  )

  const handleUploadClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const columns = React.useMemo<ColumnDef<DirectoryItem>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: () => <LibraryBig className="text-foreground opacity-80 size-4" />,
      },
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
                    <Link href={`/directories/${directorySlug}/${item.id}`}>{t("action.edit")}</Link>
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
                    {t("action.delete")}
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
        placeholder: tr("table.filter"),
        onChange: setSearch,
      }}
      actions={
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,application/json,text/csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            aria-label="Загрузить из файла (CSV/JSON)"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label={tr("action.refresh")}
                onClick={() => void handleRefetch()}
                disabled={isFetching}
              >
                <RefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.refresh")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label={tr("action.upload")}
                onClick={handleUploadClick}
                disabled={isImporting || bulkCreateState.isLoading || bulkUpsertState.isLoading}
              >
                <Upload />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.upload")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <EntityColumnsMenu<DirectoryItem>
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
                ariaLabel={tr("table.columns")}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("table.columns")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button size="icon" aria-label={tr("action.create")}>
                  <Plus />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.create")}</TooltipContent>
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
                toast.success(`${tr("directory.item.created")} ${title}`, {
                  description: formatNowWithTz(),
                  className:
                    "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-50",
                })
              } catch (e: any) {
                setOpen(false)
                toast.error(
                  `${tr("directory.item.error", "Error")} ${title}`,
                  {
                    className:
                      "border-red-600 bg-red-50 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-50",
                  }
                )
              } finally {
                void handleRefetch()
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
            loading={
              isLoading || isFetching || bulkCreateState.isLoading || bulkUpsertState.isLoading || isImporting
            }
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            emptyTitle={t("table.directory.no-results")}
            emptyDescription={t("table.directory.no-results.description")}
            // Важно: ограничиваем высоту таблицы, чтобы скролл был ВНУТРИ,
            // а не растягивалась вся страница (особенно при pageSize=50/100).
            // `EntityDataTable` по умолчанию использует `max-h-[60vh]`,
            // поэтому для справочников не переопределяем maxHeightClassName.
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
        pageSizeLabel: tr("table.page.size"),
      }}
    />
  )
}

