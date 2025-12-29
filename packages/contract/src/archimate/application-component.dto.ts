import { z } from "zod";
import { baseNamedObjectSchema } from "../common/named-object";

/**
 * Schema for creating an application component
 */
export const createApplicationComponentSchema = baseNamedObjectSchema.extend({
  // For application components code can be generated automatically (ArchimateCode),
  // so we allow omitting it on create.
  code: z.string().optional(),
  stateId: z.string().uuid().optional().nullable(),
});

export type CreateApplicationComponentDto = z.infer<typeof createApplicationComponentSchema>;

/**
 * Schema for updating an application component with all related entities
 */
export const updateApplicationComponentSchema = baseNamedObjectSchema.extend({
  code: z.string().optional(),
  stateId: z.string().uuid().optional().nullable(),
  licenseTypeId: z.string().uuid().optional().nullable(),
  architectureStyleId: z.string().uuid().optional().nullable(),
  criticalLevelId: z.string().uuid().optional().nullable(),
  failoverTypeId: z.string().uuid().optional().nullable(),
  recoveryTimeId: z.string().uuid().optional().nullable(),
  redundancyTypeId: z.string().uuid().optional().nullable(),
  monitoringLevelId: z.string().uuid().optional().nullable(),
  scalingTypeId: z.string().uuid().optional().nullable(),
  functionIds: z.array(z.string().uuid()).optional(),
  dataObjectIds: z.array(z.string().uuid()).optional(),
  interfaceIds: z.array(z.string().uuid()).optional(),
  eventIds: z.array(z.string().uuid()).optional(),
  systemSoftwareIds: z
    .array(
      z.object({
        id: z.string().uuid(),
        kind: z.string().optional(),
      }),
    )
    .optional(),
  technologyNodeIds: z.array(z.string().uuid()).optional(),
  technologyNetworkIds: z.array(z.string().uuid()).optional(),
  parentIds: z.array(z.string().uuid()).optional(),
  childIds: z.array(z.string().uuid()).optional(),
});

export type UpdateApplicationComponentDto = z.infer<typeof updateApplicationComponentSchema>;

