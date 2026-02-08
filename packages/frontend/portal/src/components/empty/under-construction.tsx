"use client"

import { Construction } from "lucide-react"
import { useTranslate } from "@tolgee/react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export interface UnderConstructionProps {
  titleKey?: string
  descriptionKey?: string
}

export function UnderConstructionBlock({ 
  titleKey = "under-construction.title",
  descriptionKey = "under-construction.description"
}: UnderConstructionProps) {
  const { t } = useTranslate()
  
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Construction />
        </EmptyMedia>
        <EmptyTitle>{t(titleKey)}</EmptyTitle>
        {descriptionKey ? <EmptyDescription>{t(descriptionKey)}</EmptyDescription> : null}
      </EmptyHeader>
    </Empty>
  )
}

