import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';
import { DirectoryLinkType } from '@/model/enums/directory-link-type.enum';

@HasuraTable()
@Entity({ tableName: 'map_directory_items' })
@Unique({ properties: ['source', 'target'] })
export class DirectoryItemsMap extends MappedObject {
  @HasuraReference({ objectName: 'source', collectionName: 'children' })
  @ManyToOne({
    entity: () => DirectoryObject,
    primary: true,
    fieldName: 'source_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  source!: DirectoryObject;

  @HasuraReference({ objectName: 'target', collectionName: 'parents' })
  @ManyToOne({
    entity: () => DirectoryObject,
    primary: true,
    fieldName: 'target_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  target!: DirectoryObject;

  @Enum({
    items: () => DirectoryLinkType,
    nativeEnumName: 'directory_link_type_enum',
    default: DirectoryLinkType.HIERARCHY,
  })
  type!: DirectoryLinkType;
}
