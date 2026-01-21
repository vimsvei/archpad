import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { BusinessProcess } from '@/model/archimate/business/business-process.entity';
import { Capability } from '@/model/archimate/strategy/capability.entity';

@HasuraTable()
@Entity({ tableName: 'map_capability_business_process' })
export class CapabilityBusinessProcessMap extends MappedObject {
  @HasuraReference({ objectName: 'capability', collectionName: 'processes' })
  @ManyToOne({
    entity: () => Capability,
    primary: true,
    fieldName: 'capability_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  capability!: Capability;

  @HasuraReference({ objectName: 'process', collectionName: 'capabilities' })
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  process!: BusinessProcess;
}
