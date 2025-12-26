"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ArchimateObjectIconType =
  | "application-component"
  | "application-function"
  | "application-data-object"
  | "system-software"

type ArchimateObjectIconProps = {
  type: ArchimateObjectIconType
  className?: string
  size?: number
}

export function ArchimateObjectIcon({ type, className, size = 24 }: ArchimateObjectIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    focusable: false as const,
    className: cn("shrink-0", className),
  }

  if (type === "application-component") {
    return (
      <svg {...common}>
        <path
          d="M22 22H8V15H9V21H21V3H9V5H8V2H22V22ZM9 11H8V9H9V11Z"
          fill="currentColor"
        />
        <rect x="2.5" y="11.5" width="9" height="3" stroke="currentColor" />
        <rect x="2.5" y="5.5" width="9" height="3" stroke="currentColor" />
      </svg>
    )
  }

  if (type === "application-function") {
    // Simple "flow" glyph
    return (
      <svg {...common}>
        <path
          d="M7 7H17M7 12H14M7 17H11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17 7L14.5 5M17 7L14.5 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === "application-data-object") {
    // Simple "document" glyph
    return (
      <svg {...common}>
        <path
          d="M7 3H14L18 7V21H7V3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 3V7H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 11H16M9 15H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // system-software
  return (
    <svg {...common}>
      <path
        d="M4 7H20M6 7V19H18V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 10H15M9 13H15M9 16H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}


