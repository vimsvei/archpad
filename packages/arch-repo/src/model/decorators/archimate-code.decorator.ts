import { Property, PropertyOptions } from '@mikro-orm/core';

const ARCHIMATE_SEQUENCES = new Set<string>();

export function getArchimateSequences(): string[] {
  return Array.from(ARCHIMATE_SEQUENCES);
}

export function ArchimateCode(
  prefix: string,
  options: PropertyOptions<any> = {},
): PropertyDecorator {
  const seqName = `${prefix.toLowerCase()}_code_seq`;
  ARCHIMATE_SEQUENCES.add(seqName);

  const defaultRaw = `'${prefix}-' || nextval('${seqName}')::text`;

  return Property({
    ...options,
    unique: true,
    defaultRaw,
  }) as PropertyDecorator;
}
