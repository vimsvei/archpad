import { NamedObject } from '../../../abstract/named-object.abstract';
import { Entity } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({ tableName: 'business-actors' })
export class BusinessActor extends NamedObject {
  @ArchimateCode('ACTOR')
  override code: string = undefined as any;
}
