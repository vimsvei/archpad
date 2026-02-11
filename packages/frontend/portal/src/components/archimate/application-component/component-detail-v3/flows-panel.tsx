"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type FlowItem = {
  id: string
  code: string
  name: string
  description?: string | null
  sourceComponent?: string | null
  targetComponent?: string | null
}

export type FlowsPanelProps = {
  t: (key: string) => string
  incomingFlows: FlowItem[]
  outgoingFlows: FlowItem[]
  /** Name of the current entity (used as source/target in table) */
  entityName: string
  onAdd?: () => void
}

/**
 * Compact table of incoming/outgoing flows. Reusable for components, solutions.
 */
export function FlowsPanel({
  t,
  incomingFlows,
  outgoingFlows,
  entityName,
  onAdd,
}: FlowsPanelProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{t("tab.flows")}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAdd?.()}
          disabled={!onAdd}
          title={onAdd ? undefined : t("action.not-implemented")}
        >
          <Plus className="size-4 mr-2" />
          {t("action.add")}
        </Button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  {t("flow.direction")}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  {t("table.name")}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  {t("flow.source")}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  {t("flow.target")}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  {t("table.description")}
                </th>
              </tr>
            </thead>
            <tbody>
              {incomingFlows.map((flow) => (
                <tr
                  key={flow.id}
                  className="border-b border-border/50 hover:bg-accent/5 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {t("flow.incoming")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {flow.sourceComponent ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {entityName}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {flow.description ?? "—"}
                  </td>
                </tr>
              ))}
              {outgoingFlows.map((flow) => (
                <tr
                  key={flow.id}
                  className="border-b border-border/50 hover:bg-accent/5 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {t("flow.outgoing")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {entityName}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {flow.targetComponent ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {flow.description ?? "—"}
                  </td>
                </tr>
              ))}
              {incomingFlows.length === 0 && outgoingFlows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-muted-foreground italic"
                  >
                    {t("table.no-results")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
