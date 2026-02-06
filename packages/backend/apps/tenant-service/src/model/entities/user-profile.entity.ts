import { Entity, Enum, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { ArchimateCode, HasuraTable, IdentifiedObject } from '@archpad/models';
import { UserState } from '../enums/user-state.enum';

@HasuraTable()
@Entity({ tableName: 'user_profiles' })
export class UserProfile extends IdentifiedObject {
  @ArchimateCode('USER')
  code: string = undefined as any;

  @ApiProperty({
    description: 'Keycloak user id (UUID)',
    required: false,
    nullable: true,
  })
  @Property({
    type: 'string',
    name: 'keycloak_id',
    nullable: true,
    unique: true,
  })
  keycloakId?: string;

  @ApiProperty({ description: 'Middle name', required: false })
  @Property({ type: 'string', name: 'middle_name', nullable: true })
  middleName?: string;

  @ApiProperty({ description: 'Position', required: true })
  @Property({ type: 'string', nullable: true })
  position?: string;

  @ApiProperty({ description: 'Department', required: false })
  @Property({ type: 'string', nullable: true })
  department?: string;
  
  @ApiProperty({
    type: 'string',
    enum: UserState,
    description: 'User state',
    required: false,
  })
  @Enum({
    items: () => UserState,
    nativeEnumName: 'user_state',
    default: UserState.ACTIVE,
  })
  state: UserState = UserState.ACTIVE;
}
