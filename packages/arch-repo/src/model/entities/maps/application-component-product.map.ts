import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { BusinessProduct } from '@/model/entities/archimate/business/business-product.entity';

export class ApplicationComponentProductMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => BusinessProduct,
    fieldName: 'product_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  product!: BusinessProduct;
}
