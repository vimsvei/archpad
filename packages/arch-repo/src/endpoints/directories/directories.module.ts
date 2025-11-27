import { Module } from '@nestjs/common';
import { BaseDirectoryModule } from './base-directory/base-directory.module';
import { LicenseTypeDirectory } from '@/model/entities/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/entities/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/entities/directories/critical-level.directory';
import {
  CreateDtoArchitectureStyle,
  CreateDtoCriticalLevel,
  CreateDtoLicenseType,
  CreateDtoNodeType,
  CreateDtoSoftwareType,
  UpdateDtoArchitectureStyle,
  UpdateDtoCriticalLevel,
  UpdateDtoLicenseType,
  UpdateDtoNodeType,
  UpdateDtoSoftwareType,
} from '@/model/dto/directories.dto';
import { NodeTypeDirectory } from '@/model/entities/directories/node-type.directory';
import { SoftwareTypeDirectory } from '@/model/entities/directories/software-type.directory';

@Module({
  imports: [
    BaseDirectoryModule.register<
      ArchitectureStyleDirectory,
      CreateDtoArchitectureStyle,
      UpdateDtoArchitectureStyle
    >({
      entity: ArchitectureStyleDirectory,
      path: 'architecture-styles',
      swaggerTag: 'Architecture styles',
      createDto: CreateDtoArchitectureStyle,
      updateDto: UpdateDtoArchitectureStyle,
    }),

    BaseDirectoryModule.register<
      CriticalLevelDirectory,
      CreateDtoCriticalLevel,
      UpdateDtoCriticalLevel
    >({
      entity: CriticalLevelDirectory,
      path: 'critical-levels',
      swaggerTag: 'Critical levels',
      createDto: CreateDtoCriticalLevel,
      updateDto: UpdateDtoCriticalLevel,
    }),
    BaseDirectoryModule.register<
      LicenseTypeDirectory,
      CreateDtoLicenseType,
      UpdateDtoLicenseType
    >({
      entity: LicenseTypeDirectory,
      path: 'license-types',
      swaggerTag: 'Type of license on soft',
      createDto: CreateDtoLicenseType,
      updateDto: UpdateDtoLicenseType,
    }),
    BaseDirectoryModule.register<
      NodeTypeDirectory,
      CreateDtoNodeType,
      UpdateDtoNodeType
    >({
      entity: NodeTypeDirectory,
      path: 'node-types',
      swaggerTag: 'Types of nodes',
      createDto: CreateDtoNodeType,
      updateDto: UpdateDtoNodeType,
    }),
    BaseDirectoryModule.register<
      SoftwareTypeDirectory,
      CreateDtoSoftwareType,
      UpdateDtoSoftwareType
    >({
      entity: SoftwareTypeDirectory,
      path: 'software-types',
      swaggerTag: 'Types of software',
      createDto: CreateDtoSoftwareType,
      updateDto: UpdateDtoSoftwareType,
    }),
  ],
})
export class DirectoriesModule {}
