import * as React from "react"

export type ApplicationComponentIconProps = React.SVGProps<SVGSVGElement>

export function ApplicationComponentIcon({ ...props }: ApplicationComponentIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22 22H8V15H9V21H21V3H9V5H8V2H22V22ZM9 11H8V9H9V11Z" fill="currentColor" />
      <rect x="2.5" y="11.5" width="9" height="3" stroke="currentColor" />
      <rect x="2.5" y="5.5" width="9" height="3" stroke="currentColor" />
    </svg>
  )
}
