import * as React from "react"
import { DirectoriesScope } from "@/components/directories/directories-scope"

export default function DirectoriesLayout({ children }: { children: React.ReactNode }) {
  return <DirectoriesScope>{children}</DirectoriesScope>
}




