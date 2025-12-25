"use client"

import * as React from "react"
import { ParentTable, ChildrenTable } from "./hierarchy-tables"
import { DataObjectsTable } from "./data-objects-table"
import { FunctionsTable } from "./functions-table"
import { InterfacesTable } from "./interfaces-table"
import { EventsTable } from "./events-table"

type ApplicationTabProps = {
  componentId: string
  onAddExistingParent: () => void
  onAddExistingChild: () => void
  onAddExistingDataObjects: () => void
  onAddExistingFunctions?: () => void
  onAddExistingInterfaces?: () => void
  onAddExistingEvents?: () => void
  onCreateDataObjects?: () => void
  onCreateFunctions?: () => void
  onCreateInterfaces?: () => void
  onCreateEvents?: () => void
  refreshDataObjectsToken?: number
  refreshFunctionsToken?: number
  refreshInterfacesToken?: number
  refreshEventsToken?: number
}

export function ApplicationTab({
  componentId,
  onAddExistingParent,
  onAddExistingChild,
  onAddExistingDataObjects,
  onAddExistingFunctions,
  onAddExistingInterfaces,
  onAddExistingEvents,
  onCreateDataObjects,
  onCreateFunctions,
  onCreateInterfaces,
  onCreateEvents,
  refreshDataObjectsToken,
  refreshFunctionsToken,
  refreshInterfacesToken,
  refreshEventsToken,
}: ApplicationTabProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 h-full">
        {/* Column 1: Functions */}
        <div className="flex-1 min-h-0 h-full">
          <FunctionsTable
            componentId={componentId}
            onAddExisting={onAddExistingFunctions}
            onCreate={onCreateFunctions}
            refreshToken={refreshFunctionsToken}
          />
        </div>
        
        {/* Column 2: Data Objects */}
        <div className="flex-1 min-h-0 h-full">
          <DataObjectsTable
            componentId={componentId}
            onAddExisting={onAddExistingDataObjects}
            onCreate={onCreateDataObjects}
            refreshToken={refreshDataObjectsToken}
          />
        </div>
        
        {/* Column 3: Interfaces and Events (50/50 by height) */}
        <div className="flex flex-col gap-6 flex-1 min-h-0 h-full">
          <div className="flex-1 min-h-0 h-full">
            <InterfacesTable
              componentId={componentId}
              onAddExisting={onAddExistingInterfaces}
              onCreate={onCreateInterfaces}
              refreshToken={refreshInterfacesToken}
            />
          </div>
          <div className="flex-1 min-h-0 h-full">
            <EventsTable
              componentId={componentId}
              onAddExisting={onAddExistingEvents}
              onCreate={onCreateEvents}
              refreshToken={refreshEventsToken}
            />
          </div>
        </div>

        {/* Column 4: Parent and Children (50/50 by height) */}
        <div className="flex flex-col gap-6 flex-1 min-h-0 h-full">
          <div className="flex-1 min-h-0 h-full">
            <ParentTable
              componentId={componentId}
              onAddExisting={onAddExistingParent}
            />
          </div>
          <div className="flex-1 min-h-0 h-full">
            <ChildrenTable
              componentId={componentId}
              onAddExisting={onAddExistingChild}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

