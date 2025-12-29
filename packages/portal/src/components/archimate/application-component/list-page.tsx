"use client"

import * as React from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { MoreHorizontal } from "lucide-react"

import type { ApplicationComponent } from "@/@types/application-component"
import { BaseObjectList } from "@/components/shared/base-object/base-object-list"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useCreateApplicationComponentMutation,
  useGetApplicationComponentsQuery,
} from "@/store/apis/application-component-api"
import { Badge } from "@/components/ui/badge"
import { ArchimateObjectIcon } from "@/components/shared/base-object/archimate-object-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ListPage() {
  const { t } = useTranslate()
  const [createItem, createState] = useCreateApplicationComponentMutation()

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

  const columns = React.useMemo<ColumnDef<ApplicationComponent>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: () => <ArchimateObjectIcon type="application-component" className="text-foreground opacity-80" />,
      },
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
            <div className="text-muted-foreground text-sm max-w-[400px] whitespace-normal break-words line-clamp-2">
              {v}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )
        },
      },
      {
        id: "state",
        header: t("table.state"),
        cell: ({ row }) => {
          const st = row.original.state
          if (!st?.name) return null
          return (
            <Badge style={st.color ? { backgroundColor: st.color } : undefined}>
              {st.name}
            </Badge>
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
                    <Link href={`/application/components/${item.id}`}>{t("action.edit")}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [formatDateTime, t]
  )

  return (
    <BaseObjectList<ApplicationComponent>
      titleKey="application.components"
      tableId="application-component"
      columns={columns}
      useListQuery={useGetApplicationComponentsQuery as any}
      create={{
        isLoading: createState.isLoading,
        onCreate: async (values: BaseObjectValues) => {
          const code = values.code.trim()
          await createItem({
            input: {
              ...(code ? { code } : {}),
              name: values.name,
              description: values.description.trim() ? values.description.trim() : undefined,
            },
          }).unwrap()
        },
        requireCode: false,
      }}
      empty={{
        titleKey: "table.components.no-results",
        descriptionKey: "table.components.no-results.description",
      }}
    />
  )
}


