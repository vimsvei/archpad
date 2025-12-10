import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IdentifiedObject } from '@archpad/models';

@Entity({
  tableName: 'user_profiles',
})
export abstract class UserProfile extends IdentifiedObject {
  @ApiProperty({ description: 'First name', required: true })
  @Property({ type: 'string', name: 'first_name' })
  firstName!: string;

  @ApiProperty({ description: 'Last name', required: true })
  @Property({ type: 'string', name: 'last_name' })
  lastName!: string;

  @ApiProperty({ description: 'Middle name', required: false })
  @Property({ type: 'string', name: 'middle_name', nullable: true })
  middleName?: string;

  @ApiProperty({ description: 'Email', required: true })
  @Property({ type: 'string', unique: true })
  email!: string;

  @ApiProperty({ description: 'Phone', required: false })
  @Property({ type: 'string', nullable: true })
  phone?: string;

  @ApiProperty({ description: 'Position', required: true })
  @Property({ type: 'string' })
  position!: string;

  @ApiProperty({ description: 'Department', required: true })
  @Property({ type: 'string' })
  department!: string;
}
