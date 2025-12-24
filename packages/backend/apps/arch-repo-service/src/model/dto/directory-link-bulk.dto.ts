import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { DirectoryLinkType } from '@/model/enums/directory-link-type.enum';

export const BulkDirectoryLinkDtoSchema = z.object({
  // allow resolving by either id or code
  sourceId: z.string().uuid().optional(),
  sourceCode: z.string().min(1).optional(),
  targetId: z.string().uuid().optional(),
  targetCode: z.string().min(1).optional(),
  type: z.nativeEnum(DirectoryLinkType),
}).superRefine((v, ctx) => {
  if (!v.sourceId && !v.sourceCode) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'sourceId or sourceCode is required', path: ['sourceId'] });
  }
  if (!v.targetId && !v.targetCode) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'targetId or targetCode is required', path: ['targetId'] });
  }
});

@ApiExtraModels()
export class BulkDirectoryLinkDto extends createZodDto(BulkDirectoryLinkDtoSchema) {}


