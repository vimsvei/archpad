import { Collection, Entity, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { BaseObject } from '../../abstract/base-object.abstract';
import { DirectoryObject } from '../../abstract/directory-object.abstract';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';

@Entity({ discriminatorValue: DirectoryKind.NODE_TYPE })
export class NodeTypeDirectory extends DirectoryObject {
  @ManyToMany(() => NodeTypeDirectory, (node) => node.parents, {
    owner: true,
    pivotEntity: () => NodeChildType,
  })
  children = new Collection<NodeTypeDirectory>(this);
  
  @ManyToMany(() => NodeTypeDirectory, (node) => node.children)
  parents = new Collection<NodeTypeDirectory>(this);
}

@Entity({ tableName: 'node_types_reference' })
export class NodeChildType extends BaseObject {
  @ManyToOne(() => NodeTypeDirectory, {
    primary: true,
    joinColumn: 'parent_id',
  })
  parent!: NodeTypeDirectory;
  
  @ManyToOne(() => NodeTypeDirectory, { primary: true, joinColumn: 'child_id' })
  child!: NodeTypeDirectory;
}
