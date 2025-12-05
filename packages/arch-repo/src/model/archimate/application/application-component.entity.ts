import { ApiProperty } from '@nestjs/swagger';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { LicenseTypeDirectory } from '@/model/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/directories/critical-level.directory';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationFunctionDataObject } from '@/model/maps/application-function-data-object.map';
import { ApplicationComponentProductMap } from '@/model/maps/application-component-product.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentTechnologyNodeMap } from '@/model/maps/application-component-technology-node.map';

@Entity({ tableName: 'components' })
export class ApplicationComponent extends ArchimateElementGeneric {
  @ArchimateCode('COMP')
  override code: string = undefined as any;

  // @ApiProperty({
  //   format: 'uuid',
  //   type: LicenseTypeDirectory,
  //   description: 'Тип лицензии',
  // })
  @ManyToOne({
    entity: () => LicenseTypeDirectory,
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license!: LicenseTypeDirectory;

  // @ApiProperty({
  //   format: 'uuid',
  //   type: ArchitectureStyleDirectory,
  //   description: 'Архитектурный стиль компонента',
  // })
  @ManyToOne({
    entity: () => ArchitectureStyleDirectory,
    name: 'style_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  architectureStyle!: ArchitectureStyleDirectory;

  // @ApiProperty({
  //   format: 'uuid',
  //   type: CriticalLevelDirectory,
  //   description: 'Уровень критичности',
  // })
  @ManyToOne({
    entity: () => CriticalLevelDirectory,
    name: 'critical_level_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  criticalLevel!: CriticalLevelDirectory;

  @OneToMany({
    entity: () => ApplicationComponentFunctionMap,
    mappedBy: 'component',
  })
  functions = new Collection<ApplicationComponentFunctionMap>(this);

  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'component',
  })
  events = new Collection<ApplicationComponentEventMap>(this);

  @OneToMany({ entity: () => ApplicationInterface, mappedBy: 'component' })
  interfaces = new Collection<ApplicationInterface>(this);

  @OneToMany({
    entity: () => ApplicationComponentDataObjectMap,
    mappedBy: 'component',
  })
  dataObjects = new Collection<ApplicationComponentDataObjectMap>(this);

  @OneToMany({
    entity: () => ApplicationFunctionDataObject,
    mappedBy: 'component',
  })
  dataObjectUsages = new Collection<ApplicationFunctionDataObject>(this);

  @OneToMany({
    entity: () => ApplicationComponentProductMap,
    mappedBy: 'component',
  })
  products = new Collection<ApplicationComponentProductMap>(this);

  @OneToMany({
    entity: () => ApplicationComponentSystemSoftwareMap,
    mappedBy: 'component',
  })
  systemSoftware = new Collection<ApplicationComponentSystemSoftwareMap>(this);

  @OneToMany({
    entity: () => ApplicationComponentTechnologyNodeMap,
    mappedBy: 'component',
  })
  nodes = new Collection<ApplicationComponentTechnologyNodeMap>(this);
}
