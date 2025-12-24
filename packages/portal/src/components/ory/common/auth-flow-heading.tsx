'use client'

import { useTranslate } from '@tolgee/react'

export function AuthFlowHeading({
  titleKey,
  titleDefault,
  subtitleKey,
  subtitleDefault,
}: {
  titleKey: string
  titleDefault: string
  subtitleKey: string
  subtitleDefault: string
}) {
  const { t } = useTranslate()

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{t(titleKey, titleDefault)}</h1>
      <p className="text-muted-foreground text-balance">{t(subtitleKey, subtitleDefault)}</p>
    </div>
  )
}

