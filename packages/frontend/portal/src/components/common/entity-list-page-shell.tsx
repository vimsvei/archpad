"use client"

import * as React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type PageSizeOption = 10 | 25 | 50 | 100

export type EntityListPageShellProps = {
  title: React.ReactNode

  search: {
    value: string
    placeholder?: string
    onChange: (value: string) => void
  }

  actions?: React.ReactNode

  create?: {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: React.ReactNode
    description?: React.ReactNode
    content: React.ReactNode
  }

  table: React.ReactNode

  pagination: {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
    pageSize: PageSizeOption
    onPageSizeChange: (size: PageSizeOption) => void
    pageSizeLabel: React.ReactNode
  }
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

export function EntityListPageShell(props: EntityListPageShellProps) {
  const { title, search, actions, create, table, pagination } = props
  const pageCountSafe = Math.max(1, pagination.pageCount || 1)

  const content = (
    <Card className="flex min-h-0 min-w-0 flex-1 flex-col px-6 h-full">
      <div className="flex flex-wrap items-center gap-2 py-2 flex-shrink-0">
        <Input
          placeholder={search.placeholder ?? "Filter by name..."}
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          className="max-w-sm"
        />
        {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {table}
      </div>

      <div className="mt-4 flex items-center justify-end gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground text-sm whitespace-nowrap">
              {pagination.pageSizeLabel}
            </div>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(v) => pagination.onPageSizeChange(Number(v) as PageSizeOption)}
            >
              <SelectTrigger size="sm" className="w-[90px] justify-between">
                <SelectValue placeholder={String(pagination.pageSize)} />
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
                    pagination.onPageChange(Math.max(1, pagination.page - 1))
                  }}
                  aria-disabled={pagination.page <= 1}
                  className={pagination.page <= 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>

              {getPaginationItems(pagination.page, pageCountSafe).map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`e-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === pagination.page}
                      onClick={(e) => {
                        e.preventDefault()
                        pagination.onPageChange(p)
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
                    pagination.onPageChange(Math.min(pageCountSafe, pagination.page + 1))
                  }}
                  aria-disabled={pagination.page >= pageCountSafe}
                  className={
                    pagination.page >= pageCountSafe ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 h-full">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </div>

      {create ? (
        <Sheet open={create.open} onOpenChange={create.onOpenChange}>
          {content}
          <SheetContent side="right" className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{create.title}</SheetTitle>
              {create.description ? <SheetDescription>{create.description}</SheetDescription> : null}
            </SheetHeader>
            <div className="px-4 pb-4">{create.content}</div>
          </SheetContent>
        </Sheet>
      ) : (
        content
      )}
    </div>
  )
}

