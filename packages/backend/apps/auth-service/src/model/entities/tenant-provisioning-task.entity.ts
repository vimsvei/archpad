import { Entity, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'tenant_provisioning_tasks' })
@Index({
  name: 'tenant_provisioning_tasks_status_next_idx',
  properties: ['status', 'nextAttemptAt'],
})
@Index({
  name: 'tenant_provisioning_tasks_keycloak_id_idx',
  properties: ['keycloakId'],
})
@Unique({ properties: ['keycloakId'] })
export class TenantProvisioningTask {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text', name: 'keycloak_id' })
  keycloakId!: string;

  @Property({ type: 'boolean', name: 'personal_workspace' })
  personalWorkspace: boolean = true;

  @Property({ type: 'text', name: 'status' })
  status: 'pending' | 'completed' = 'pending';

  @Property({ type: 'int', name: 'attempts' })
  attempts: number = 0;

  @Property({ type: 'timestamptz', name: 'next_attempt_at' })
  nextAttemptAt: Date = new Date();

  @Property({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date | null;

  @Property({ type: 'text', name: 'last_error', nullable: true })
  lastError?: string | null;

  @Property({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date();

  @Property({
    type: 'timestamptz',
    name: 'updated_at',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
