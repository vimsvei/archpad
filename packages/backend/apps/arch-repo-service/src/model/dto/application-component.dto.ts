import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { baseNamedObjectSchema } from '@/model/dto/named-object.dto-factory';

const applicationComponentSchema = baseNamedObjectSchema.extend({
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
