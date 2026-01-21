"use client"

import * as React from "react"

type KratosSessionState = {
  session: unknown | null
  isLoading: boolean
  error: unknown | null
  refresh: () => Promise<void>
}

export function useKratosSession(): KratosSessionState {
  const [session, setSession] = React.useState<unknown | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<unknown | null>(null)

  const refresh = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "application/json",
        },
      })

      if (res.status === 401 || res.status === 403) {
        setSession(null)
        return
      }
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`session failed: ${res.status} ${text.slice(0, 300)}`)
      }
      const json = await res.json()
      setSession(json ?? null)
    } catch (e) {
      setError(e)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void refresh()
  }, [refresh])

  return { session, isLoading, error, refresh }
}


