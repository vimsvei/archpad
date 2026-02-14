import type { ReactNode } from "react"

type DetailLayoutProps = {
  header: ReactNode
  beforeGrid?: ReactNode
  main: ReactNode
  sidebar: ReactNode
}

/**
 * Shared shell for Archimate detail cards:
 * header, optional block before grid, 2/3 content + 1/3 sticky sidebar.
 */
export function DetailLayout({ header, beforeGrid, main, sidebar }: DetailLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-[1800px] mx-auto p-6">
          {header}
          {beforeGrid}
          <div className="grid lg:grid-cols-3 gap-6 min-h-0">
            <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">{main}</div>

            <div className="space-y-6">
              <div className="sticky top-6 space-y-6">{sidebar}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
