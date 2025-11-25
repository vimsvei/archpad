import { Module } from '@nestjs/common';
import { BaseDirectoryModule } from './base-directory/base-directory.module';
import { LicenseTypeDirectory } from '../../model/entities/directories/license-type.directory';
import {
  CreateLicenseTypeDto,
  UpdateLicenseTypeDto,
} from '../../model/dto/license-type.dto';

@Module({
  imports: [
    BaseDirectoryModule.register<
      LicenseTypeDirectory,
      CreateLicenseTypeDto,
      UpdateLicenseTypeDto
    >({
      entity: LicenseTypeDirectory,
      path: 'license-types',
      swaggerTag: 'License types',
      createDto: CreateLicenseTypeDto,
      updateDto: UpdateLicenseTypeDto,
    }),
  ],
})
export class DirectoriesModule {}
