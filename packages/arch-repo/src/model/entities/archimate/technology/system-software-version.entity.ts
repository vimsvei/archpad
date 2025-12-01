import { IdentifiedObject } from '@/model/abstract/identified-object.abstract';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { SystemSoftware } from '@/model/entities/archimate/technology/system-software.entity';

@Entity({ tableName: 'system_software_versions' })
export class SystemSoftwareVersion extends IdentifiedObject {
  @Property()
  version: string;

  @Property({ nullable: true })
  releaseDate?: Date;

  @Property({ nullable: true })
  eolDate?: Date;

  @Property({ nullable: true })
  releaseNotesUrl?: string;

  @Property({ nullable: true })
  isLts?: boolean;

  @ManyToOne({
    entity: () => SystemSoftware,
    fieldName: 'system_software_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  systemSoftware: SystemSoftware;
}
