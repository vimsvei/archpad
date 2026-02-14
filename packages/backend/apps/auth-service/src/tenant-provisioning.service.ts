import { Injectable, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LoggerService } from '@archpad/logger';
import { TenantServiceClient } from './tenant-service.client';
import { TenantProvisioningTask } from './model/entities/tenant-provisioning-task.entity';

@Injectable()
export class TenantProvisioningService implements OnModuleInit {
  private readonly loggerContext = TenantProvisioningService.name;
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private readonly orm: MikroORM,
    private readonly tenant: TenantServiceClient,
    private readonly logger: LoggerService,
  ) {}

  onModuleInit() {
    const intervalMs = this.getPollIntervalMs();
    this.interval = setInterval(() => {
      this.processPending().catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        this.logger.warn(
          { event: 'tenant_provisioning_tick_failed', error: message },
          this.loggerContext,
        );
      });
    }, intervalMs);
    this.interval.unref?.();
  }

  private getPollIntervalMs(): number {
    const raw = (process.env.TENANT_PROVISIONING_POLL_MS || '').trim();
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 15000;
  }

  private getMaxBatch(): number {
    const raw = (process.env.TENANT_PROVISIONING_BATCH || '').trim();
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
  }

  private getBackoffMs(attempts: number): number {
    const base = 60_000;
    const max = 60 * 60 * 1000;
    const delay = base * Math.pow(2, Math.max(attempts - 1, 0));
    return Math.min(delay, max);
  }

  async ensureProfile(input: {
    keycloakId: string;
    personalWorkspace: boolean;
    requestId?: string;
  }): Promise<void> {
    try {
      await this.tenant.ensureUserProfile({
        keycloakId: input.keycloakId,
        personalWorkspace: input.personalWorkspace,
        requestId: input.requestId,
      });
      return;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      this.logger.warn(
        {
          event: 'tenant_provisioning_failed',
          requestId: input.requestId,
          keycloakId: input.keycloakId,
          error: message,
        },
        this.loggerContext,
      );
      await this.enqueueTask({
        keycloakId: input.keycloakId,
        personalWorkspace: input.personalWorkspace,
        error: message,
      });
    }
  }

  private async enqueueTask(input: {
    keycloakId: string;
    personalWorkspace: boolean;
    error?: string;
  }) {
    const em = this.orm.em.fork();
    let task = await em.findOne(TenantProvisioningTask, {
      keycloakId: input.keycloakId,
    });
    if (!task) {
      task = new TenantProvisioningTask();
      task.id = randomUUID();
      task.keycloakId = input.keycloakId;
      task.personalWorkspace = input.personalWorkspace;
      task.status = 'pending';
      task.attempts = 0;
      task.nextAttemptAt = new Date();
    } else {
      task.status = 'pending';
      task.personalWorkspace = input.personalWorkspace;
      task.nextAttemptAt = new Date();
    }
    task.lastError = input.error ?? null;
    await em.persistAndFlush(task);
  }

  async processPending(): Promise<void> {
    const em = this.orm.em.fork();
    const now = new Date();
    const tasks = await em.find(
      TenantProvisioningTask,
      {
        status: 'pending',
        nextAttemptAt: { $lte: now },
      },
      {
        limit: this.getMaxBatch(),
        orderBy: { nextAttemptAt: 'ASC' },
      },
    );

    for (const task of tasks) {
      try {
        await this.tenant.ensureUserProfile({
          keycloakId: task.keycloakId,
          personalWorkspace: task.personalWorkspace,
        });
        task.status = 'completed';
        task.completedAt = new Date();
        task.lastError = null;
      } catch (e: unknown) {
        task.attempts += 1;
        const message = e instanceof Error ? e.message : String(e);
        task.lastError = message;
        task.nextAttemptAt = new Date(now.getTime() + this.getBackoffMs(task.attempts));
      }
    }

    if (tasks.length > 0) {
      await em.flush();
    }
  }
}
