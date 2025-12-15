import { createZodDto } from 'nestjs-zod';
import { CreateDirectoryDtoSchema, UpdateDirectoryDtoSchema } from '@archpad/contracts';

export class CreateDirectoryDto extends createZodDto(CreateDirectoryDtoSchema) {}
export class UpdateDirectoryDto extends createZodDto(UpdateDirectoryDtoSchema) {}


