"use client"

import * as React from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslate } from "@tolgee/react"
import { Pencil } from "lucide-react"
import { BaseObjectList } from "@/components/shared/base-object/base-object-list"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"
import type {
  CreateNamedObjectInput,
  NamedObjectRecord,
} from "@/components/shared/archimate/named-object-types"
import { formatDateTime } from "@/lib/datetime/format-date-time"
import { Button } from "@/components/ui/button"

type ListQueryResult<TItem> = {
  data?: {
    items: TItem[]
    pageCount: number
  }
  error?: unknown
  refetch: () => unknown
  isLoading: boolean
  isFetching: boolean
}

type CreateMutationResult = {
  isLoading: boolean
}

type CreateMutationTrigger = (args: { input: CreateNamedObjectInput }) => {
  unwrap: () => Promise<unknown>
}

type NamedObjectListPageProps<TItem extends NamedObjectRecord> = {
  titleKey: string
  tableId: string
  iconType: ArchimateObjectIconType
  editPathPrefix: string
  emptyTitleKey: string
  emptyDescriptionKey: string
  useListQuery: (args: {
    search?: string
    page: number
    pageSize: number
  }) => ListQueryResult<TItem>
  useCreateMutation: () => [CreateMutationTrigger, CreateMutationResult]
}

export function NamedObjectListPage<TItem extends NamedObjectRecord>({
  titleKey,
  tableId,
  iconType,
  editPathPrefix,
  emptyTitleKey,
  emptyDescriptionKey,
  useListQuery,
  useCreateMutation,
}: NamedObjectListPageProps<TItem>) {
  const { t } = useTranslate()
  const [createItem, createState] = useCreateMutation()

  const columns = React.useMemo<ColumnDef<TItem>[]>(
    () => [
      {
        id: "icon",
        header: "",
        enableHiding: false,
        cell: () => <ArchimateObjectIcon type={iconType} className="text-foreground opacity-80" />,
      },
      {
        accessorKey: "code",
        header: t("table.code"),
        cell: ({ row }) => (
          <Link
            href={`${editPathPrefix}/${row.original.id}`}
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
          const value = row.original.description
          return value ? (
            <div className="text-muted-foreground text-sm max-w-[400px] whitespace-normal break-words line-clamp-2">
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
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex justify-end">
              <Button asChild size="icon" variant="ghost" aria-label={t("action.edit")}>
                <Link href={`${editPathPrefix}/${item.id}`}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">{t("action.edit")}</span>
                </Link>
              </Button>
            </div>
          )
        },
      },
    ],
    [editPathPrefix, iconType, t]
  )

  return (
    <BaseObjectList<TItem>
      titleKey={titleKey}
      tableId={tableId}
      columns={columns}
      useListQuery={useListQuery}
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
        titleKey: emptyTitleKey,
        descriptionKey: emptyDescriptionKey,
      }}
    />
  )
}
