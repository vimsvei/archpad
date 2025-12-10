import { Entity } from '@mikro-orm/core';
import { ArchimateCode, IdentifiedObject } from '@archpad/models';

@Entity({
  tableName: 'tenants',
})
export class Tenant extends IdentifiedObject {
  @ArchimateCode('TENANT')
  override code: string = undefined as any;
}