import { z } from "zod";

/**
 * Minimal "named object" contract used by many create/update DTOs.
 *
 * NOTE: This is intentionally lightweight and framework-agnostic (no Nest decorators).
 */
export const baseNamedObjectSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type BaseNamedObject = z.infer<typeof baseNamedObjectSchema>;








