import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { HasuraRefName, HasuraTable } from '@archpad/models';
import { Entity, Enum, ManyToOne, Unique } from '@mikro-orm/core';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { Solution } from '@/model/solution/solution.entity';
import { StakeholderRole } from '@/model/enums/stakeholder-role.enum';

@HasuraTable()
@Entity({ tableName: 'map_solution_stakeholder' })
@Unique({ properties: ['stakeholder', 'solution'] })
export class SolutionStakeholderMap extends MappedSolutionObject {
  @HasuraRefName('stakeholders')
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
    entity: () => Stakeholder,
    primary: true,
    fieldName: 'stakeholder_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  stakeholder!: Stakeholder;

  @Enum({
    items: () => StakeholderRole,
    nativeEnumName: 'stakeholder_role_enum',
    default: StakeholderRole.ENTERPRISE_ARCHITECT,
  })
  role!: StakeholderRole;
}
