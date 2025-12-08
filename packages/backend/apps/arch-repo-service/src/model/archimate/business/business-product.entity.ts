import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ApplicationComponentProductMap } from '@/model/maps/application-component-product.map';

@Entity({ tableName: 'products' })
export class BusinessProduct extends ArchimateElementGeneric {
  @ArchimateCode('PRODUCT')
  override code: string = undefined as any;

  @OneToMany({
    entity: () => ApplicationComponentProductMap,
    mappedBy: 'product',
  })
  products = new Collection<ApplicationComponentProductMap>(this);
}
