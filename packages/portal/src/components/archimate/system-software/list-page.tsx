"use client"

import * as React from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { MoreHorizontal } from "lucide-react"

import type { SystemSoftware } from "@/@types/system-software"
import { BaseObjectList } from "@/components/shared/base-object/base-object-list"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useCreateSystemSoftwareMutation,
  useGetSystemSoftwareQuery,
} from "@/store/apis/system-software-api"
import { Badge } from "@/components/ui/badge"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"
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
  const [createItem, createState] = useCreateSystemSoftwareMutation()

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

  const columns = React.useMemo<ColumnDef<SystemSoftware>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: () => <ArchimateObjectIcon type="system-software" className="text-foreground opacity-80" />,
      },
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => (
          <Link
            href={`/technologies/system-software/${row.original.id}`}
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
        accessorKey: "version",
        header: t("table.version"),
        cell: ({ row }) => {
          const v = row.original.version
          return v ? (
            <div className="text-sm">{v}</div>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )
        },
      },
      {
        accessorKey: "type",
        header: t("table.software.type"),
        cell: ({ row }) => {
          const type = row.original.type
          return type ? (
            <div className="text-sm">{type.name}</div>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )
        },
      },
      {
        accessorKey: "license",
        header: t("table.license.type"),
        cell: ({ row }) => {
          const license = row.original.license
          return license ? (
            <div className="text-sm">{license.name}</div>
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
                    <Link href={`/technologies/system-software/${item.id}`}>{t("action.edit")}</Link>
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
    <BaseObjectList<SystemSoftware>
      titleKey="technologies.system-software"
      tableId="system-software"
      columns={columns}
      useListQuery={useGetSystemSoftwareQuery as any}
      initialColumnVisibility={{
        created: false,
        updated: false,
      }}
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
        titleKey: "table.software.no-results",
        descriptionKey: "table.software.no-results.description",
      }}
    />
  )
}

