import { NamedObject } from './named-object.abstract';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class DirectoryObject extends NamedObject {
  @ApiProperty({ description: 'Item color', required: false })
  @Property({ type: 'string', nullable: true })
  color!: string;
  
  @ApiProperty({ description: 'By Default', required: false })
  @Property({ type: Boolean, name: 'by_default', default: false })
  byDefault: boolean;
}
