"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Trash2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export type StakeholderItem = {
  id: string
  stakeholderId: string
  stakeholderName: string
  roleId: string
  roleName: string
}

export type StakeholdersPanelProps = {
  t: (key: string, params?: object) => string
  entityName: string
  stakeholders: StakeholderItem[]
  onAdd: () => void
  onRemove: (id: string) => void
  /** Base path for stakeholder links, e.g. "/motivation/stakeholders" */
  stakeholderLinkBase?: string
}

/**
 * Stakeholders list with empty state. Reusable for components, solutions.
 */
export function StakeholdersPanel({
  t,
  entityName,
  stakeholders,
  onAdd,
  onRemove,
  stakeholderLinkBase = "/motivation/stakeholders",
}: StakeholdersPanelProps) {
  return (
    <div className="space-y-4 pt-6 border-t border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {t("tab.stakeholders")}
        </h3>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onAdd}
          aria-label={t("action.add")}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      {stakeholders.length === 0 ? (
        <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center bg-muted/10">
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 rounded-full bg-muted/50 grid place-items-center">
              <UserPlus className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                {t("table.component.stakeholders.no-results", {
                  component: entityName,
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("table.component.stakeholders.no-results.description", {
                  component: entityName,
                })}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdd}
              className="mt-2"
            >
              <UserPlus className="size-4 mr-2" />
              {t("action.add")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {stakeholders.map((sh) => (
            <div
              key={sh.id}
              className="py-2 px-3 rounded-lg hover:bg-accent/10 border border-border bg-card cursor-pointer flex items-center justify-between group"
            >
              <Link
                href={`${stakeholderLinkBase}/${sh.stakeholderId}`}
                className="flex-1 min-w-0"
              >
                <div className="text-sm text-foreground font-medium">
                  {sh.stakeholderName}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {sh.roleName}
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.preventDefault()
                  onRemove(sh.id)
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
