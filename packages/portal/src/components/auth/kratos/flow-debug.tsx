"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { getFlowMeta } from "@/components/auth/kratos/flow-utils"

export function FlowDebug({
  flow,
  className,
}: {
  flow: unknown
  className?: string
}) {
  if (process.env.NODE_ENV === "production") return null
  const meta = getFlowMeta(flow)

  return (
    <details className={cn("rounded-md border bg-muted/30 px-3 py-2 text-xs", className)}>
      <summary className="cursor-pointer select-none">Auth flow debug</summary>
      <div className="mt-2 grid gap-1">
        <div>
          <span className="text-muted-foreground">flow.id:</span> {String(meta.id ?? "—")}
        </div>
        <div className="break-all">
          <span className="text-muted-foreground">ui.action:</span> {String(meta.action ?? "—")}
        </div>
        <div>
          <span className="text-muted-foreground">ui.method:</span> {String(meta.httpMethod ?? "—")}
        </div>
      </div>
    </details>
  )
}


