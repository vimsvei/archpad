import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { LicenseTypeDirectory } from '@/model/entities/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/entities/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/entities/directories/critical-level.directory';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ApplicationComponentFunctionMap } from '@/model/entities/maps/application-component-function.map';
import { ApplicationInterface } from '@/model/entities/archimate/application/application-interface.entity';
import { ApplicationComponentDataObjectMap } from '@/model/entities/maps/application-component-data-object.map';
import { ApplicationFunctionDataObject } from '@/model/entities/maps/application-function-data-object.map';

@Entity({ tableName: 'components' })
export class ApplicationComponent extends ArchimateElementGeneric {
  @ArchimateCode('COMP')
  override code: string = undefined as any;

  @OneToMany({
    entity: () => ApplicationComponentFunctionMap,
    mappedBy: 'component',
  })
  functions = new Collection<ApplicationComponentFunctionMap>(this);

  @OneToMany({ entity: () => ApplicationInterface, mappedBy: 'component' })
  interfaces = new Collection<ApplicationInterface>(this);

  @OneToMany({
    entity: () => ApplicationComponentDataObjectMap,
    mappedBy: 'component',
  })
  dataObjects = new Collection<ApplicationComponentDataObjectMap>(this);

  @ManyToOne((type) => LicenseTypeDirectory, {
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license: LicenseTypeDirectory;

  @ManyToOne((type) => ArchitectureStyleDirectory, {
    name: 'style_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  architectureStyle!: ArchitectureStyleDirectory;

  @ManyToOne((type) => CriticalLevelDirectory, {
    name: 'critical_level_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  criticalLevel!: CriticalLevelDirectory;

  @OneToMany({
    entity: () => ApplicationFunctionDataObject,
    mappedBy: 'component',
  })
  dataObjectUsages = new Collection<ApplicationFunctionDataObject>(this);
}
