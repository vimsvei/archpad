import { Entity } from '@mikro-orm/core';
import { NodeKind } from '@/model/enums/node-kind.enum';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';

/**
 * Device node (technology layer).
 *
 * For now it's a plain TechnologyNode with its own discriminator value.
 * Additional attributes can be added later.
 */
@Entity({ discriminatorValue: NodeKind.DEVICE })
export class TechnologyDeviceNode extends TechnologyNode {}
