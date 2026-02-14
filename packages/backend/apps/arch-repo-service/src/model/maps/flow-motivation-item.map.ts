import {HasuraReference, HasuraTable, MappedObject} from '@archpad/models';
import {Entity, ManyToOne} from '@mikro-orm/core';
import {MotivationElementGeneric} from '@/model/archimate/core/motivation-element.generic';
import {FlowGeneric} from "@/model/archimate/core/flow.generic";

@HasuraTable()
@Entity({ tableName: 'map_flow_motivation_item' })
export class FlowMotivationItemMap extends MappedObject {
  
  @HasuraReference({ objectName: 'flow', collectionName: 'motivations' })
  @ManyToOne({
    entity: () => FlowGeneric,
    primary: true,
    fieldName: 'flow_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  flow!: FlowGeneric;

  @HasuraReference({ objectName: 'assessment', collectionName: 'flows' })
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'motivation_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  assessment!: MotivationElementGeneric;
}
