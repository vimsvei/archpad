import { Entity, ManyToOne } from '@mikro-orm/core';
import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';

@HasuraTable()
@Entity({ tableName: 'map_application_component_interface' })
export class ApplicationComponentInterfaceMap extends MappedObject {
  @HasuraReference({ objectName: 'component', collectionName: 'interfaces' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraReference({ objectName: 'interface', collectionName: 'components' })
  @ManyToOne({
    entity: () => ApplicationInterface,
    primary: true,
    fieldName: 'interface_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  interface!: ApplicationInterface;
}
