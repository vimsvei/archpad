"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { useTranslate } from "@tolgee/react"
import { useGetDirectoryItemQuery } from "@/store/apis/directory-api"

type Crumb = {
  href?: string
  label: string
}

function titleFromSegment(seg: string) {
  return seg
    .split("-")
    .filter(Boolean)
    .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
    .join(" ")
}

export function PrivateBreadcrumbs() {
  const { t } = useTranslate()
  const pathname = usePathname() ?? "/"
  const segments = React.useMemo(
    () => pathname.split("?")[0]!.split("#")[0]!.split("/").filter(Boolean).map(decodeURIComponent),
    [pathname]
  )

  const directorySlug = segments[0] === "directories" ? segments[1] : undefined
  const directoryItemId = segments[0] === "directories" ? segments[2] : undefined

  const { data: directoryItem } = useGetDirectoryItemQuery(
    directorySlug && directoryItemId ? { slug: directorySlug, id: directoryItemId } : skipToken,
    { refetchOnMountOrArgChange: false }
  )
  const directoryItemLabel = React.useMemo(() => {
    const code = directoryItem?.code?.trim()
    if (code) return code
    const name = directoryItem?.name?.trim()
    if (name) return name
    return null
  }, [directoryItem?.code, directoryItem?.name])

  const crumbs = React.useMemo<Crumb[]>(() => {
    if (segments.length === 0) return [{ label: "Dashboard" }]

    if (segments[0] === "dashboard") {
      return [{ label: "Dashboard" }]
    }

    if (segments[0] === "directories") {
      const slug = segments[1]
      const id = segments[2]

      const base: Crumb[] = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/directories", label: t("directories.title") },
      ]

      if (!slug) return [...base.slice(0, 2).map((c, idx) => (idx === 1 ? { label: c.label } : c))]

      const dirLabel = t(getDirectoryMeta(slug).titleKey)
      const dirHref = `/directories/${slug}`

      if (!id) return [...base, { label: dirLabel }]

      const itemLabel = directoryItemLabel ?? id
      return [...base, { href: dirHref, label: dirLabel }, { label: itemLabel }]
    }

    // Fallback: Dashboard -> <path segments>
    const items: Crumb[] = [{ href: "/dashboard", label: "Dashboard" }]
    let acc = ""
    segments.forEach((seg, idx) => {
      acc += `/${seg}`
      if (idx === segments.length - 1) items.push({ label: titleFromSegment(seg) })
      else items.push({ href: acc, label: titleFromSegment(seg) })
    })
    return items
  }, [segments, directoryItemLabel, t])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1
          return (
            <React.Fragment key={`${crumb.label}-${idx}`}>
              <BreadcrumbItem className={idx === 0 ? "hidden md:block" : undefined}>
                {isLast || !crumb.href ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator className="hidden md:block" /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

