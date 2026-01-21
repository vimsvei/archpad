import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { BusinessProcess } from '@/model/archimate/business/business-process.entity';
import { Entity, ManyToOne } from '@mikro-orm/core';

@HasuraTable()
@Entity({ tableName: 'map_business_process_hierarchy' })
export class BusinessProcessHierarchyMap extends MappedObject {
  @HasuraReference({ objectName: 'parent', collectionName: 'children' })
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: BusinessProcess;

  @HasuraReference({ objectName: 'child', collectionName: 'parents' })
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: BusinessProcess;

  order: number = 0;
}
