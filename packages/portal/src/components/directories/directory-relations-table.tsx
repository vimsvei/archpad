"use client"

import * as React from "react"

import type { DirectorySlug } from "@/types/directories"
import { getDirectoryMeta, listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import { addRelation, getDirectoryItem, removeRelation } from "@/components/directories/storage"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { useDirectoryRelations } from "@/hooks/use-directory-relations"
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

type DirectoryRelationsTableProps = {
  sourceDirectorySlug: DirectorySlug
  sourceItemId: string
}

export function DirectoryRelationsTable({ sourceDirectorySlug, sourceItemId }: DirectoryRelationsTableProps) {
  const { t } = useTranslate()
  const relations = useDirectoryRelations(sourceDirectorySlug, sourceItemId)

  const directoryOptions = React.useMemo(() => {
    const known = listKnownDirectorySlugs()
    const all = new Set<DirectorySlug>([sourceDirectorySlug, ...known])
    return Array.from(all)
  }, [sourceDirectorySlug])

  const [targetDirectorySlug, setTargetDirectorySlug] = React.useState<DirectorySlug>(() =>
    directoryOptions.includes(sourceDirectorySlug) ? sourceDirectorySlug : directoryOptions[0]!
  )
  const targetItems = useDirectoryItems(targetDirectorySlug)
  const [targetItemId, setTargetItemId] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    // Reset selection when directory changes.
    setTargetItemId(undefined)
  }, [targetDirectorySlug])

  React.useEffect(() => {
    if (!targetItemId) return
    const exists = targetItems.some((x) => x.id === targetItemId)
    if (!exists) setTargetItemId(undefined)
  }, [targetItems, targetItemId])

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Relations</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Target directory</Label>
            <Select value={targetDirectorySlug} onValueChange={(v) => setTargetDirectorySlug(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select directory" />
              </SelectTrigger>
              <SelectContent>
                {directoryOptions.map((slug) => (
                  <SelectItem key={slug} value={slug}>
                    {t(getDirectoryMeta(slug).titleKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Target item</Label>
            <Select
              value={targetItemId}
              onValueChange={(v) => setTargetItemId(v)}
              disabled={targetItems.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={targetItems.length ? "Select item" : "No items"} />
              </SelectTrigger>
              <SelectContent>
                {targetItems.map((it) => (
                  <SelectItem key={it.id} value={it.id}>
                    {it.code} — {it.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              className="w-full"
              disabled={!targetItemId}
              onClick={() => {
                if (!targetItemId) return
                const exists = relations.some(
                  (r) => r.targetDirectorySlug === targetDirectorySlug && r.targetItemId === targetItemId
                )
                if (exists) return
                addRelation({
                  sourceDirectorySlug,
                  sourceItemId,
                  targetDirectorySlug,
                  targetItemId,
                })
                setTargetItemId(undefined)
              }}
            >
              Add relation
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target directory</TableHead>
                <TableHead>Target item</TableHead>
                <TableHead className="w-[120px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relations.length ? (
                relations.map((rel) => {
                  const target = getDirectoryItem(rel.targetDirectorySlug, rel.targetItemId)
                  return (
                    <TableRow key={rel.id}>
                      <TableCell>{t(getDirectoryMeta(rel.targetDirectorySlug).titleKey)}</TableCell>
                      <TableCell>
                        {target ? (
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {target.code} — {target.name}
                            </span>
                            {target.description ? (
                              <span className="text-muted-foreground text-xs">{target.description}</span>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Missing item</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => removeRelation(rel.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No relations yet.
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

