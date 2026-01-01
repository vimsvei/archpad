import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { ArchimateCode, HasuraTable } from '@archpad/models';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ApplicationComponentProductMap } from '@/model/maps/application-component-product.map';
import { HasuraRefCollection } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'products' })
export class BusinessProduct extends ArchimateElementGeneric {
  @ArchimateCode('PRODUCT')
  override code: string = undefined as any;

  @HasuraRefCollection()
  @OneToMany({
    entity: () => ApplicationComponentProductMap,
    mappedBy: 'product',
  })
  products = new Collection<ApplicationComponentProductMap>(this);
}
