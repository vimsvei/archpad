import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'password_setup_tokens' })
@Index({
  name: 'password_setup_tokens_keycloak_idx',
  properties: ['keycloakId'],
})
@Index({
  name: 'password_setup_tokens_used_idx',
  properties: ['usedAt'],
})
export class PasswordSetupToken {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text', name: 'keycloak_id' })
  keycloakId!: string;

  @Property({ type: 'text', name: 'email_hash' })
  emailHash!: string;

  @Property({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', name: 'used_at', nullable: true })
  usedAt?: Date | null;
}
