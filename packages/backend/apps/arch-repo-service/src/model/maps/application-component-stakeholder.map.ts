import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { StakeholderRoleDirectory } from '@/model/directories/directories';

@Entity({ tableName: 'map_application_component_stakeholder' })
export class ApplicationComponentStakeholderMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => Stakeholder,
    primary: true,
    fieldName: 'stakeholder_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  stakeholder!: Stakeholder;

  @ManyToOne({
    entity: () => StakeholderRoleDirectory,
    primary: true,
    fieldName: 'role_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  role!: StakeholderRoleDirectory;
}
