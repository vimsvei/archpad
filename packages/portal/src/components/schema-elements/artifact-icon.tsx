import * as React from "react"

type ArtifactIconProps = {
  size?: number
  className?: string
}

/**
 * Simple "artifact/document" icon with folded corner, to match the schema mockups.
 * We keep it local to schema-elements because it's currently only used in diagrams.
 */
export function ArtifactIcon({ size = 24, className }: ArtifactIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
    >
      <path
        d="M6 3H15L20 8V21H6V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
      <path
        d="M15 3V8H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
    </svg>
  )
}


