import {Collection, Entity, OneToMany} from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { Role } from '@/model/archimate/common/role.entity';
import {BusinessActorRoleMap} from "@/model/maps/business-actor-role.map";
import {HasuraReference} from "@archpad/models";

@Entity({
  discriminatorValue: LayerKind.BUSINESS,
})
export class BusinessRole extends Role {
  /** Business-layer only: base Role cannot have actors (ApplicationRole would have different relations). */
  @HasuraReference({ objectName: 'role', collectionName: 'actors' })
  @OneToMany(() => BusinessActorRoleMap, (map) => map.role)
  actors = new Collection<BusinessActorRoleMap>(this);
}
