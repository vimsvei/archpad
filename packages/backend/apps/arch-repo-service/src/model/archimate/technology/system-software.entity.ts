import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ArchimateCode, HasuraReference, HasuraTable } from '@archpad/models';
import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApiProperty } from '@nestjs/swagger';
import {
  LicenseTypeDirectory,
  SoftwareTypeDirectory,
} from '@/model/directories/directories';
import {TechnologyRadarZone} from "@/model/enums/technology-radar-zone.enum";

@HasuraTable()
@Entity({
  tableName: 'system_software',
  abstract: true,
  discriminatorColumn: 'kind',
})
export class SystemSoftware extends ArchimateElementGeneric {
  @ApiProperty({ enum: SystemSoftwareKind, default: SystemSoftwareKind.OTHER })
  @Enum({
    items: () => SystemSoftwareKind,
    nativeEnumName: 'system_software_kind_enum',
    default: SystemSoftwareKind.OTHER,
  })
  kind!: SystemSoftwareKind;

  @ArchimateCode('SOFTWARE')
  override code: string = undefined as any;

  @ApiProperty()
  @Property({ type: String, nullable: true })
  version!: string;
  
  @ApiProperty({ enum: TechnologyRadarZone, default: TechnologyRadarZone.ADOPT })
  @Enum({
    items: () => TechnologyRadarZone,
    nativeEnumName: 'technology_radar_zone',
    default: TechnologyRadarZone.ADOPT,
  })
  radarArea!: TechnologyRadarZone;

  @ManyToOne({
    entity: () => SoftwareTypeDirectory,
    name: 'type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type!: SoftwareTypeDirectory;

  @ManyToOne({
    entity: () => LicenseTypeDirectory,
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license!: LicenseTypeDirectory;

  @HasuraReference({ objectName: 'systemSoftware', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentSystemSoftwareMap,
    mappedBy: 'systemSoftware',
  })
  components = new Collection<ApplicationComponentSystemSoftwareMap>(this);
}
