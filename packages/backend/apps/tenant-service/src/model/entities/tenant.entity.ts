import { Entity } from '@mikro-orm/core';
import { ArchimateCode, NamedObject } from '@archpad/models';

@Entity({
  tableName: 'tenants',
})
export class Tenant extends NamedObject {
  @ArchimateCode('TENANT')
  override code: string = undefined as any;
}
