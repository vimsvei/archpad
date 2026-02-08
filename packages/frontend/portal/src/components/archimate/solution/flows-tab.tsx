"use client"

import * as React from "react"
import { FlowsTable } from "./flows-table"

type FlowsTabProps = {
  solutionId: string
  solutionName?: string
  onAddExistingFlow?: () => void
  onCreateFlow?: () => void
}

export function FlowsTab({
  solutionId,
  solutionName,
  onAddExistingFlow,
  onCreateFlow,
}: FlowsTabProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <FlowsTable
        solutionId={solutionId}
        solutionName={solutionName}
        onAddExisting={onAddExistingFlow}
        onCreate={onCreateFlow}
      />
    </div>
  )
}
