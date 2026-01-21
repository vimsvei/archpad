import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { Variant } from '@/model/solution/variant.entity';

@HasuraTable()
@Entity({ tableName: 'map_variant_motivation' })
@Unique({ properties: ['motivation', 'variant'] })
export class VariantMotivationElementMap extends MappedObject {
  // Reverse relationship name on referenced table public.variants.
  @ManyToOne({
    entity: () => Variant,
    primary: true,
    fieldName: 'variant_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  variant!: Variant;

  // Must be unique within referenced table public.motivations (vs SolutionMotivationElementMap.motivation).
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'motivation_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  motivation!: MotivationElementGeneric;
}
