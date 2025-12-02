import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
} from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { LicenseTypeDirectory } from '../../directories/license-type.directory';
import { SoftwareTypeDirectory } from '../../directories/software-type.directory';
import { TechnologyNodeSystemSoftwareMap } from '@/model/entities/maps/technology-node-system-software.map';
import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import { SystemSoftwareVersion } from '@/model/entities/archimate/technology/system-software-version.entity';
import { ApplicationComponentSystemSoftwareMap } from '@/model/entities/maps/application-component-system-software.map';

@Entity({
  tableName: 'system_software',
  abstract: true,
  discriminatorColumn: 'kind',
})
export class SystemSoftware extends ArchimateElementGeneric {
  @Enum({
    items: () => SystemSoftwareKind,
    nativeEnumName: 'system_software_kind_enum',
  })
  kind!: SystemSoftwareKind;

  @ArchimateCode('SOFTWARE')
  override code: string = undefined as any;

  @ManyToOne(() => SoftwareTypeDirectory, {
    name: 'type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type!: SoftwareTypeDirectory;

  @ManyToOne(() => LicenseTypeDirectory, {
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license!: LicenseTypeDirectory;

  @ManyToOne({
    entity: () => SystemSoftwareVersion,
    name: 'default_version_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  defaultVersion!: SystemSoftwareVersion;

  @OneToMany({
    entity: () => SystemSoftwareVersion,
    mappedBy: 'systemSoftware',
  })
  versions = new Collection<SystemSoftwareVersion>(this);

  @OneToMany({
    entity: () => TechnologyNodeSystemSoftwareMap,
    mappedBy: 'systemSoftware',
  })
  nodes = new Collection<TechnologyNodeSystemSoftwareMap>(this);

  @OneToMany({
    entity: () => ApplicationComponentSystemSoftwareMap,
    mappedBy: 'systemSoftware',
  })
  components = new Collection<ApplicationComponentSystemSoftwareMap>(this);
}
