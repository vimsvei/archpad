import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { StakeholderRole } from '@/model/enums/stakeholder-role.enum';

@HasuraTable()
@Entity({ tableName: 'map_application_component_stakeholder' })
export class ApplicationComponentStakeholderMap extends MappedObject {
  @HasuraReference({ objectName: 'component', collectionName: 'stakeholders' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraReference({ objectName: 'stakeholder', collectionName: 'components' })
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
