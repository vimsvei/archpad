import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InternalTokenGuard } from './internal-token.guard';
import {
  EnsureUserProfileRequestDto,
  EnsureUserProfileResponseDto,
  UpdateProfileRequestDto,
} from './user-profiles.dto';
import { InternalUserProfilesService } from './internal-user-profiles.service';

@ApiTags('internal')
@Controller('internal/user-profiles')
@UseGuards(InternalTokenGuard)
export class InternalUserProfilesController {
  constructor(private readonly users: InternalUserProfilesService) {}

  @Post('ensure')
  @ApiOperation({
    summary: 'Ensure user profile exists (idempotent). Internal only.',
  })
  async ensure(
    @Body() body: EnsureUserProfileRequestDto,
  ): Promise<EnsureUserProfileResponseDto> {
    try {
      const p = await this.users.ensureUserProfile(body);
      return { id: p.id, keycloakId: p.keycloakId! };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new BadRequestException(msg || 'ensure_failed');
    }
  }

  @Get('by-keycloak-id/:keycloakId')
  @ApiOperation({ summary: 'Get user profile by keycloakId. Internal only.' })
  async byKeycloakId(@Param('keycloakId') keycloakId: string) {
    const p = await this.users.findByKeycloakId(keycloakId);
    if (!p) throw new NotFoundException('not_found');
    const displayName = p.code || p.keycloakId || '—';
    return {
      id: p.id,
      code: p.code,
      keycloakId: p.keycloakId,
      displayName,
      middleName: p.middleName,
      position: p.position,
      department: p.department,
    };
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update current user profile (editable fields). Internal only.',
    description:
      'Updates profile for user identified by X-Archpad-User-Id (from Oathkeeper).',
  })
  async updateMe(
    @Headers('x-archpad-user-id') userId: string,
    @Body() body: UpdateProfileRequestDto,
  ) {
    const keycloakId = (userId ?? '').trim();
    if (!keycloakId) throw new BadRequestException('missing_x_archpad_user_id');
    const p = await this.users.updateProfileByKeycloakId(keycloakId, body);
    const displayName = p.code || p.keycloakId || '—';
    return {
      id: p.id,
      code: p.code,
      keycloakId: p.keycloakId,
      displayName,
      middleName: p.middleName,
      position: p.position,
      department: p.department,
    };
  }
}

