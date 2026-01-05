import { z } from "zod";
import { DirectoryLinkType } from "./directory-link-type";

export const directoryLinkDtoSchema = z.object({
  targetId: z.string().uuid(),
  type: z.nativeEnum(DirectoryLinkType),
});

export type DirectoryLinkDto = z.infer<typeof directoryLinkDtoSchema>;








