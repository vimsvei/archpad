import { NamedObject } from '../../abstract/named-object.abstract';
import { ManyToOne } from '@mikro-orm/core';
import { LicenseTypeDirectory } from '../../directories/license-type.directory';
import { SoftwareTypeDirectory } from '../../directories/software-type.directory';

export class SystemSoftware extends NamedObject {
  @ManyToOne(
    type => SoftwareTypeDirectory,
    {
      name: 'type_id',
      nullable: true,
      updateRule: "cascade",
      deleteRule: "no action"
    },
  )
  type?: SoftwareTypeDirectory | null;
  
  @ManyToOne(
    type => LicenseTypeDirectory,
    {
      name: 'license_type_id',
      nullable: true,
      updateRule: "cascade",
      deleteRule: "no action"
    },
  )
  license?: LicenseTypeDirectory | null;
  
}
