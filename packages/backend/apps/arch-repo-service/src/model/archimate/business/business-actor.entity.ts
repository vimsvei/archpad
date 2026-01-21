import { HasuraReference, HasuraTable, NamedObject } from '@archpad/models';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ArchimateCode } from '@archpad/models';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';
import { ApiProperty } from '@nestjs/swagger';

@HasuraTable()
@Entity({ tableName: 'actors' })
export class BusinessActor extends NamedObject {
  @ArchimateCode('ACTOR')
  override code: string = undefined as any;

  @ApiProperty({ type: BusinessActorRoleMap, isArray: true })
  @HasuraReference({ objectName: 'actor', collectionName: 'roles' })
  @OneToMany(() => BusinessActorRoleMap, (map) => map.actor)
  roles = new Collection<BusinessActorRoleMap>(this);
}
