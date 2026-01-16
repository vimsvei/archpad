import { createZodDto } from 'nestjs-zod';
import { createSolutionSchema, updateSolutionSchema } from '@archpad/contract';

export class CreateDtoSolution extends createZodDto(createSolutionSchema) {}

export class UpdateDtoSolution extends createZodDto(updateSolutionSchema) {}
