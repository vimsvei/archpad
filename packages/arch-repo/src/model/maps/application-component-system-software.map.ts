import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, Enum, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

@Entity({ tableName: 'map_application_component_system_software' })
export class ApplicationComponentSystemSoftwareMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => SystemSoftware,
    primary: true,
    fieldName: 'system_software_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  systemSoftware!: SystemSoftware;

  @Enum({
    items: () => SystemSoftwareKind,
    nativeEnumName: 'system_software_kind_enum',
    default: SystemSoftwareKind.LIBRARY,
  })
  kind!: SystemSoftwareKind;
}
