import { NamedObject } from './named-object.abstract';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from '@mikro-orm/core';

export abstract class DirectoryObject extends NamedObject {
  @ApiProperty({ description: 'Item color', required: false })
  @Property({ type: 'string', nullable: true })
  color!: string;
}
