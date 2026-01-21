import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { CapabilityApplicationComponentMap } from '@/model/maps/capability-application-component.map';
import { CapabilityAssessment } from '@/model/archimate/motivation/assessment.entity';

@HasuraTable()
@Entity({ tableName: 'map_capability_application_component_assessment' })
export class CapabilityApplicationComponentAssessmentMap extends MappedObject {
  @ManyToOne({
    entity: () => CapabilityApplicationComponentMap,
    primary: true,
    joinColumns: ['capability_id', 'component_id'],
    referencedColumnNames: ['capability_id', 'component_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  componentCapability!: CapabilityApplicationComponentMap;

  @ManyToOne({
    entity: () => CapabilityAssessment,
    primary: true,
    fieldName: 'assessment_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  assessment!: CapabilityAssessment;
}
