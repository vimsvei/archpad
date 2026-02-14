"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"

type TechnologySchemaViewProps = {
  componentId: string
  componentName?: string
}

export function TechnologySchemaView({
  componentId: _componentId,
  componentName: _componentName,
}: TechnologySchemaViewProps) {
  return (
    <Card className="flex min-h-0 flex-1 flex-col p-6">
      <div className="text-muted-foreground">Technology schema view - coming soon</div>
    </Card>
  )
}
