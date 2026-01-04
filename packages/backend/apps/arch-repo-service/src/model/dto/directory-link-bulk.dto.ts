import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { bulkDirectoryLinkInputSchema } from '@archpad/contract';

export const BulkDirectoryLinkDtoSchema = bulkDirectoryLinkInputSchema;

@ApiExtraModels()
export class BulkDirectoryLinkDto extends createZodDto(
  BulkDirectoryLinkDtoSchema,
) {}
