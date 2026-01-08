import { z } from "zod";
import { baseNamedObjectSchema } from "../common/named-object";

/**
 * Schema for creating a solution
 */
export const createSolutionSchema = baseNamedObjectSchema.extend({
  // For solutions code can be generated automatically (ArchimateCode),
  // so we allow omitting it on create.
  code: z.string().optional(),
  context: z.string().default(""),
  decision: z.string().default(""),
  consequences: z.string().default(""),
  alternatives: z.string().default(""),
  decisionStatus: z.enum([
    'solution.life-cycle.proposed',
    'solution.life-cycle.accepted',
    'solution.life-cycle.superseded',
    'solution.life-cycle.deprecated',
    'solution.life-cycle.rejected',
  ]).optional(),
  implementationStatus: z.enum([
    'solution.not-started',
    'solution.in-progres',
    'solution.implemented',
    'solution.implementation',
    'solution.rolled_back',
  ]).optional(),
});

export type CreateSolutionDto = z.infer<typeof createSolutionSchema>;

/**
 * Schema for updating a solution with all related entities
 */
export const updateSolutionSchema = baseNamedObjectSchema.extend({
  code: z.string().optional(),
  context: z.string().optional(),
  decision: z.string().optional(),
  consequences: z.string().optional(),
  alternatives: z.string().optional(),
  decisionStatus: z.enum([
    'solution.life-cycle.proposed',
    'solution.life-cycle.accepted',
    'solution.life-cycle.superseded',
    'solution.life-cycle.deprecated',
    'solution.life-cycle.rejected',
  ]).optional(),
  implementationStatus: z.enum([
    'solution.not-started',
    'solution.in-progres',
    'solution.implemented',
    'solution.implementation',
    'solution.rolled_back',
  ]).optional(),
  componentIds: z.array(z.string().uuid()).optional(),
  functionIds: z.array(z.string().uuid()).optional(),
  dataObjectIds: z.array(z.string().uuid()).optional(),
  flowIds: z.array(z.string().uuid()).optional(),
  motivationIds: z.array(z.string().uuid()).optional(),
  stakeholderIds: z
    .array(
      z.object({
        stakeholderId: z.string().uuid(),
        roleId: z.string(), // StakeholderRole enum value
      }),
    )
    .optional(),
  technologyNodeIds: z.array(z.string().uuid()).optional(),
  technologyNetworkIds: z.array(z.string().uuid()).optional(),
});

export type UpdateSolutionDto = z.infer<typeof updateSolutionSchema>;