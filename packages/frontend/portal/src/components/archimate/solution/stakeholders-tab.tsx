"use client"

import * as React from "react"
import { StakeholdersTable } from "./stakeholders-table"

type StakeholdersTabProps = {
  solutionId: string
  solutionName?: string
}

export function StakeholdersTab({
  solutionId,
  solutionName,
}: StakeholdersTabProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <StakeholdersTable
        solutionId={solutionId}
        solutionName={solutionName}
      />
    </div>
  )
}