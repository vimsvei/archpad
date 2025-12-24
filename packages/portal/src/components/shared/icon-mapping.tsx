"use client"

import * as React from "react"

export type IconType = "system-software" | "application-data-object" | "application-component"

const iconPaths: Record<IconType, string> = {
  "system-software": "/assets/icon/system-software.svg",
  "application-data-object": "/assets/icon/application-data-object.svg",
  "application-component": "/assets/icon/application-component.svg",
}

export function getIconPath(iconType: IconType): string {
  return iconPaths[iconType] || iconPaths["application-component"]
}

export function Icon({ iconType, className }: { iconType: IconType; className?: string }) {
  const path = getIconPath(iconType)
  return (
    <img
      src={path}
      alt=""
      className={className}
      width={24}
      height={24}
    />
  )
}

