"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"

export type FlowStructureEntry = {
  id: string
  code: string
  name: string
  description?: string | null
  iconType: ArchimateObjectIconType
  href?: string | null
  subtitle?: string | null
}

export type FlowStructureColumn = {
  titleKey: string
  entries: FlowStructureEntry[]
  emptyTextKey?: string
}

export type FlowIntermediary = {
  id: string
  entries: FlowStructureEntry[]
}

type FlowStructurePanelProps = {
  t: (key: string) => string
  titleKey?: string
  source: FlowStructureColumn
  intermediaries: FlowIntermediary[]
  target: FlowStructureColumn
  onMoveIntermediaryUp?: (id: string) => void
  onMoveIntermediaryDown?: (id: string) => void
  onRemoveIntermediary?: (id: string) => void
}

type FlowStructureCardProps = {
  t: (key: string) => string
  titleKey: string
  entries: FlowStructureEntry[]
  emptyTextKey?: string
  actions?: React.ReactNode
}

function FlowStructureCard({
  t,
  titleKey,
  entries,
  emptyTextKey = "table.no-results",
  actions,
}: FlowStructureCardProps) {
  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0"
      style={{ width: "340px" }}
    >
      <div className="bg-muted/30 px-4 py-2 border-b border-border">
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">{t(titleKey)}</h4>
      </div>

      <div className="p-4 space-y-2">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">{t(emptyTextKey)}</p>
        ) : (
          entries.map((entry) => {
            const content = (
              <div className="group/item hover:bg-accent/10 px-2 py-2 rounded border border-transparent hover:border-border/50 transition-colors">
                <div className="flex items-start gap-2">
                  <ArchimateObjectIcon
                    type={entry.iconType}
                    className="text-muted-foreground mt-0.5 shrink-0"
                    size={18}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {entry.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      <span className="font-mono">{entry.code}</span>
                      {entry.subtitle ? (
                        <>
                          <span className="mx-1">•</span>
                          <span>{entry.subtitle}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  {actions}
                </div>
              </div>
            )

            if (!entry.href || entry.href === "#") {
              return <div key={entry.id}>{content}</div>
            }

            return (
              <Link key={entry.id} href={entry.href} className="block">
                {content}
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

export function FlowStructurePanel({
  t,
  titleKey = "flow.structure",
  source,
  intermediaries,
  target,
  onMoveIntermediaryUp,
  onMoveIntermediaryDown,
  onRemoveIntermediary,
}: FlowStructurePanelProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3">{t(titleKey)}</h3>
      <div className="overflow-x-auto">
        <div className="flex items-start gap-3 pb-2" style={{ minWidth: "min-content" }}>
          <FlowStructureCard
            t={t}
            titleKey={source.titleKey}
            entries={source.entries}
          />

          <div className="flex items-center justify-center flex-shrink-0 px-2">
            <ArrowRight className="size-5 text-muted-foreground" />
          </div>

          {intermediaries.length > 0 ? (
            <FlowStructureCard
              t={t}
              titleKey="flow.structure.intermediaries"
              entries={intermediaries.map((item) => item.entries[0]).filter(Boolean)}
              actions={null}
            />
          ) : null}

          {intermediaries.length > 0 ? (
            <div className="flex flex-col gap-2 flex-shrink-0">
              {intermediaries.map((item, index) => (
                <div key={item.id} className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        disabled={index === 0}
                        onClick={() => onMoveIntermediaryUp?.(item.id)}
                      >
                        <ChevronUp className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("flow.proxy.move-up")}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        disabled={index === intermediaries.length - 1}
                        onClick={() => onMoveIntermediaryDown?.(item.id)}
                      >
                        <ChevronDown className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("flow.proxy.move-down")}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => onRemoveIntermediary?.(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("flow.proxy.remove")}</TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          ) : null}

          {intermediaries.length > 0 ? (
            <div className="flex items-center justify-center flex-shrink-0 px-2">
              <ArrowRight className="size-5 text-muted-foreground" />
            </div>
          ) : null}

          <FlowStructureCard
            t={t}
            titleKey={target.titleKey}
            entries={target.entries}
          />
        </div>
      </div>
    </div>
  )
}

