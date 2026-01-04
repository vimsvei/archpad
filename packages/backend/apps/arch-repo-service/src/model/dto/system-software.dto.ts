import { createZodDto } from 'nestjs-zod';
import {
  createSystemSoftwareInputSchema,
  updateSystemSoftwareInputSchema,
} from '@archpad/contract';

export class CreateDtoSystemSoftware extends createZodDto(
  createSystemSoftwareInputSchema,
) {}

export class UpdateDtoSystemSoftware extends createZodDto(
  updateSystemSoftwareInputSchema,
) {}
