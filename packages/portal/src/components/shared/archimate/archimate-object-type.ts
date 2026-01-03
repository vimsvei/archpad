/**
 * Types of ArchiMate objects supported in the application.
 * This is the canonical type definition for all ArchiMate object types.
 */
export type ArchimateObjectType =
  | "application-component"
  | "application-function"
  | "application-data-object"
  | "application-interface"
  | "application-event"
  | "system-software"
  | "technology-node"
  | "technology-network"

/**
 * Types used in sheet configurations.
 * These are the keys used in SHEET_CONFIGS and may differ from ArchimateObjectType
 * to match UI conventions (plural forms, short names, context-specific names).
 */
export type SheetType =
  | "system-software"
  | "data-objects" // Plural form (uses application-data-object icon)
  | "parent" // Uses application-component icon
  | "child" // Uses application-component icon
  | "functions" // Plural form (uses application-function icon)
  | "interfaces" // Plural form (uses application-interface icon)
  | "events" // Plural form (uses application-event icon)
  | "node" // Short form for technology-node
  | "network" // Short form for technology-network
  | "flows" // Application flows

/**
 * Map ArchimateObjectType to SheetType for sheet configurations.
 * This ensures we can use the object type directly in sheet configs.
 */
export function getSheetTypeFromObjectType(
  objectType: ArchimateObjectType
): SheetType {
  switch (objectType) {
    case "application-component":
      // For icon display, we can use "parent" which has the same icon
      // But typically we'd use a direct mapping if we had one
      // For now, using "parent" as it shares the application-component icon
      return "parent"
    case "application-data-object":
      return "data-objects"
    case "application-function":
      return "functions"
    case "application-interface":
      return "interfaces"
    case "application-event":
      return "events"
    case "system-software":
      return "system-software"
    case "technology-node":
      return "node"
    case "technology-network":
      return "network"
    default:
      // Fallback - should not happen with proper typing
      return "system-software"
  }
}

