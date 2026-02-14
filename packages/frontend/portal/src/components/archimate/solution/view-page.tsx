"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Card } from "@/components/ui/card"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import type { SolutionFull } from "@/@types/solution"
import { MarkdownViewer } from "@/components/shared/markdown-viewer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SolutionViewPageProps = {
  solution: SolutionFull
}

export function SolutionViewPage({ solution }: SolutionViewPageProps) {
  const { t } = useTranslate()

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="grid place-items-center rounded-full bg-muted shrink-0 size-16">
            <ArchimateObjectIcon type="solution" className="text-foreground" size={40} />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{solution.name}</h1>
            {solution.code && (
              <p className="text-muted-foreground font-mono text-sm">{solution.code}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {solution.description && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("item.description")}</h2>
          <div className="prose max-w-none">
            <MarkdownViewer content={solution.description} />
          </div>
        </Card>
      )}

      {/* Stakeholders */}
      {solution.stakeholders && solution.stakeholders.length > 0 && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("tab.stakeholders")}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.stakeholder.role")}</TableHead>
                <TableHead>{t("table.stakeholder.name")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solution.stakeholders.map((stakeholder, idx) => (
                <TableRow key={`${stakeholder.stakeholderId}-${idx}`}>
                  <TableCell>{stakeholder.roleName}</TableCell>
                  <TableCell className="font-medium">{stakeholder.stakeholderName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* ADR Fields */}
      {solution.context && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("solution.context")}</h2>
          <div className="prose max-w-none">
            <MarkdownViewer content={solution.context} />
          </div>
        </Card>
      )}

      {solution.decision && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("solution.decision")}</h2>
          <div className="prose max-w-none">
            <MarkdownViewer content={solution.decision} />
          </div>
        </Card>
      )}

      {solution.consequences && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("solution.consequences")}</h2>
          <div className="prose max-w-none">
            <MarkdownViewer content={solution.consequences} />
          </div>
        </Card>
      )}

      {solution.alternatives && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("solution.alternatives")}</h2>
          <div className="prose max-w-none">
            <MarkdownViewer content={solution.alternatives} />
          </div>
        </Card>
      )}

      {/* Flows Table */}
      {solution.flows && solution.flows.length > 0 && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("tab.flows")}</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("table.code")}</TableHead>
                  <TableHead>{t("table.name")}</TableHead>
                  <TableHead>{t("flow.source")}</TableHead>
                  <TableHead>{t("flow.target")}</TableHead>
                  <TableHead>{t("item.description")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solution.flows.map((flow) => (
                  <TableRow key={flow.id}>
                    <TableCell className="font-mono text-sm">{flow.code}</TableCell>
                    <TableCell className="font-medium">{flow.name}</TableCell>
                    <TableCell>
                      {flow.sourceComponent?.name ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {flow.targetComponent?.name ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {flow.description ? (
                        <div className="max-w-md truncate text-sm text-muted-foreground">
                          {flow.description}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Comments Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("solution.comments")}</h2>
        <div className="text-muted-foreground">
          <p>{t("solution.comments.description")}</p>
        </div>
      </Card>
    </div>
  )
}
