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

    // Best-effort: don't block auth-service startup if Keycloak is temporarily unavailable.
    // We retry for a bit and then give up with a warning; registration will still attempt to
    // assign defaults and will succeed once roles/groups exist.
    const maxAttempts = 30;
    const delayMs = 2000;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.keycloak.ensureDesiredRealmRoles(roles);
        await this.keycloak.ensureDesiredGroups(groups);
        this.logger.log(
          `Keycloak desired-state ensured: roles=[${roles.join(
            ',',
          )}] groups=[${groups.join(',')}]`,
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

