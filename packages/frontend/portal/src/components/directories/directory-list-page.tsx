"use client"

import * as React from "react"
import Link from "next/link"
import { Edit, LibraryBig, Plus, RefreshCcw, Trash2, Upload } from "lucide-react"
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
import {
  useDeleteDirectoryItemMutation,
  useCreateDirectoryItemMutation,
  useBulkCreateDirectoryItemsMutation,
  useBulkUpsertDirectoryItemsMutation,
  useBulkCreateDirectoryLinksMutation,
} from "@/store/apis/directory-api"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { SheetTrigger } from "@/components/ui/sheet"
import { EntityListPageShell, type PageSizeOption } from "@/components/common/entity-list-page-shell"
import { EntityDataTable } from "@/components/common/entity-data-table"
import { EntityColumnsMenu } from "@/components/common/entity-columns-menu"
import { usePersistedColumnVisibility } from "@/hooks/use-persisted-column-visibility"
import { Checkbox } from "@/components/ui/checkbox"
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

  // Memoize translations used in columns to prevent recreation
  const translations = React.useMemo(
    () => ({
      code: t("table.code"),
      name: t("table.name"),
      description: t("table.description"),
      color: t("table.color"),
      byDefault: t("table.by-default"),
      actions: t("table.item.actions"),
      edit: t("action.edit"),
      delete: t("action.delete"),
    }),
    [t]
  )

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
  const [_bulkCreateItems, bulkCreateState] = useBulkCreateDirectoryItemsMutation()
  const [bulkUpsertItems, bulkUpsertState] = useBulkUpsertDirectoryItemsMutation()
  const [bulkCreateLinks] = useBulkCreateDirectoryLinksMutation()

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = React.useState(false)

  const { columnVisibility, setColumnVisibility } = usePersistedColumnVisibility(
    `directory:${directorySlug}`
  )

  const itemsAll = React.useMemo(() => remoteItems ?? [], [remoteItems])
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
    [bulkCreateLinks, bulkUpsertItems, directorySlug, formatNowWithTz, handleRefetch]
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
        header: translations.code,
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
        header: translations.name,
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
      },
      {
        accessorKey: "description",
        header: translations.description,
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
        header: translations.color,
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
        header: translations.byDefault,
        cell: ({ row }) => {
          const v = Boolean(row.original.byDefault)
          return (
            <div className="flex items-center justify-center">
              <Checkbox checked={v} disabled aria-label={translations.byDefault} />
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
          const editUrl = `/directories/${directorySlug}/${item.id}`
          const handleDelete = async (e: React.MouseEvent) => {
            e.preventDefault()
            const ok = window.confirm("Delete this item?")
            if (!ok) return
            try {
              await deleteItem({ slug: directorySlug, id: item.id }).unwrap()
              toast.success("Deleted")
              void handleRefetch()
            } catch (err: any) {
              toast.error(err?.message ?? "Failed to delete")
            }
          }
          return (
            <div className="flex items-center justify-end gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={editUrl}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{translations.edit}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{translations.delete}</TooltipContent>
              </Tooltip>
            </div>
          )
        },
      },
    ],
    [deleteItem, directorySlug, translations, handleRefetch]
  )

  return (
    <EntityListPageShell
      title={title}
      search={{
        value: search,
        placeholder: t("table.filter"),
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
                aria-label={t("action.refresh")}
                onClick={() => void handleRefetch()}
                disabled={isFetching}
              >
                <RefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.refresh")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label={t("action.upload")}
                onClick={handleUploadClick}
                disabled={isImporting || bulkCreateState.isLoading || bulkUpsertState.isLoading}
              >
                <Upload />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.upload")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <EntityColumnsMenu<DirectoryItem>
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
                toast.success(`${t("directory.item.created")} ${title}`, {
                  description: formatNowWithTz(),
                  className:
                    "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-50",
                })
              } catch (_e: any) {
                setOpen(false)
                toast.error(
                  `${t("directory.item.error")} ${title}`,
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
        pageSizeLabel: t("table.page.size"),
      }}
    />
  )
}
