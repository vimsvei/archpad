import { createZodDto } from 'nestjs-zod';
import { Type } from '@nestjs/common';
import { baseNamedObjectSchema } from '@archpad/contract';

// Backward-compatible re-export for existing DTOs that import it from this module.
export { baseNamedObjectSchema } from '@archpad/contract';

export function createNamedObjectZodDto(dtoName: string): Type<any> {
  const schema = baseNamedObjectSchema;

  class BaseDto extends createZodDto(schema) {}
  Object.defineProperty(BaseDto, 'name', { value: dtoName });

  return BaseDto as Type<any>;
}
