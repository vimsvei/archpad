"use client"

import * as React from "react"
import { StakeholdersTable } from "./stakeholders-table"

type StakeholdersTabProps = {
  componentId: string
  componentName?: string
}

export function StakeholdersTab({
  componentId,
  componentName,
}: StakeholdersTabProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <StakeholdersTable
        componentId={componentId}
        componentName={componentName}
      />
    </div>
  )
}

