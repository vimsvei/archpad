import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { Environment } from '@/model/enums/environment.enum';

const uuidSchema = z.string().uuid();

const optionalNullableUuidSchema = z
  .union([uuidSchema, z.null()])
  .optional();

const baseFlowSchema = z.object({
  code: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1),
  description: z.string().optional(),
  motivationIds: z.array(uuidSchema).optional(),
  solutionIds: z.array(uuidSchema).optional(),
});

const createApplicationFlowSchema = baseFlowSchema.extend({
  layer: z.literal(LayerKind.APPLICATION),
  sourceComponentId: uuidSchema,
  sourceFunctionId: optionalNullableUuidSchema,
  targetComponentId: uuidSchema,
  targetFunctionId: optionalNullableUuidSchema,
  requestDataObjectId: optionalNullableUuidSchema,
  responseDataObjectId: optionalNullableUuidSchema,
  proxyComponentIds: z.array(uuidSchema).optional(),
});

const createTechnologyFlowSchema = baseFlowSchema.extend({
  layer: z.literal(LayerKind.TECHNOLOGY),
  environment: z.nativeEnum(Environment).optional(),
  sourceNodeId: uuidSchema,
  sourcePortId: uuidSchema,
  targetNodeId: uuidSchema,
  targetPortId: uuidSchema,
  proxyNodeIds: z.array(uuidSchema).optional(),
});

export const createFlowSchema = z.discriminatedUnion('layer', [
  createApplicationFlowSchema,
  createTechnologyFlowSchema,
]);

export const updateFlowSchema = z.object({
  code: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1).optional(),
  description: z.union([z.string(), z.null()]).optional(),

  sourceComponentId: uuidSchema.optional(),
  sourceFunctionId: optionalNullableUuidSchema,
  targetComponentId: uuidSchema.optional(),
  targetFunctionId: optionalNullableUuidSchema,
  requestDataObjectId: optionalNullableUuidSchema,
  responseDataObjectId: optionalNullableUuidSchema,

  environment: z.nativeEnum(Environment).optional(),
  sourceNodeId: uuidSchema.optional(),
  sourcePortId: uuidSchema.optional(),
  targetNodeId: uuidSchema.optional(),
  targetPortId: uuidSchema.optional(),

  proxyComponentIds: z.array(uuidSchema).optional(),
  proxyNodeIds: z.array(uuidSchema).optional(),
  motivationIds: z.array(uuidSchema).optional(),
  solutionIds: z.array(uuidSchema).optional(),
});

export class CreateDtoFlow extends createZodDto(createFlowSchema as any) {}

export class UpdateDtoFlow extends createZodDto(updateFlowSchema) {}
