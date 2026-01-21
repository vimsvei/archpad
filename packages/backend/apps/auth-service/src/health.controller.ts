import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KeycloakService } from './keycloak.service';

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(private readonly keycloak: KeycloakService) {}

  @Get('/healthz/keycloak')
  @ApiOperation({
    summary:
      'Keycloak connectivity check (realm discovery + service token + optional client presence)',
  })
  async keycloakHealth() {
    const result = await this.keycloak.checkHealth();
    return result.ok
      ? { ...result, status: 'ok' }
      : { ...result, status: 'degraded' };
  }
}
