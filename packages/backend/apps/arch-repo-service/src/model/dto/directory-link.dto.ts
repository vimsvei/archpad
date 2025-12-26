import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { directoryLinkDtoSchema } from '@archpad/contract';

export const DirectoryLinkDtoSchema = directoryLinkDtoSchema;

@ApiExtraModels()
export class DirectoryLinkDto extends createZodDto(DirectoryLinkDtoSchema) {}
