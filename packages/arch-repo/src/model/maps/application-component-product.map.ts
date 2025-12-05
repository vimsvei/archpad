import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { BusinessProduct } from '@/model/archimate/business/business-product.entity';

@Entity({ tableName: 'map_application_component_product' })
@Unique({ properties: ['component', 'product'] })
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
