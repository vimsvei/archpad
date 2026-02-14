import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'lead_attempts' })
@Index({
  name: 'lead_attempts_email_created_idx',
  properties: ['emailHash', 'createdAt'],
})
@Index({
  name: 'lead_attempts_ip_created_idx',
  properties: ['ipHash', 'createdAt'],
})
export class LeadAttempt {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text', name: 'email_hash', nullable: true })
  emailHash?: string | null;

  @Property({ type: 'text', name: 'ip_hash', nullable: true })
  ipHash?: string | null;

  @Property({ type: 'text', name: 'form_id', nullable: true })
  formId?: string | null;

  @Property({ type: 'boolean', name: 'email_sent' })
  emailSent: boolean = false;

  @Property({ type: 'text', name: 'reason', nullable: true })
  reason?: string | null;

  @Property({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date();
}
