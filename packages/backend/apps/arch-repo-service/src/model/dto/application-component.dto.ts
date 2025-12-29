import { createZodDto } from 'nestjs-zod';
import {
  createApplicationComponentSchema,
  updateApplicationComponentSchema,
} from '@archpad/contract';

export class CreateDtoApplicationComponent extends createZodDto(
  createApplicationComponentSchema,
) {}

export class UpdateDtoApplicationComponent extends createZodDto(
  updateApplicationComponentSchema,
) {}
