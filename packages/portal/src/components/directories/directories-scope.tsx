"use client"

import * as React from "react"
import { useAppDispatch } from "@/store/hooks"
import { directoryApi } from "@/store/apis/directory-api"

/**
 * Keeps directory-related RTK Query cache while user is inside /directories/* section.
 * When user navigates away from the section, we clear it to avoid wasting memory.
 */
export function DirectoriesScope({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    return () => {
      dispatch(directoryApi.util.resetApiState())
    }
  }, [dispatch])

  return <>{children}</>
}


