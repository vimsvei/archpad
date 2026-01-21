import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'auth_sessions' })
@Index({ name: 'auth_sessions_email_idx', properties: ['email'] })
@Index({ name: 'auth_sessions_access_expires_idx', properties: ['accessExpiresAt'] })
export class AuthSession {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text', nullable: true })
  email?: string | null;

  @Property({ type: 'text', name: 'access_token' })
  accessToken!: string;

  @Property({ type: 'text', name: 'refresh_token' })
  refreshToken!: string;

  @Property({ type: 'timestamptz', name: 'access_expires_at' })
  accessExpiresAt!: Date;

  @Property({ type: 'timestamptz', name: 'refresh_expires_at', nullable: true })
  refreshExpiresAt?: Date | null;

  @Property({ type: 'timestamptz', name: 'revoked_at', nullable: true })
  revokedAt?: Date | null;

  @Property({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

