import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'lead_dedup' })
@Index({
  name: 'lead_dedup_email_form_created_idx',
  properties: ['emailHash', 'formId', 'createdAt'],
})
export class LeadDedup {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text', name: 'email_hash' })
  emailHash!: string;

  @Property({ type: 'text', name: 'form_id' })
  formId!: string;

  @Property({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date();
}
