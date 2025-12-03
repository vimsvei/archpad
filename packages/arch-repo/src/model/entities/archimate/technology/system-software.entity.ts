import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { LicenseTypeDirectory } from '@directory/license-type.directory';
import { SoftwareTypeDirectory } from '@directory/software-type.directory';
import { TechnologyNodeSystemSoftwareMap } from '@/model/entities/maps/technology-node-system-software.map';
import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import { ApplicationComponentSystemSoftwareMap } from '@/model/entities/maps/application-component-system-software.map';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'system_software',
  abstract: true,
  discriminatorColumn: 'kind',
})
export class SystemSoftware extends ArchimateElementGeneric {
  @ApiProperty({ example: SystemSoftwareKind })
  @Enum({
    items: () => SystemSoftwareKind,
    nativeEnumName: 'system_software_kind_enum',
  })
  kind!: SystemSoftwareKind;

  @ArchimateCode('SOFTWARE')
  override code: string = undefined as any;

  @ApiProperty()
  @Property({ type: String, nullable: true })
  version!: string;

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
