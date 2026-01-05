import {ArchimateElementGeneric} from "@/model/archimate/core/archimate-element.generic";
import {ArchimateCode, HasuraTable} from "@archpad/models";
import {Entity} from "@mikro-orm/core";

@HasuraTable()
@Entity({ tableName: 'plateaus' })
export class Plateau extends ArchimateElementGeneric {
  
  @ArchimateCode('PL')
  override code: string = undefined as any;
}
