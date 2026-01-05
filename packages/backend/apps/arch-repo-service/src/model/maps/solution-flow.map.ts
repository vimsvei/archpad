import {HasuraRefName, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {Solution} from "@/model/solution/solution.entity";
import {FlowGeneric} from "@/model/archimate/core/flow.generic";
import {ApiProperty} from "@nestjs/swagger";
import {MappedSolutionObject} from "@/model/abstract/mapped-solution-object.abstract";

@HasuraTable()
@Entity({ tableName: 'map_solution_data_object' })
export class SolutionFlowMap extends MappedSolutionObject {
  
  @ApiProperty({ description: 'System name in solution', required: true })
  @Property({ type: 'string', nullable: true })
  label!: string;
  
  @HasuraRefName('flows')
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;
  
  @HasuraRefName('solutions')
  @ManyToOne({
    entity: () => FlowGeneric,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  flow!: FlowGeneric;
}
