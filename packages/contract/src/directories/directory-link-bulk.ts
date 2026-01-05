import { z } from "zod";
import { DirectoryLinkType } from "./directory-link-type";

/**
 * Bulk directory link input:
 * allows referencing entities by either id or code (idempotent imports).
 */
export const bulkDirectoryLinkInputSchema = z
  .object({
    sourceId: z.string().uuid().optional(),
    sourceCode: z.string().min(1).optional(),
    targetId: z.string().uuid().optional(),
    targetCode: z.string().min(1).optional(),
    type: z.nativeEnum(DirectoryLinkType),
  })
  .superRefine((v, ctx) => {
    if (!v.sourceId && !v.sourceCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "sourceId or sourceCode is required",
        path: ["sourceId"],
      });
    }
    if (!v.targetId && !v.targetCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "targetId or targetCode is required",
        path: ["targetId"],
      });
    }
  });

export type BulkDirectoryLinkInput = z.infer<
  typeof bulkDirectoryLinkInputSchema
>;








