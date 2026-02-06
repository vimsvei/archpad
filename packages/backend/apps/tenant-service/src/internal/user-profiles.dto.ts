import { ApiProperty } from '@nestjs/swagger';

export class EnsureUserProfileRequestDto {
  @ApiProperty({ description: 'Keycloak user id (UUID)' })
  keycloakId!: string;

  @ApiProperty({ required: false, nullable: true })
  middleName?: string;

  @ApiProperty({ required: false, nullable: true })
  position?: string;

  @ApiProperty({ required: false, nullable: true })
  department?: string;
}

export class EnsureUserProfileResponseDto {
  @ApiProperty({ description: 'Tenant-service UserProfile id (UUID)' })
  id!: string;

  @ApiProperty({ description: 'Keycloak user id (UUID)' })
  keycloakId!: string;
}

