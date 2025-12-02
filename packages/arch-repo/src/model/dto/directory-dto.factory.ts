import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

// Базовая Zod-схема, может использоваться повторно
export const BaseDirectorySchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().optional(),
  byDefault: z.boolean().optional(),
  parentId: z.string().uuid().optional(),
});

// Функция-фабрика для создания DTO-классов
export function createDirectoryZodDto(name: string) {
  const schema = BaseDirectorySchema;
  
  class ZodDto extends createZodDto(schema) {}
  Object.defineProperty(ZodDto, 'name', { value: name });
  
  return ZodDto; // ← здесь ты НЕ экспортируешь сам тип
}
