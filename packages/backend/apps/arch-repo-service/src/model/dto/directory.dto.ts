import { z } from "zod"
import { createZodDto } from 'nestjs-zod';

export const CreateDirectoryDtoSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().optional(),
  byDefault: z.boolean().optional(),
  parentId: z.string().uuid().optional(),
})

export const UpdateDirectoryDtoSchema = CreateDirectoryDtoSchema.partial()

export type CreateDirectoryDtoType = z.infer<typeof CreateDirectoryDtoSchema>
export type UpdateDirectoryDtoType = z.infer<typeof UpdateDirectoryDtoSchema>

export class CreateDirectoryDto extends createZodDto(CreateDirectoryDtoSchema) {}
export class UpdateDirectoryDto extends createZodDto(UpdateDirectoryDtoSchema) {}
