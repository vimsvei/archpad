import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { baseNamedObjectSchema } from '@/model/dto/named-object.dto-factory';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

const systemSoftwareSchema = baseNamedObjectSchema.extend({
  // For system software code can be generated automatically (ArchimateCode),
  // so we allow omitting it on create.
  code: z.string().optional(),
  version: z.string().optional(),
  kind: z.nativeEnum(SystemSoftwareKind).optional(),
  typeId: z.uuid().optional(),
  licenseTypeId: z.uuid().optional(),
});

export class CreateDtoSystemSoftware extends createZodDto(
  systemSoftwareSchema,
) {}

export class UpdateDtoSystemSoftware extends createZodDto(
  systemSoftwareSchema.partial(),
) {}

