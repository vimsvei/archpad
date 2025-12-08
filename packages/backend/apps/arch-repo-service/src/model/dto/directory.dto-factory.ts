import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Базовая Zod-схема, может использоваться повторно
export const BaseDirectorySchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().optional(),
  byDefault: z.boolean().optional(),
  parentId: z.uuid().optional(),
});

// Функция-фабрика для создания DTO-классов
export function createDirectoryZodDto(name: string) {
  const dto = createZodDto(BaseDirectorySchema);
  Object.defineProperty(dto, 'name', { value: name });
  return dto;
}
