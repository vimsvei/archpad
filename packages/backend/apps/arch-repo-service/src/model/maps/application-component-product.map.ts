import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { BusinessProduct } from '@/model/archimate/business/business-product.entity';
import { HasuraRefName } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_application_component_product' })
export class ApplicationComponentProductMap extends MappedObject {
  @HasuraRefName('products')
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName('components')
  @ManyToOne({
    entity: () => BusinessProduct,
    primary: true,
    fieldName: 'product_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  product!: BusinessProduct;
}
