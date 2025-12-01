import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { LicenseTypeDirectory } from '../../directories/license-type.directory';
import { SoftwareTypeDirectory } from '../../directories/software-type.directory';
import { TechnologyNodeSystemSoftwareMap } from '@/model/entities/maps/technology-node-system-software.map';

@Entity({ tableName: 'system_software' })
export class SystemSoftware extends NamedObject {
  @ManyToOne((type) => SoftwareTypeDirectory, {
    name: 'type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type?: SoftwareTypeDirectory | null;

  @ManyToOne((type) => LicenseTypeDirectory, {
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license?: LicenseTypeDirectory | null;

  @OneToMany({
    entity: () => TechnologyNodeSystemSoftwareMap,
    mappedBy: 'systemSoftware',
  })
  nodes = new Collection<TechnologyNodeSystemSoftwareMap>(this);
}
