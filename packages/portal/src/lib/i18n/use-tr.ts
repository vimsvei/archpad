"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { createTr, type Tr } from "./tr"

/**
 * Client hook that returns a stable `tr()` helper backed by Tolgee.
 */
export function useTr(): Tr {
  const { t } = useTranslate()
  return React.useMemo(() => createTr(t), [t])
}


