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

  @ApiProperty({
    required: false,
    nullable: true,
    description: 'Create personal tenant/workspace for the user',
  })
  personalWorkspace?: boolean;
}

export class EnsureUserProfileResponseDto {
  @ApiProperty({ description: 'Tenant-service UserProfile id (UUID)' })
  id!: string;

  @ApiProperty({ description: 'Keycloak user id (UUID)' })
  keycloakId!: string;
}

export class UpdateProfileRequestDto {
  @ApiProperty({ required: false, nullable: true })
  middleName?: string;

  @ApiProperty({ required: false, nullable: true })
  position?: string;

  @ApiProperty({ required: false, nullable: true })
  department?: string;
}
