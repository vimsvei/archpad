import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { BusinessActorRoleMap } from '@/model/entities/maps/business-actor-role.map';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'actors' })
export class BusinessActor extends NamedObject {
  @ArchimateCode('ACTOR')
  override code: string = undefined as any;

  @ApiProperty({ type: BusinessActorRoleMap, isArray: true })
  @OneToMany(() => BusinessActorRoleMap, (map) => map.actor)
  roles = new Collection<BusinessActorRoleMap>(this);
}
