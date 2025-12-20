import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { baseNamedObjectSchema } from '@/model/dto/named-object.dto-factory';

const applicationComponentSchema = baseNamedObjectSchema.extend({
  // For application components code can be generated automatically (ArchimateCode),
  // so we allow omitting it on create.
  code: z.string().optional(),
  licenseTypeId: z.uuid().optional(),
  styleId: z.uuid().optional(),
  criticalLevelId: z.uuid().optional(),
});

export class CreateDtoApplicationComponent extends createZodDto(
  applicationComponentSchema,
) {}

export class UpdateDtoApplicationComponent extends createZodDto(
  applicationComponentSchema.partial(),
) {}
