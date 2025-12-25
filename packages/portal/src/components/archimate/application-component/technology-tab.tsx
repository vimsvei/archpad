"use client"

import * as React from "react"
import { SystemSoftwareTable } from "./system-software-table"

type TechnologyTabProps = {
  componentId: string
  onAddExistingSystemSoftware: () => void
}

export function TechnologyTab({
  componentId,
  onAddExistingSystemSoftware,
}: TechnologyTabProps) {
  return (
    <div className="flex min-h-0 flex-1">
      <div className="w-full lg:w-1/3">
        <SystemSoftwareTable
          componentId={componentId}
          onAddExisting={onAddExistingSystemSoftware}
        />
      </div>
    </div>
  )
}

