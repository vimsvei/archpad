import { Interface } from '@/model/archimate/common/interface.entity';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ProtocolTypeDirectory } from '@/model/directories/directories';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyInterface extends Interface {
  @ManyToOne({
    entity: () => ProtocolTypeDirectory,
    nullable: false,
    fieldName: 'protocol_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  protocol!: ProtocolTypeDirectory;
}
