"use client"

import * as React from "react"
import Image from "next/image"

export type IconType =
  | "system-software"
  | "application-data-object"
  | "application-component"
  | "application-function"
  | "application-interface"
  | "application-event"

const iconPaths: Record<IconType, string> = {
  "system-software": "/assets/icon/system-software.svg",
  "application-data-object": "/assets/icon/application-data-object.svg",
  "application-component": "/assets/icon/application-component.svg",
  "application-function": "/assets/icon/application-function.svg",
  "application-interface": "/assets/icon/application-interface.svg",
  "application-event": "/assets/icon/application-event.svg",
}

export function getIconPath(iconType: IconType): string {
  return iconPaths[iconType] || iconPaths["application-component"]
}

export function Icon({ iconType, className }: { iconType: IconType; className?: string }) {
  const path = getIconPath(iconType)
  return (
    <Image
      src={path}
      alt=""
      // Most of our SVG assets are black; make them readable in dark mode.
      className={["dark:brightness-0 dark:invert", className].filter(Boolean).join(" ")}
      width={24}
      height={24}
    />
  )
}
