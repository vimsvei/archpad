import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { CapabilityApplicationComponentMap } from '@/model/maps/capability-application-component.map';
import { CapabilityAssessment } from '@/model/archimate/motivation/assessment.entity';
import { CapabilityBusinessProcessMap } from '@/model/maps/capability-business-process.map';

@HasuraTable()
@Entity({ tableName: 'map_capability_business_process_assessment' })
export class CapabilityBusinessProcessAssessmentMap extends MappedObject {
  @ManyToOne({
    entity: () => CapabilityBusinessProcessMap,
    primary: true,
    joinColumns: ['capability_id', 'process_id'],
    referencedColumnNames: ['capability_id', 'process_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  processCapability!: CapabilityBusinessProcessMap;

  @ManyToOne({
    entity: () => CapabilityAssessment,
    primary: true,
    fieldName: 'assessment_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  assessment!: CapabilityAssessment;
}
