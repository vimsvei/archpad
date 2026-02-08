"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

type SchemasTabProps = {
  solutionId: string
  solutionName?: string
}

export function SchemasTab({
  solutionId: _solutionId,
  solutionName,
}: SchemasTabProps) {
  const { t } = useTranslate()

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Card className="flex-1 flex flex-col p-6 min-h-0">
        <Empty className="border-0 flex-1 flex items-center justify-center">
          <EmptyContent>
            <EmptyHeader>
              <EmptyTitle>
                {t("tab.schemas.title")}
              </EmptyTitle>
              <EmptyDescription>
                {solutionName 
                  ? t("tab.schemas.description", { solution: solutionName })
                  : t("tab.schemas.description.empty")
                }
              </EmptyDescription>
            </EmptyHeader>
          </EmptyContent>
        </Empty>
      </Card>
    </div>
  )
}