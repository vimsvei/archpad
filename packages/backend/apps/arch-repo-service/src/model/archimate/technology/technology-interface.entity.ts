import { InterfaceGeneric } from '@/model/archimate/core/interface.generic';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { HasuraRefName } from '@archpad/models';
import { ProtocolTypeDirectory } from '@/model/directories/directories';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyInterface extends InterfaceGeneric {
  @HasuraRefName()
  @ManyToOne({
    entity: () => ProtocolTypeDirectory,
    nullable: false,
    fieldName: 'protocol_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  protocol!: ProtocolTypeDirectory;
}
