"use client"

import * as React from "react"
import { setCurrentTenantId } from "@/lib/tenant-context"

type UserProfile = {
  id: string
  keycloakId?: string | null
  email?: string | null
  code?: string | null
  firstName?: string | null
  lastName?: string | null
  middleName?: string | null
  phone?: string | null
  position?: string | null
  department?: string | null
  state?: string | null
}

type AuthUser = {
  keycloakId: string | null
  email: string | null
  name: string | null
  given_name: string | null
  family_name: string | null
  preferred_username: string | null
  roles: string[] | null
  groups: string[] | null
  profile: UserProfile | null
  tenantId: string | null
}

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  login: (input: { email: string; password: string }) => Promise<{ ok: true } | { ok: false; message: string }>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

function normalizeMeResponse(json: any): AuthUser {
  const profileRaw = json?.profile
  const profile: UserProfile | null =
    profileRaw && typeof profileRaw === "object"
      ? {
          id: typeof profileRaw.id === "string" ? profileRaw.id : "",
          keycloakId: typeof profileRaw.keycloakId === "string" ? profileRaw.keycloakId : null,
          email: typeof profileRaw.email === "string" ? profileRaw.email : null,
          code: typeof profileRaw.code === "string" ? profileRaw.code : null,
          firstName: typeof profileRaw.firstName === "string" ? profileRaw.firstName : null,
          lastName: typeof profileRaw.lastName === "string" ? profileRaw.lastName : null,
          middleName: typeof profileRaw.middleName === "string" ? profileRaw.middleName : null,
          phone: typeof profileRaw.phone === "string" ? profileRaw.phone : null,
          position: typeof profileRaw.position === "string" ? profileRaw.position : null,
          department: typeof profileRaw.department === "string" ? profileRaw.department : null,
          state: typeof profileRaw.state === "string" ? profileRaw.state : null,
        }
      : null

  return {
    keycloakId: typeof json?.keycloakId === "string" ? json.keycloakId : null,
    email: typeof json?.email === "string" ? json.email : null,
    name: typeof json?.name === "string" ? json.name : null,
    given_name: typeof json?.given_name === "string" ? json.given_name : null,
    family_name: typeof json?.family_name === "string" ? json.family_name : null,
    preferred_username: typeof json?.preferred_username === "string" ? json.preferred_username : null,
    roles: Array.isArray(json?.roles) ? json.roles.filter((x: unknown) => typeof x === "string") : null,
    groups: Array.isArray(json?.groups) ? json.groups.filter((x: unknown) => typeof x === "string") : null,
    profile,
    tenantId: typeof json?.tenantId === "string" ? json.tenantId : null,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const refresh = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { accept: "application/json" },
      })
      if (res.status === 401 || res.status === 403) {
        setUser(null)
        setCurrentTenantId(null)
        return
      }
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`me_failed: ${res.status} ${text.slice(0, 200)}`)
      }
      const json = await res.json().catch(() => null)
      setUser(normalizeMeResponse(json))
    } catch (e: unknown) {
      setUser(null)
      setCurrentTenantId(null)
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void refresh()
  }, [refresh])

  React.useEffect(() => {
    setCurrentTenantId(user?.tenantId ?? null)
  }, [user?.tenantId])

  const login: AuthContextValue["login"] = React.useCallback(async (input) => {
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: input.email, password: input.password }),
      })
      const json = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        const message = typeof json?.message === "string" ? json.message : "Login failed"
        return { ok: false as const, message }
      }
      await refresh()
      return { ok: true as const }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      return { ok: false as const, message }
    }
  }, [refresh])

  const logout: AuthContextValue["logout"] = React.useCallback(async () => {
    setError(null)
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => {})
    } finally {
      setUser(null)
      setCurrentTenantId(null)
    }
  }, [])

  const value: AuthContextValue = React.useMemo(
    () => ({ user, isLoading, error, refresh, login, logout }),
    [user, isLoading, error, refresh, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}

