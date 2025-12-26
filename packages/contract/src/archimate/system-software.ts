import { z } from "zod";
import { SystemSoftwareKind } from "./system-software-kind";
import { baseNamedObjectSchema } from "../common/named-object";

export type DirectoryRef = { id: string; name: string };

/**
 * API shape used in portal (Hasura + REST mapping).
 * Keep it stable and boring.
 */
export type SystemSoftware = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  version: string | null;
  kind?: SystemSoftwareKind | null;
  type?: DirectoryRef | null;
  license?: DirectoryRef | null;
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
};

export type SystemSoftwareDirectoryFields = {
  typeId: string | null;
  licenseTypeId: string | null;
};

/**
 * Create/update contract for system software (REST).
 *
 * Mirrors backend DTO constraints (nestjs-zod), but kept framework-agnostic.
 */
export const createSystemSoftwareInputSchema = baseNamedObjectSchema
  .extend({
    // system software code can be generated automatically, so allow omitting it
    code: z.string().optional(),
    version: z.string().optional(),
    kind: z.nativeEnum(SystemSoftwareKind).optional(),
    typeId: z.string().uuid().optional(),
    licenseTypeId: z.string().uuid().optional(),
  })
  .strict();

export const updateSystemSoftwareInputSchema =
  createSystemSoftwareInputSchema.partial().strict();

export type CreateSystemSoftwareInput = z.infer<
  typeof createSystemSoftwareInputSchema
>;
export type UpdateSystemSoftwareInput = z.infer<
  typeof updateSystemSoftwareInputSchema
>;


