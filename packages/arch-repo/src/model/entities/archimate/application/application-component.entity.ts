import { NamedObject } from '../../../abstract/named-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { LicenseTypeDirectory } from '../../directories/license-type.directory';
import { ArchitectureStyleDirectory } from '../../directories/architecture-style.directory';
import { CriticalLevelDirectory } from '../../directories/critical-level.directory';
import * as trace_events from 'node:trace_events';

@Entity({ tableName: 'application_components' })
export class ApplicationComponent extends NamedObject {
  @ManyToOne((type) => LicenseTypeDirectory, {
    name: 'license_type_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  license?: LicenseTypeDirectory | null;

  @ManyToOne((type) => ArchitectureStyleDirectory, {
    name: 'style_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  architectureStyle?: ArchitectureStyleDirectory | null;

  @ManyToOne((type) => CriticalLevelDirectory, {
    name: 'critical_level_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  criticalLevel?: CriticalLevelDirectory | null;
}
