import {HasuraRefName, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne} from "@mikro-orm/core";
import {BusinessProcess} from "@/model/archimate/business/business-process.entity";
import {Assessment} from "@/model/archimate/motivation/assessment.entity";

@HasuraTable()
@Entity({ tableName: 'map_business_process_assessment' })
export class BusinessProcessAssessmentMap extends MappedObject {
  
  @HasuraRefName('assessments')
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
    entity: () => Assessment,
    primary: true,
    fieldName: 'assessment_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  assessment!: Assessment;
}
