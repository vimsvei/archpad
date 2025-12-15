import { z } from "zod";
export declare const CreateDirectoryDtoSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    byDefault: z.ZodOptional<z.ZodBoolean>;
    parentId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateDirectoryDtoSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    byDefault: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    parentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateDirectoryDto = z.infer<typeof CreateDirectoryDtoSchema>;
export type UpdateDirectoryDto = z.infer<typeof UpdateDirectoryDtoSchema>;
