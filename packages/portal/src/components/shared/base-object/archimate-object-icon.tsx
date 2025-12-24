"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ArchimateObjectIconType = "application-component"

type ArchimateObjectIconProps = {
  type: ArchimateObjectIconType
  className?: string
  size?: number
}

export function ArchimateObjectIcon({ type, className, size = 24 }: ArchimateObjectIconProps) {
  if (type === "application-component") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className={cn("shrink-0", className)}
      >
        <path
          d="M22 22H8V15H9V21H21V3H9V5H8V2H22V22ZM9 11H8V9H9V11Z"
          fill="currentColor"
        />
        <rect x="2.5" y="11.5" width="9" height="3" stroke="currentColor" />
        <rect x="2.5" y="5.5" width="9" height="3" stroke="currentColor" />
      </svg>
    )
  }

  return null
}


