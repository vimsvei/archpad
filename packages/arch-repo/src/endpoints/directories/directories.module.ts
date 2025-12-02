import { Module } from '@nestjs/common';
import {
  CreateDtoArchitectureStyle,
  CreateDtoCriticalLevel,
  CreateDtoLicenseType,
  CreateDtoNodeType,
  CreateDtoProtocolType,
  CreateDtoSoftwareType,
  UpdateDtoArchitectureStyle,
  UpdateDtoCriticalLevel,
  UpdateDtoLicenseType,
  UpdateDtoNodeType,
  UpdateDtoProtocolType,
  UpdateDtoSoftwareType,
} from '@/model/dto/directories.dto';
import { BaseDirectoryModule } from './base-directory/base-directory.module';
import { LicenseTypeDirectory } from '@/model/entities/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/entities/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/entities/directories/critical-level.directory';
import { NodeTypeDirectory } from '@/model/entities/directories/node-type.directory';
import { SoftwareTypeDirectory } from '@/model/entities/directories/software-type.directory';
import { ProtocolTypeDirectory } from '@/model/entities/directories/protocol-type.directory';

@Module({
  imports: [
    BaseDirectoryModule.register<
      ArchitectureStyleDirectory,
      CreateDtoArchitectureStyle,
      UpdateDtoArchitectureStyle
    >({
      entity: ArchitectureStyleDirectory,
      path: 'architecture-styles',
      swaggerTag: 'Архитектурный стиль',
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
      swaggerTag: 'Уровни критичности',
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
      swaggerTag: 'Типы лицензий нв ПО',
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
      swaggerTag: 'Типы технологических узлов',
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
      swaggerTag: 'Тип системного ПО',
      createDto: CreateDtoSoftwareType,
      updateDto: UpdateDtoSoftwareType,
    }),
    BaseDirectoryModule.register<
      ProtocolTypeDirectory,
      CreateDtoProtocolType,
      UpdateDtoProtocolType
    >({
      entity: ProtocolTypeDirectory,
      path: 'protocol-types',
      swaggerTag: 'Тип сетевых протоколов',
      createDto: CreateDtoProtocolType,
      updateDto: UpdateDtoProtocolType,
    }),
  ],
})
export class DirectoriesModule {}
