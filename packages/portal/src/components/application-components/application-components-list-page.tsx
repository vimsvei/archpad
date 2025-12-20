"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyBlock } from "@/components/empty/empty"
import { ApplicationComponentForm } from "@/components/application-components/application-component-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useCreateApplicationComponentMutation,
  useGetApplicationComponentsQuery,
} from "@/store/apis/application-component-api"

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

function getPaginationItems(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const out: Array<number | "ellipsis"> = []
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  out.push(1)
  if (left > 2) out.push("ellipsis")
  for (let p = left; p <= right; p++) out.push(p)
  if (right < total - 1) out.push("ellipsis")
  out.push(total)

  return out
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
  const [pageSize, setPageSize] = React.useState<10 | 25 | 50 | 100>(25)

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{t("application.component")}</h1>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2 py-2">
            <Input
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />

            <div className="ml-auto flex items-center gap-2">
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
                  <SheetTrigger asChild>
                    <Button size="icon" aria-label={tr("action.create", "Create")}>
                      <Plus />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">{tr("action.create", "Create")}</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">{t("table.code")}</TableHead>
                  <TableHead>{t("table.name")}</TableHead>
                  <TableHead>{t("table.description")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading || isFetching ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-48">
                      <div className="flex items-center justify-center">
                        <Spinner className="h-6 w-6" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : items.length ? (
                  items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell>
                        <Link
                          href={`/application/components/${it.id}`}
                          className="font-mono text-sm text-primary underline-offset-4 hover:underline"
                        >
                          {it.code}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">{it.name}</TableCell>
                      <TableCell>
                        {it.description ? (
                          <div className="text-muted-foreground line-clamp-2 text-sm">
                            {it.description}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="mx-auto max-w-md py-6">
                        <EmptyBlock
                          title={tr("table.components.no-results", "No results")}
                          description={tr(
                            "table.components.no-results.description",
                            "No components match your filters."
                          )}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {error ? (
            <div className="text-destructive mt-2 text-sm">
              {(error as any)?.message ?? "Failed to load application components"}
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground text-sm whitespace-nowrap">
                  {tr("table.page.size", "Rows per page")}
                </div>
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => setPageSize(Number(v) as 10 | 25 | 50 | 100)}
                >
                  <SelectTrigger size="sm" className="w-[90px] justify-between">
                    <SelectValue placeholder={String(pageSize)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.max(1, p - 1))
                      }}
                      aria-disabled={page <= 1}
                      className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>

                  {getPaginationItems(page, pageCount).map((p, idx) =>
                    p === "ellipsis" ? (
                      <PaginationItem key={`e-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault()
                            setPage(p)
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.min(pageCount, p + 1))
                      }}
                      aria-disabled={page >= pageCount}
                      className={page >= pageCount ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Card>

        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{tr("action.create", "Create")}</SheetTitle>
            <SheetDescription>{t("application.component")}</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}


