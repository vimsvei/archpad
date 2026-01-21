import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';

@HasuraTable()
@Entity({ tableName: 'map_application_component_directory' })
export class ApplicationComponentDirectoryMap extends MappedObject {
  @HasuraReference({ objectName: 'component', collectionName: 'directories' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraReference({ objectName: 'directory', collectionName: 'components' })
  @ManyToOne({
    entity: () => DirectoryObject,
    primary: true,
    fieldName: 'directory_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  directory!: DirectoryObject;
}
