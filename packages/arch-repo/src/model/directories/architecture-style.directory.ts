import { NamedObject } from '../abstract/named-object.abstract';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'architecture_style' })
export class ArchitectureStyleDirectory extends NamedObject {
  @Property({ type: Boolean, name: 'by_default', default: false })
  byDefault: boolean;
}
