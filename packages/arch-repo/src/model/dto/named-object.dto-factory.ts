import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Type } from '@nestjs/common';

export const baseNamedObjectSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export function createNamedObjectZodDto(dtoName: string): Type<any> {
  const schema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
  });
  
  class BaseDto extends createZodDto(schema) {}
  Object.defineProperty(BaseDto, 'name', { value: dtoName });
  
  return BaseDto as Type<any>;
}
