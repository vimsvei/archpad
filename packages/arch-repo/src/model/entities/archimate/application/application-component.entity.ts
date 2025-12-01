import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import * as trace_events from 'node:trace_events';
import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { LicenseTypeDirectory } from '@/model/entities/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/entities/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/entities/directories/critical-level.directory';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ComponentFunctionMap } from '@/model/entities/maps/component-function.map';
import { ApplicationInterface } from '@/model/entities/archimate/application/application-interface.entity';

@Entity({ tableName: 'components' })
export class ApplicationComponent extends ArchimateElementGeneric {
  @ArchimateCode('APP_COM')
  override code: string = undefined as any;

  @OneToMany({ entity: () => ComponentFunctionMap, mappedBy: 'component' })
  functions = new Collection<ComponentFunctionMap>(this);

  @OneToMany({ entity: () => ApplicationInterface, mappedBy: 'component' })
  interfaces = new Collection<ApplicationInterface>(this);

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
}
