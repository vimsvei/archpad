"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslate } from "@tolgee/react"
import { toast } from "sonner"
import Link from "next/link"
import { Edit, Trash2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import type { RootState, AppDispatch } from "@/store/store"
import { removeStakeholder } from "@/store/slices/solution-edit-slice"
import type { StakeholderItem } from "@/store/slices/solution-edit-slice"

type StakeholdersTableProps = {
  solutionId: string
  solutionName?: string
}

export function StakeholdersTable({
  solutionId: _solutionId,
  solutionName,
}: StakeholdersTableProps) {
  const { t } = useTranslate()
  const dispatch = useDispatch<AppDispatch>()
  const editState = useSelector((state: RootState) => state.solutionEdit)
  const isLoading = editState.isSaving
  const items = editState.stakeholders

  const handleRefresh = React.useCallback(() => {
    toast.success(t("action.updated"))
  }, [t])

  const handleDelete = React.useCallback(
    (item: StakeholderItem) => {
      dispatch(removeStakeholder(item.id))
      toast.success(t("action.deleted"))
    },
    [dispatch, t]
  )

  const renderEmpty = () => {
    if (!solutionName) {
      return (
        <div className="h-24 text-center text-muted-foreground flex items-center justify-center">
          {t("table.no-results")}
        </div>
      )
    }

    return (
      <Empty className="border-0">
        <EmptyContent>
          <EmptyHeader>
            <EmptyTitle>
              {t("table.solution.stakeholders.no-results", { solution: solutionName })}
            </EmptyTitle>
            <EmptyDescription>
              {t("table.solution.stakeholders.no-results.description", { solution: solutionName })}
            </EmptyDescription>
          </EmptyHeader>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <Card className="flex flex-col h-full min-h-0 pt-0 gap-2">
      {/* Header with actions */}
      <div className="flex items-center justify-end border-b px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isLoading}
                aria-label={t("action.update")}
              >
                <RefreshCw className={isLoading ? "animate-spin" : ""} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.update")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 px-6 overflow-hidden">
        {!isLoading && items.length === 0 ? (
          <div className="py-8">
            {renderEmpty()}
          </div>
        ) : (
          <div className="flex h-full min-h-0 overflow-auto">
            <Table className="min-w-max" containerClassName="overflow-x-auto">
              <TableHeader className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card">
                <TableRow>
                  <TableHead>{t("table.stakeholder.role")}</TableHead>
                  <TableHead>{t("table.stakeholder.name")}</TableHead>
                  <TableHead className="w-24 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.roleName}</TableCell>
                    <TableCell className="font-medium">{item.stakeholderName}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1 w-full">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                              <Link href={`/portfolio/motivation/stakeholders/${item.stakeholderId}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">{t("item.action.view")}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">{t("action.delete")}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Card>
  )
}
