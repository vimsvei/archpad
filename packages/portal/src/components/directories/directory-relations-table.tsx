"use client"

import * as React from "react"
import { Eraser, Plus } from "lucide-react"

import type { DirectoryItem, DirectoryRelation, DirectorySlug } from "@/@types/directories"
import { DirectoryLinkType } from "@/@types/directory-link-type"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslate } from "@tolgee/react"
import { useTr } from "@/lib/i18n/use-tr"
import {
  useCreateDirectoryLinkMutation,
  useDeleteDirectoryLinkMutation,
  useGetDirectoryItemsQuery,
  useGetDirectoryRelationsQuery,
} from "@/store/apis/directory-api"

type DirectoryRelationsTableProps = {
  sourceDirectorySlug: DirectorySlug
  sourceItemId: string
}

type DirectoryRelationRow = DirectoryRelation & { target: DirectoryItem }

export function DirectoryRelationsTable({ sourceDirectorySlug, sourceItemId }: DirectoryRelationsTableProps) {
  const { t } = useTranslate()
  const { data: relations = [], isLoading: isRelationsLoading, isFetching: isRelationsFetching } =
    useGetDirectoryRelationsQuery({ slug: sourceDirectorySlug, sourceId: sourceItemId })
  const [createLink, { isLoading: isCreateLinkLoading }] = useCreateDirectoryLinkMutation()
  const [deleteLink, { isLoading: isDeleteLinkLoading }] = useDeleteDirectoryLinkMutation()

  const tr = useTr()

  // NOTE: server-side directory links currently support linking items within the same directory kind.
  // Keep UI constrained to the current directory to avoid confusing cross-directory options.
  const targetDirectorySlug = sourceDirectorySlug
  const {
    data: targetItems = [],
    isLoading: isTargetItemsLoading,
    isFetching: isTargetItemsFetching,
  } = useGetDirectoryItemsQuery(targetDirectorySlug)
  const [targetItemId, setTargetItemId] = React.useState<string | undefined>(undefined)
  const [linkType, setLinkType] = React.useState<DirectoryLinkType>(DirectoryLinkType.ASSOCIATION)

  React.useEffect(() => {
    if (!targetItemId) return
    const exists = targetItems.some((x) => x.id === targetItemId)
    if (!exists) setTargetItemId(undefined)
  }, [targetItems, targetItemId])

  return (
    <Card className="flex min-h-0 flex-1 flex-col">
      <CardHeader className="pb-0">
        <CardTitle>{t('directory.item.relations')}</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="grid w-full gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div className="grid min-w-0 gap-2">
            <Label>{t('directory.item.relations.target.directory')}</Label>
            <Select value={targetDirectorySlug} onValueChange={() => {}} disabled>
              <SelectTrigger className="w-full min-w-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={targetDirectorySlug}>{t(getDirectoryMeta(targetDirectorySlug).titleKey)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid min-w-0 gap-2">
            <Label>{t('directory.item.relations.target.item')}</Label>
            <Select
              value={targetItemId}
              onValueChange={(v) => setTargetItemId(v)}
              disabled={isTargetItemsLoading || isTargetItemsFetching || targetItems.length === 0}
            >
              <SelectTrigger className="w-full min-w-0">
                <SelectValue
                  placeholder={
                    isTargetItemsLoading || isTargetItemsFetching
                      ? "Loading..."
                      : targetItems.length
                        ? "Select item"
                        : "No items"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {targetItems.map((it) => (
                  <SelectItem key={it.id} value={it.id}>
                    {it.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid min-w-0 gap-2">
            <Label>{tr("directory.item.relations.type")}</Label>
            <Select value={linkType} onValueChange={(v) => setLinkType(v as DirectoryLinkType)}>
              <SelectTrigger className="w-full min-w-0">
                <SelectValue placeholder={tr("directory.item.relations.type.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DirectoryLinkType.ASSOCIATION}>
                  {tr(DirectoryLinkType.ASSOCIATION, "Association")}
                </SelectItem>
                <SelectItem value={DirectoryLinkType.HIERARCHY}>
                  {tr(DirectoryLinkType.HIERARCHY, "Hierarchy")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end justify-end">
            <Button
              type="button"
              size="icon"
              aria-label={tr("action.add")}
              disabled={!targetItemId || isCreateLinkLoading}
              onClick={async () => {
                if (!targetItemId) return
                const exists = relations.some(
                  (r) =>
                    r.targetDirectorySlug === targetDirectorySlug &&
                    r.targetItemId === targetItemId &&
                    r.type === linkType
                )
                if (exists) return
                await createLink({
                  slug: sourceDirectorySlug,
                  sourceId: sourceItemId,
                  targetId: targetItemId,
                  type: linkType,
                }).unwrap()
                setTargetItemId(undefined)
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto rounded-md border">
          <Table
            className="table-fixed"
            style={
              {
                // 3 equal columns + fixed actions column, aligned with the top grid
                "--actions-col": "56px",
                "--data-col": "calc((100% - var(--actions-col)) / 3)",
              } as React.CSSProperties
            }
          >
            <colgroup>
              <col style={{ width: "var(--data-col)" }} />
              <col style={{ width: "var(--data-col)" }} />
              <col style={{ width: "var(--data-col)" }} />
              <col style={{ width: "var(--actions-col)" }} />
            </colgroup>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>{t('directory.item.relations.target.directory')}</TableHead>
                <TableHead>{t('directory.item.relations.target.item')}</TableHead>
                <TableHead>{tr("directory.item.relations.type")}</TableHead>
                <TableHead className="w-[56px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relations.length ? (
                (relations as DirectoryRelationRow[]).map((rel) => {
                  const target = rel.target
                  return (
                    <TableRow key={rel.id}>
                      <TableCell className="overflow-hidden text-ellipsis">
                        <span className="block truncate">{t(getDirectoryMeta(rel.targetDirectorySlug).titleKey)}</span>
                      </TableCell>
                      <TableCell className="overflow-hidden">
                        {target ? (
                          <div className="flex min-w-0 flex-col">
                            <span className="font-medium truncate">{target.name}</span>
                            {target.description ? (
                              <span className="text-muted-foreground text-xs truncate">{target.description}</span>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm truncate">Missing item</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm overflow-hidden text-ellipsis">
                        <span className="block truncate">
                          {tr(rel.type, rel.type === DirectoryLinkType.HIERARCHY ? "Hierarchy" : "Association")}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={tr("action.remove")}
                          disabled={isDeleteLinkLoading}
                          onClick={async () => {
                            await deleteLink({
                              slug: sourceDirectorySlug,
                              sourceId: sourceItemId,
                              targetId: rel.targetItemId,
                            }).unwrap()
                          }}
                        >
                          <Eraser className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {isRelationsLoading || isRelationsFetching ? "Loading..." : "No relations yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

