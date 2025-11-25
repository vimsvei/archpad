import { PartialType, PickType } from '@nestjs/swagger';
import { LicenseTypeDirectory } from '../entities/directories/license-type.directory';

export class CreateLicenseTypeDto extends PickType(LicenseTypeDirectory, [
  'code',
  'name',
  'description',
] as const) {}

export class UpdateLicenseTypeDto extends PartialType(CreateLicenseTypeDto) {}
