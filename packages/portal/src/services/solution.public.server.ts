import { headers } from "next/headers"
import type { SolutionFull } from "@/@types/solution"

/**
 * Server-side function to fetch solution from public API endpoint.
 * Uses the public API endpoint which doesn't require authentication.
 */
async function fetchSolutionFromPublicApi(idOrCode: string): Promise<any> {
  // Get base URL from headers or environment
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") || 
                   (process.env.NODE_ENV === "production" ? "https" : "http")
  const baseUrl = `${protocol}://${host}`
  
  const url = `${baseUrl}/api/public/solutions/${encodeURIComponent(idOrCode)}`
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Don't cache on server
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    throw new Error(`Public API request failed: ${response.status} ${errorText}`)
  }

  const json = await response.json() as { data?: any; errors?: Array<{ message: string }> }

  if (json.errors && json.errors.length > 0) {
    const errorMessages = json.errors.map((e) => e.message).join("; ")
    throw new Error(`GraphQL errors: ${errorMessages}`)
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data")
  }

  return json.data
}

/**
 * Server-side function to get solution full data.
 * This function is only used in Server Components.
 */
export async function getSolutionPublicServer(idOrCode: string): Promise<SolutionFull | null> {
  try {
    // Fetch solution from public API endpoint
    const data = await fetchSolutionFromPublicApi(idOrCode)
    
    // Check if idOrCode is a UUID (id) or a string (code) to determine response structure
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode)
    
    let solution: any
    if (isUuid) {
      solution = data.solution
    } else {
      solution = Array.isArray(data.solution) ? data.solution[0] : data.solution
    }
    
    if (!solution) {
      console.warn(`Solution not found: ${idOrCode}`)
      return null
    }

    // Map GraphQL data to SolutionFull type
    return {
      id: solution.id,
      code: solution.code,
      name: solution.name,
      description: solution.description ?? null,
      context: solution.context ?? null,
      decision: solution.decision ?? null,
      consequences: solution.consequences ?? null,
      alternatives: solution.alternatives ?? null,
      decisionStatus: solution.decisionStatus ?? null,
      implementationStatus: solution.implementationStatus ?? null,
      createdAt: solution.createdAt ?? null,
      createdBy: solution.createdBy ?? null,
      updatedAt: solution.updatedAt ?? null,
      updatedBy: solution.updatedBy ?? null,
      components: (solution.components || []).map((x: any) => x.component).filter(Boolean),
      functions: [],
      dataObjects: [],
      flows: (solution.flows || []).map((flow: any) => ({
        id: flow.flow?.id,
        code: flow.flow?.code,
        name: flow.flow?.name,
        description: flow.flow?.description ?? null,
        sourceComponent: flow.flow?.sourceComponent ? {
          id: flow.flow.sourceComponent.id,
          code: flow.flow.sourceComponent.code,
          name: flow.flow.sourceComponent.name,
        } : null,
        targetComponent: flow.flow?.targetComponent ? {
          id: flow.flow.targetComponent.id,
          code: flow.flow.targetComponent.code,
          name: flow.flow.targetComponent.name,
        } : null,
      })).filter((x: any) => x.id),
      motivations: (solution.motivations || []).map((x: any) => x.motivation).filter(Boolean),
      stakeholders: (solution.stakeholders || []).map((x: any) => ({
        stakeholderId: x.stakeholder?.id ?? "",
        stakeholderName: x.stakeholder?.name ?? "",
        roleId: x.role ?? "",
        roleName: x.role ?? "",
      })).filter((x: any) => x.stakeholderId),
      technologyNodes: (data.technologyNodes || []).map((x: any) => x.node).filter(Boolean),
      technologyNetworks: [],
    } as SolutionFull
  } catch (error) {
    console.error("Failed to fetch solution:", error)
    // Log more details for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return null
  }
}
