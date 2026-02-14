"use client"

import * as React from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { Pencil } from "lucide-react"

import type { Solution } from "@/@types/solution"
import { BaseObjectList } from "@/components/shared/base-object/base-object-list"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import { formatDateTime } from "@/lib/datetime/format-date-time"
import {
  useCreateSolutionMutation,
  useGetSolutionsQuery,
} from "@/store/apis/solution-api"
import { Button } from "@/components/ui/button"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"

export function ListPage() {
  const { t } = useTranslate()
  const [createItem, createState] = useCreateSolutionMutation()

  const columns = React.useMemo<ColumnDef<Solution>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: () => <ArchimateObjectIcon type="solution" className="text-foreground opacity-80" />,
      },
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => (
          <Link
            href={`/solutions/${row.original.id}`}
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
              <Button asChild size="icon" variant="ghost" aria-label={t("action.edit")}>
                <Link href={`/solutions/${item.id}`}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">{t("action.edit")}</span>
                </Link>
              </Button>
            </div>
          )
        },
      },
    ],
    [t]
  )

  return (
    <BaseObjectList<Solution>
      titleKey="solution.solutions"
      tableId="solution"
      columns={columns}
      useListQuery={useGetSolutionsQuery as any}
      create={{
        isLoading: createState.isLoading,
        onCreate: async (values: BaseObjectValues) => {
          const code = values.code.trim()
          await createItem({
            input: {
              ...(code ? { code } : {}),
              name: values.name,
              description: values.description.trim() ? values.description.trim() : undefined,
              context: "",
              decision: "",
              consequences: "",
              alternatives: "",
            },
          }).unwrap()
        },
        requireCode: false,
      }}
      empty={{
        titleKey: "table.solutions.no-results",
        descriptionKey: "table.solutions.no-results.description",
      }}
    />
  )
}
