"use client"

import * as React from "react"
import { useAppDispatch } from "@/store/hooks"
import { applicationComponentApi } from "@/store/apis/application-component-api"

/**
 * Keeps application-components RTK Query cache while user is inside /application/components section.
 * When user navigates away, clear it to avoid wasting memory.
 */
export function ApplicationComponentsScope({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    return () => {
      dispatch(applicationComponentApi.util.resetApiState())
    }
  }, [dispatch])

  return <>{children}</>
}


