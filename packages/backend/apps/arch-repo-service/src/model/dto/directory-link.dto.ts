import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { DirectoryLinkType } from '@/model/enums/directory-link-type.enum';

export const DirectoryLinkDtoSchema = z.object({
  targetId: z.string().uuid(),
  type: z.nativeEnum(DirectoryLinkType),
});

@ApiExtraModels()
export class DirectoryLinkDto extends createZodDto(DirectoryLinkDtoSchema) {}
