import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { LoggerService } from '@archpad/logger';
import { VaultConfigService } from '@archpad/vault-config';
import { ActionStamp } from '@archpad/models';
import { Tenant } from '../model/entities/tenant.entity';
import { Workspace } from '../model/entities/workspace.entity';

@Injectable()
export class DefaultTenantWorkspaceInitializer
  implements OnApplicationBootstrap
{
  private readonly loggerContext = DefaultTenantWorkspaceInitializer.name;

  constructor(
    private readonly orm: MikroORM,
    private readonly vault: VaultConfigService,
    private readonly logger: LoggerService,
  ) {}

  async onApplicationBootstrap() {
    // Should run after SchemaInitializer.updateSchema() because:
    // - SchemaInitializerModule is imported by BootstrapModule, so it has bigger distance in Nest module graph
    // - Nest calls OnApplicationBootstrap hooks from deeper modules first

    await this.vault.ensureLoaded();

    const tenantDefaultCode = (this.vault.get('TENANT_DEFAULT_CODE') || '').trim();
    const workspaceDefaultCode = (this.vault.get('WORKSPACE_DEFAULT_CODE') || '').trim();

    if (!tenantDefaultCode) {
      this.logger.warn(
        'TENANT_DEFAULT_CODE is not set, skipping default tenant/workspace initialization',
        this.loggerContext,
      );
      return;
    }
    if (!workspaceDefaultCode) {
      this.logger.warn(
        'WORKSPACE_DEFAULT_CODE is not set, skipping default tenant/workspace initialization',
        this.loggerContext,
      );
      return;
    }

    this.logger.log(
      `Ensuring default tenant/workspace: TENANT_DEFAULT_CODE="${tenantDefaultCode}", WORKSPACE_DEFAULT_CODE="${workspaceDefaultCode}"`,
      this.loggerContext,
    );

    const em = this.orm.em.fork();

    let tenant = await em.findOne(Tenant, { code: tenantDefaultCode });
    if (!tenant) {
      this.logger.warn(
        `Default tenant not found (code="${tenantDefaultCode}"), creating...`,
        this.loggerContext,
      );
      tenant = em.create(Tenant, {
        code: tenantDefaultCode,
        name: tenantDefaultCode,
        description: 'Auto-created default tenant',
        created: ActionStamp.now(null),
      });
      await em.persistAndFlush(tenant);
      this.logger.log(
        `Default tenant created: id=${tenant.id} code="${tenant.code}"`,
        this.loggerContext,
      );
    } else {
      this.logger.log(
        `Default tenant exists: id=${tenant.id} code="${tenant.code}"`,
        this.loggerContext,
      );
    }

    let workspace = await em.findOne(Workspace, {
      code: workspaceDefaultCode,
      tenant,
    });
    if (!workspace) {
      this.logger.warn(
        `Default workspace not found (code="${workspaceDefaultCode}", tenantCode="${tenantDefaultCode}"), creating...`,
        this.loggerContext,
      );
      workspace = em.create(Workspace, {
        code: workspaceDefaultCode,
        name: workspaceDefaultCode,
        description: 'Auto-created default workspace',
        tenant,
        created: ActionStamp.now(null),
      });
      await em.persistAndFlush(workspace);
      this.logger.log(
        `Default workspace created: id=${workspace.id} code="${workspace.code}" tenantId=${tenant.id}`,
        this.loggerContext,
      );
    } else {
      this.logger.log(
        `Default workspace exists: id=${workspace.id} code="${workspace.code}" tenantId=${tenant.id}`,
        this.loggerContext,
      );
    }
  }
}
