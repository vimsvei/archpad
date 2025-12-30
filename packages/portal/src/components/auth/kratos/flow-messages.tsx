"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function FlowMessages({
  messages,
  className,
}: {
  messages: string[]
  className?: string
}) {
  if (!messages || messages.length === 0) return null

  return (
    <div className={cn("grid gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3", className)}>
      {messages.map((m, idx) => (
        <div key={`${idx}-${m}`} className="text-sm text-destructive">
          {m}
        </div>
      ))}
    </div>
  )
}


