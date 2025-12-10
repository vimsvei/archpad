import { ApiProperty } from '@nestjs/swagger';
import { Entity, Enum, Property } from '@mikro-orm/core';
import { NamedObject } from '@archpad/models';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';
import { ArchimateCode } from '@archpad/models';

@Entity({
  tableName: 'directories',
  abstract: true,
  discriminatorColumn: 'kind',
})
export abstract class DirectoryObject extends NamedObject {
  @Enum({ items: () => DirectoryKind, nativeEnumName: 'directory_kind_enum' })
  kind!: DirectoryKind;

  @ArchimateCode('DIR')
  override code: string = undefined as any;

  @ApiProperty({ description: 'Item color', required: false })
  @Property({ type: 'string', nullable: true })
  color!: string;

  @ApiProperty({ description: 'By Default', required: false })
  @Property({ type: Boolean, name: 'by_default', default: false })
  byDefault: boolean = false;
}
