import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, Enum, OneToMany } from '@mikro-orm/core';
import { ArchimateCode, HasuraTable } from '@archpad/models';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';
import { HasuraReference } from '@archpad/models';
import {LayerKind} from "@/model/enums/layer-kind.enum";

@HasuraTable()
@Entity({
  tableName: 'roles',
  abstract: true,
  discriminatorColumn: 'layer'
})
export class Role extends ArchimateElementGeneric {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;
  
  @ArchimateCode('ROLE')
  override code: string = undefined as any;
  
}
