"use client"

import { useTranslate } from "@tolgee/react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import UnderConstructionImage from "@/components/images/UnderConstruction"

export interface UnderConstructionProps {
  titleKey?: string
  descriptionKey?: string
}

export function UnderConstructionBlock({
  titleKey = "under-construction.title",
  descriptionKey = "under-construction.description",
}: UnderConstructionProps) {
  const { t } = useTranslate()

  return (
    <Empty>
      <EmptyHeader className="max-w-2xl">
        <EmptyMedia variant="default" className="w-full min-h-[55vh] flex items-center justify-center">
          <UnderConstructionImage className="h-[55vh] w-auto max-w-full" />
        </EmptyMedia>
        <EmptyTitle>{t(titleKey)}</EmptyTitle>
        {descriptionKey ? <EmptyDescription>{t(descriptionKey)}</EmptyDescription> : null}
      </EmptyHeader>
    </Empty>
  )
}

