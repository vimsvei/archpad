import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class KeycloakDesiredStateService implements OnApplicationBootstrap {
  private readonly logger = new Logger(KeycloakDesiredStateService.name);

  constructor(private readonly keycloak: KeycloakService) {}

  async onApplicationBootstrap() {
    const enabled = (process.env.KEYCLOAK_DESIRED_STATE_SYNC_ENABLED ?? 'true')
      .trim()
      .toLowerCase() !== 'false';
    if (!enabled) {
      this.logger.log('Keycloak desired-state sync disabled');
      return;
    }

    const roles = ['ARCHITECT', 'DIRECTORY_MANAGER', 'VIEWER'];
    const groups = ['ADMIN', 'USER'];

    // IMPORTANT: don't block Nest boot / HTTP listener.
    // If Keycloak is temporarily unavailable or credentials are wrong, we still want the
    // auth-service to become Ready and serve requests; desired-state sync is best-effort.
    this.logger.log(
      `Starting Keycloak desired-state sync in background: roles=[${roles.join(
        ',',
      )}] groups=[${groups.join(',')}]`,
    );
    void this.syncWithRetry({ roles, groups });
  }

  private async syncWithRetry(input: {
    roles: string[];
    groups: string[];
  }): Promise<void> {
    // Best-effort: retry for a bit and then give up with a warning.
    const maxAttempts = 30;
    const delayMs = 2000;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.keycloak.ensureDesiredRealmRoles(input.roles);
        await this.keycloak.ensureDesiredGroups(input.groups);
        this.logger.log(
          `Keycloak desired-state ensured: roles=[${input.roles.join(
            ',',
          )}] groups=[${input.groups.join(',')}]`,
        );
        return;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (attempt === maxAttempts) {
          this.logger.warn(
            `Keycloak desired-state sync failed after ${maxAttempts} attempts: ${msg}`,
          );
          return;
        }
        this.logger.warn(
          `Keycloak desired-state sync attempt ${attempt}/${maxAttempts} failed: ${msg}`,
        );
        await sleep(delayMs);
      }
    }
  }
}

