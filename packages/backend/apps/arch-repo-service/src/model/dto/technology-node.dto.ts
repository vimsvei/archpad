import { createZodDto } from 'nestjs-zod';
import { baseNamedObjectSchema } from '@archpad/contract';

export class CreateDtoTechnologyDeviceNode extends createZodDto(
  baseNamedObjectSchema,
) {}

export class CreateDtoTechnologyHostNode extends createZodDto(
  baseNamedObjectSchema,
) {}

export class UpdateDtoTechnologyDeviceNode extends createZodDto(
  baseNamedObjectSchema.partial(),
) {}

export class UpdateDtoTechnologyHostNode extends createZodDto(
  baseNamedObjectSchema.partial(),
) {}
