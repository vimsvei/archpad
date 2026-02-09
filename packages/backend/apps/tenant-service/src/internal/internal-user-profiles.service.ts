import { Injectable } from '@nestjs/common';
import {
  MikroORM,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { ActionStamp } from '@archpad/models';
import { VaultConfigService } from '@archpad/vault-config';
import { UserProfile } from '../model/entities/user-profile.entity';
import { Tenant } from '../model/entities/tenant.entity';
import { Workspace } from '../model/entities/workspace.entity';
import { TenantUserProfileMap } from '../model/maps/tenant-user-profile.map';
import { WorkspaceUserProfileMap } from '../model/maps/workspace-user-profile.map';
import type { EnsureUserProfileRequestDto } from './user-profiles.dto';

const WORKSPACE_FIRST_DEFAULT_CODE = 'my.space';
const WORKSPACE_FIRST_DEFAULT_NAME = 'my.space';

function cleanOptionalString(v: unknown): string | undefined {
  const s = typeof v === 'string' ? v.trim() : '';
  return s ? s : undefined;
}

function parseBool(val: string | undefined, defaultValue: boolean): boolean {
  if (!val || typeof val !== 'string') return defaultValue;
  const v = val.trim().toLowerCase();
  if (v === 'true' || v === '1') return true;
  if (v === 'false' || v === '0') return false;
  return defaultValue;
}

@Injectable()
export class InternalUserProfilesService {
  constructor(
    private readonly orm: MikroORM,
    private readonly vault: VaultConfigService,
  ) {}

  async ensureUserProfile(input: EnsureUserProfileRequestDto): Promise<UserProfile> {
    const keycloakId = String(input.keycloakId ?? '').trim();
    if (!keycloakId) throw new Error('missing_keycloak_id');

    const middleName = cleanOptionalString(input.middleName);
    const position = cleanOptionalString(input.position);
    const department = cleanOptionalString(input.department);

    const em = this.orm.em.fork();

    const attempt = async () =>
      em.transactional(async (tx) => {
        let profile = await tx.findOne(UserProfile, { keycloakId });

        if (!profile) {
          profile = new UserProfile();
          profile.keycloakId = keycloakId;
        }

        // Last-write-wins for provided fields (idempotent for repeats)
        if (middleName !== undefined) profile.middleName = middleName;
        if (position !== undefined) profile.position = position;
        if (department !== undefined) profile.department = department;

        await tx.persistAndFlush(profile);

        // Provision tenant and workspace if user has no tenant mapping yet
        await this.provisionTenantAndWorkspace(tx, profile);

        return profile;
      });

    try {
      return await attempt();
    } catch (e: unknown) {
      // Handle rare race: two concurrent ensure() for same keycloakId.
      if (e instanceof UniqueConstraintViolationException) {
        const found = await em.findOne(UserProfile, { keycloakId });
        if (found) return found;
      }
      throw e;
    }
  }

  private async provisionTenantAndWorkspace(
    tx: MikroORM['em'],
    profile: UserProfile,
  ): Promise<void> {
    await this.vault.ensureLoaded();

    const tenantPerUser = parseBool(
      this.vault.get('TENANT_PER_USER'),
      true,
    );
    const workspacePerUser = parseBool(
      this.vault.get('WORKSPACE_PER_USER'),
      true,
    );
    const tenantDefaultCode = (
      this.vault.get('TENANT_DEFAULT_CODE') ?? ''
    ).trim();
    const workspaceDefaultCode = (
      this.vault.get('WORKSPACE_DEFAULT_CODE') ?? ''
    ).trim();

    // Check if user already has tenant mapping (idempotent)
    const existingMap = await tx.findOne(TenantUserProfileMap, {
      user: profile,
    });
    if (existingMap) return;

    let tenant: Tenant;
    let workspace: Workspace;

    if (tenantPerUser) {
      // Create new tenant for user + first workspace (owner=profile)
      tenant = tx.create(Tenant, {
        code: `tenant-${profile.id}`,
        name: `Tenant for ${profile.id}`,
        description: 'Auto-created tenant for user',
        owner: profile,
        created: ActionStamp.now(profile.id),
      });
      await tx.persistAndFlush(tenant);

      // First workspace in new tenant: always create, WORKSPACE_PER_USER ignored
      workspace = tx.create(Workspace, {
        code: WORKSPACE_FIRST_DEFAULT_CODE,
        name: WORKSPACE_FIRST_DEFAULT_NAME,
        description: 'Default personal workspace',
        tenant,
        owner: profile,
        created: ActionStamp.now(profile.id),
      });
      await tx.persistAndFlush(workspace);
    } else {
      // Add user to existing tenant (TENANT_DEFAULT_CODE)
      if (!tenantDefaultCode) {
        throw new Error('TENANT_DEFAULT_CODE must be set when TENANT_PER_USER=false');
      }
      const foundTenant = await tx.findOne(Tenant, { code: tenantDefaultCode });
      if (!foundTenant) {
        throw new Error(
          `Default tenant not found (code="${tenantDefaultCode}"). Ensure DefaultTenantWorkspaceInitializer has run.`,
        );
      }
      tenant = foundTenant;

      if (workspacePerUser) {
        // Create new personal workspace for user in default tenant
        workspace = tx.create(Workspace, {
          code: `my-space-${profile.id}`,
          name: WORKSPACE_FIRST_DEFAULT_NAME,
          description: 'Personal workspace',
          tenant,
          owner: profile,
          created: ActionStamp.now(profile.id),
        });
        await tx.persistAndFlush(workspace);
      } else {
        // Add user to existing workspace (WORKSPACE_DEFAULT_CODE)
        if (!workspaceDefaultCode) {
          throw new Error(
            'WORKSPACE_DEFAULT_CODE must be set when WORKSPACE_PER_USER=false',
          );
        }
        const foundWorkspace = await tx.findOne(Workspace, {
          code: workspaceDefaultCode,
          tenant,
        });
        if (!foundWorkspace) {
          throw new Error(
            `Default workspace not found (code="${workspaceDefaultCode}", tenant="${tenantDefaultCode}"). Ensure DefaultTenantWorkspaceInitializer has run.`,
          );
        }
        workspace = foundWorkspace;
      }
    }

    // Create tenant–user mapping
    const tenantMap = tx.create(TenantUserProfileMap, {
      tenantId: tenant.id,
      user: profile,
      created: ActionStamp.now(profile.id),
    });
    await tx.persistAndFlush(tenantMap);

    // Create workspace–user mapping
    const workspaceMap = tx.create(WorkspaceUserProfileMap, {
      tenantId: tenant.id,
      workspace,
      user: profile,
      created: ActionStamp.now(profile.id),
    });
    await tx.persistAndFlush(workspaceMap);
  }

  async findByKeycloakId(keycloakId: string): Promise<UserProfile | null> {
    const kc = String(keycloakId ?? '').trim();
    if (!kc) return null;
    return this.orm.em.findOne(UserProfile, { keycloakId: kc });
  }

  async updateProfileByKeycloakId(
    keycloakId: string,
    input: { middleName?: string; position?: string; department?: string },
  ): Promise<UserProfile> {
    const kc = String(keycloakId ?? '').trim();
    if (!kc) throw new Error('missing_keycloak_id');
    const profile = await this.orm.em.findOne(UserProfile, { keycloakId: kc });
    if (!profile) throw new Error('profile_not_found');
    const middleName = cleanOptionalString(input.middleName);
    const position = cleanOptionalString(input.position);
    const department = cleanOptionalString(input.department);
    if (middleName !== undefined) profile.middleName = middleName;
    if (position !== undefined) profile.position = position;
    if (department !== undefined) profile.department = department;
    await this.orm.em.flush();
    return profile;
  }
}

