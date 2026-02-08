import type { SolutionFull } from "@/@types/solution"
import { getSolutionFullGraphql } from "./solution.graphql"

/**
 * Get solution for public viewer zone.
 * Supports both UUID (id) and code for human-readable URLs.
 * @param idOrCode - Solution UUID or code
 */
export async function getSolutionPublic(idOrCode: string): Promise<SolutionFull | null> {
  try {
    // getSolutionFullGraphql automatically detects if idOrCode is UUID or code
    const data = await getSolutionFullGraphql(idOrCode)
    // Map GraphQL data to SolutionFull type
    return {
      ...data,
      flows: data.flows || [],
      stakeholders: data.stakeholders || [],
    } as SolutionFull
  } catch (error) {
    console.error("Failed to fetch solution:", error)
    return null
  }
}