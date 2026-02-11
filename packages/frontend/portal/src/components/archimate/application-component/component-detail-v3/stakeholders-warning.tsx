"use client"

import * as React from "react"
import { AlertCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export type StakeholdersWarningProps = {
  t: (key: string, params?: object) => string
  entityName: string
  onAdd: () => void
}

/** Amber alert when entity has no stakeholders assigned. Reusable for components, solutions, etc. */
export function StakeholdersWarning({
  t,
  entityName,
  onAdd,
}: StakeholdersWarningProps) {
  return (
    <Card className="mb-6 border-amber-500/50 bg-amber-500/10 p-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="size-4 shrink-0 text-amber-500" />
        <div className="flex items-center justify-between gap-4 flex-1">
          <span className="text-sm text-foreground">
            {t("table.component.stakeholders.no-results", { component: entityName })}
          </span>
          <Button variant="outline" size="sm" onClick={onAdd} className="shrink-0">
            <UserPlus className="size-4 mr-2" />
            {t("action.add")}
          </Button>
        </div>
      </div>
    </Card>
  )
}
