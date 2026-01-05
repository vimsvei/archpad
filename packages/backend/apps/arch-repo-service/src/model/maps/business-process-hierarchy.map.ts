import {HasuraRefName, HasuraTable, MappedObject} from "@archpad/models";
import {BusinessProcess} from "@/model/archimate/business/business-process.entity";
import {Entity, ManyToOne} from "@mikro-orm/core";

@HasuraTable()
@Entity({ tableName: 'map_business_process_hierarchy' })
export class BusinessProcessHierarchyMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: BusinessProcess;
  
  @HasuraRefName()
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: BusinessProcess;
  
  order: number = 0;
}
