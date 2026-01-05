import {HasuraRefName, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne} from "@mikro-orm/core";
import {BusinessProcess} from "@/model/archimate/business/business-process.entity";
import {BusinessFunction} from "@/model/archimate/business/business-function.entity";

@HasuraTable()
@Entity({ tableName: 'map_business_process_function' })
export class BusinessProcessFunctionMap extends MappedObject {
  
  @HasuraRefName('functions')
  @ManyToOne({
    entity: () => BusinessProcess,
    primary: true,
    fieldName: 'process_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  process!: BusinessProcess;
  
  @HasuraRefName('processes')
  @ManyToOne({
    entity: () => BusinessFunction,
    primary: true,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: BusinessFunction;
}
