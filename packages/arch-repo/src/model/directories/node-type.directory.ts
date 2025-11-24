import { NamedObject } from '../abstract/named-object.abstract';
import { Collection, Entity, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { BaseObject } from '../abstract/base-object.abstract';

@Entity({ tableName: 'node_types' })
export class NodeTypeDirectory extends NamedObject {
  @ManyToMany(
    () => NodeTypeDirectory,
    (node) => node.parentTypes,
    {
      owner: true,
      pivotEntity: () => NodeChildType,
    }
  )
  childTypes = new Collection<NodeTypeDirectory>(this);
  
  @ManyToMany(
    () => NodeTypeDirectory,
    (node) => node.childTypes,
  )
  parentTypes = new Collection<NodeTypeDirectory>(this);
}

@Entity({ tableName: 'node_types_reference' })
export class NodeChildType extends BaseObject {
  @ManyToOne(() => NodeTypeDirectory, { primary: true, joinColumn: 'parent_id' })
  parent!: NodeTypeDirectory;
  
  @ManyToOne(() => NodeTypeDirectory, { primary: true, joinColumn: 'child_id' })
  child!: NodeTypeDirectory;
}
