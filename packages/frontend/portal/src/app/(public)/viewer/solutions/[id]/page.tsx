import { notFound } from "next/navigation"
import { SolutionViewPage } from "@/components/archimate/solution/view-page"
import { getSolutionPublicServer } from "@/services/solution.public.server"

type SolutionViewRouteProps = {
  params: Promise<{ id: string }>
}

/**
 * Public viewer page for solutions.
 * Supports both UUID (id) and code for human-readable URLs.
 * Example: /viewer/solutions/SOLUTION-001 or /viewer/solutions/{uuid}
 */
export default async function SolutionViewRoute({ params }: SolutionViewRouteProps) {
  const { id } = await params

  try {
    // id can be either UUID or code - getSolutionPublicServer handles both
    const solution = await getSolutionPublicServer(id)
    if (!solution) {
      notFound()
    }

    return <SolutionViewPage solution={solution} />
  } catch (error) {
    console.error("Failed to load solution:", error)
    notFound()
  }
}