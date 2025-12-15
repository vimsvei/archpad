import { z } from "zod"

export const CreateDirectoryDtoSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().optional(),
  byDefault: z.boolean().optional(),
  parentId: z.string().uuid().optional(),
})

export const UpdateDirectoryDtoSchema = CreateDirectoryDtoSchema.partial()

export type CreateDirectoryDto = z.infer<typeof CreateDirectoryDtoSchema>
export type UpdateDirectoryDto = z.infer<typeof UpdateDirectoryDtoSchema>


