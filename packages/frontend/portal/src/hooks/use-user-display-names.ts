"use client"

import * as React from "react"
import { getUserProfileByKeycloakId } from "@/services/tenant-service.rest"

export function useUserDisplayNames(keycloakIds: (string | null | undefined)[]): Record<string, string> {
  const [map, setMap] = React.useState<Record<string, string>>({})
  const ids = React.useMemo(
    () => Array.from(new Set(keycloakIds.filter((id): id is string => Boolean(id?.trim())))),
    [keycloakIds]
  )

  React.useEffect(() => {
    if (ids.length === 0) {
      setMap({})
      return
    }
    let cancelled = false
    const results: Record<string, string> = {}
    Promise.all(
      ids.map(async (id) => {
        const profile = await getUserProfileByKeycloakId(id)
        if (cancelled) return
        results[id] = profile?.displayName ?? profile?.code ?? profile?.keycloakId ?? "—"
      })
    ).then(() => {
      if (!cancelled) setMap(results)
    })
    return () => {
      cancelled = true
    }
  }, [ids])

  return map
}
