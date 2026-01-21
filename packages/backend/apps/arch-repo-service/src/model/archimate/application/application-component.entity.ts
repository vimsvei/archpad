import { ApiProperty } from '@nestjs/swagger';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { ArchimateCode, HasuraReference, HasuraTable } from '@archpad/models';
import { ArchimateElementGeneric } from '../core/archimate-element.generic';
import { ApplicationComponentFunctionMap } from '../../maps/application-component-function.map';
import { ApplicationComponentEventMap } from '../../maps/application-component-event.map';
import { ApplicationComponentDataObjectMap } from '../../maps/application-component-data-object.map';
import { ApplicationComponentProductMap } from '../../maps/application-component-product.map';
import { ApplicationComponentSystemSoftwareMap } from '../../maps/application-component-system-software.map';
import { ApplicationComponentTechnologyNodeMap } from '../../maps/application-component-technology-node.map';
import { SolutionApplicationComponentMap } from '../../maps/solution-application-component.map';
import {
  ArchitectureStyleDirectory,
  ComponentStateDirectory,
  CriticalLevelDirectory,
  FailoverTypeDirectory,
  LicenseTypeDirectory,
  MonitoringLevelDirectory,
  RecoveryTimeDirectory,
  RedundancyTypeDirectory,
  ScalingTypeDirectory,
} from '@/model/directories/directories';
import { ApplicationComponentTechnologyLogicalNetworkMap } from '@/model/maps/application-component-technology-logical-network.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';

@HasuraTable()
@Entity({ tableName: 'components' })
export class ApplicationComponent extends ArchimateElementGeneric {
  @ArchimateCode('COMP')
  override code: string = undefined as any;

  @ApiProperty({
    format: 'uuid',
    type: ComponentStateDirectory,
    description: 'Статус компонента',
  })
  @ManyToOne({
    entity: () => ComponentStateDirectory,
    name: 'state_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  state!: ComponentStateDirectory;

  @ApiProperty({
    format: 'uuid',
    type: LicenseTypeDirectory,
    description: 'Тип лицензии',
  })
  @ManyToOne({
    entity: () => LicenseTypeDirectory,
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license!: LicenseTypeDirectory;

  @ApiProperty({
    format: 'uuid',
    type: ArchitectureStyleDirectory,
    description: 'Архитектурный стиль компонента',
  })
  @ManyToOne({
    entity: () => ArchitectureStyleDirectory,
    name: 'style_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  architectureStyle!: ArchitectureStyleDirectory;

  @ApiProperty({
    format: 'uuid',
    type: CriticalLevelDirectory,
    description: 'Уровень критичности',
  })
  @ManyToOne({
    entity: () => CriticalLevelDirectory,
    name: 'critical_level_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  criticalLevel!: CriticalLevelDirectory;

  @ApiProperty({
    format: 'uuid',
    type: FailoverTypeDirectory,
    description: 'Скорость восстановления',
  })
  @ManyToOne({
    entity: () => FailoverTypeDirectory,
    name: 'failover_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  failoverType!: FailoverTypeDirectory;

  @ApiProperty({
    format: 'uuid',
    type: RecoveryTimeDirectory,
    description: 'Скорость восстановления',
  })
  @ManyToOne({
    entity: () => RecoveryTimeDirectory,
    name: 'recovery_time_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  recoveryTime!: RecoveryTimeDirectory;

  @ApiProperty({
    format: 'uuid',
    type: RedundancyTypeDirectory,
    description: 'Избыточность',
  })
  @ManyToOne({
    entity: () => RedundancyTypeDirectory,
    name: 'redundancy_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  redundancyType!: RedundancyTypeDirectory;

  @ApiProperty({
    format: 'uuid',
    type: MonitoringLevelDirectory,
    description: 'Уровень мониторинга',
  })
  @ManyToOne({
    entity: () => MonitoringLevelDirectory,
    name: 'monitoring_level_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  monitoringLevel!: MonitoringLevelDirectory;

  @ApiProperty({
    format: 'uuid',
    type: ScalingTypeDirectory,
    description: 'Тип масштабирования',
  })
  @ManyToOne({
    entity: () => ScalingTypeDirectory,
    name: 'scaling_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  scalingType!: ScalingTypeDirectory;

  @HasuraReference({ objectName: 'component', collectionName: 'functions' })
  @OneToMany({
    entity: () => ApplicationComponentFunctionMap,
    mappedBy: 'component',
  })
  functions = new Collection<ApplicationComponentFunctionMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'events' })
  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'component',
  })
  events = new Collection<ApplicationComponentEventMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'interfaces' })
  @OneToMany({
    entity: () => ApplicationComponentInterfaceMap,
    mappedBy: 'component',
  })
  interfaces = new Collection<ApplicationComponentInterfaceMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'dataObjects' })
  @OneToMany({
    entity: () => ApplicationComponentDataObjectMap,
    mappedBy: 'component',
  })
  dataObjects = new Collection<ApplicationComponentDataObjectMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'products' })
  @OneToMany({
    entity: () => ApplicationComponentProductMap,
    mappedBy: 'component',
  })
  products = new Collection<ApplicationComponentProductMap>(this);

  @HasuraReference({
    objectName: 'component',
    collectionName: 'systemSoftware',
  })
  @OneToMany({
    entity: () => ApplicationComponentSystemSoftwareMap,
    mappedBy: 'component',
  })
  systemSoftware = new Collection<ApplicationComponentSystemSoftwareMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'networks' })
  @OneToMany({
    entity: () => ApplicationComponentTechnologyLogicalNetworkMap,
    mappedBy: 'component',
  })
  networks = new Collection<ApplicationComponentTechnologyLogicalNetworkMap>(
    this,
  );

  @HasuraReference({ objectName: 'component', collectionName: 'nodes' })
  @OneToMany({
    entity: () => ApplicationComponentTechnologyNodeMap,
    mappedBy: 'component',
  })
  nodes = new Collection<ApplicationComponentTechnologyNodeMap>(this);

  @HasuraReference({ objectName: 'component', collectionName: 'solutions' })
  @OneToMany({
    entity: () => SolutionApplicationComponentMap,
    mappedBy: 'component',
  })
  solutions = new Collection<SolutionApplicationComponentMap>(this);
}
