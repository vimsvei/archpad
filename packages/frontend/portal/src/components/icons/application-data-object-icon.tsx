import * as React from "react"

export type ApplicationDataObjectIconProps = React.SVGProps<SVGSVGElement>

export function ApplicationDataObjectIcon({ ...props }: ApplicationDataObjectIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2.5" y="6.5" width="19" height="15" stroke="currentColor" />
      <rect x="2.5" y="2.5" width="19" height="4" stroke="currentColor" />
    </svg>
  )
}
