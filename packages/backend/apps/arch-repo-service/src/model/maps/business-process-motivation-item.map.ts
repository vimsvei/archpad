import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { BusinessProcess } from '@/model/archimate/business/business-process.entity';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';

@HasuraTable()
@Entity({ tableName: 'map_business_process_motivation_item' })
export class BusinessProcessMotivationItemMap extends MappedObject {
  @HasuraRefName('motivations')
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  process!: BusinessProcess;

  @HasuraRefName('processes')
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'motivation_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  assessment!: MotivationElementGeneric;
}
