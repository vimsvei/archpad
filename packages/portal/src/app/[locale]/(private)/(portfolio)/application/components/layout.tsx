import * as React from "react"
import { ApplicationComponentsScope } from "@/components/application-components/application-components-scope"

export default function ApplicationComponentsLayout({ children }: { children: React.ReactNode }) {
  return <ApplicationComponentsScope>{children}</ApplicationComponentsScope>
}


