import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { StakeholderRoleDirectory } from '@/model/directories/directories';

@HasuraTable()
@Entity({ tableName: 'map_application_component_stakeholder' })
export class ApplicationComponentStakeholderMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName()
  @ManyToOne({
    entity: () => Stakeholder,
    primary: true,
    fieldName: 'stakeholder_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  stakeholder!: Stakeholder;

  @HasuraRefName()
  @ManyToOne({
    entity: () => StakeholderRoleDirectory,
    primary: true,
    fieldName: 'role_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  role!: StakeholderRoleDirectory;
}
