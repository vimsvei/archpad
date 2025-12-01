import { ApiProperty } from '@nestjs/swagger';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { NamedObject } from '@/model/abstract/named-object.abstract';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';

@Entity({
  tableName: 'directories',
  abstract: true,
  discriminatorColumn: 'kind',
})
export abstract class DirectoryObject extends NamedObject {
  @ApiProperty({ enum: DirectoryKind, description: 'Тип справочника' })
  @Enum({ items: () => DirectoryKind, nativeEnumName: 'directory_kind_enum' })
  kind!: DirectoryKind;

  @ApiProperty({ description: 'Item color', required: false })
  @Property({ type: 'string', nullable: true })
  color!: string;

  @ApiProperty({ description: 'By Default', required: false })
  @Property({ type: Boolean, name: 'by_default', default: false })
  byDefault: boolean = false;

  @ApiProperty({
    description: 'Parent directory item',
    required: false,
    type: () => DirectoryObject,
  })
  @ManyToOne(() => DirectoryObject, {
    fieldName: 'parent_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent?: DirectoryObject;

  @OneToMany(() => DirectoryObject, (item) => item.parent)
  children = new Collection<DirectoryObject>(this);
}
