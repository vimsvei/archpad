import { Module } from '@nestjs/common';
import {
  CreateDirectoryDto,
  UpdateDirectoryDto,
} from '@/model/dto/directory.dto';
import { BaseDirectoryModule } from './base-directory/base-directory.module';
import { LicenseTypeDirectory } from '@/model/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/directories/critical-level.directory';
import { NodeTypeDirectory } from '@/model/directories/node-type.directory';
import { SoftwareTypeDirectory } from '@/model/directories/software-type.directory';
import { ProtocolTypeDirectory } from '@/model/directories/protocol-type.directory';

@Module({
  imports: [
    BaseDirectoryModule.register<
      ArchitectureStyleDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: ArchitectureStyleDirectory,
      path: 'architecture-styles',
      swaggerTag: 'Архитектурный стиль',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),

    BaseDirectoryModule.register<
      CriticalLevelDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: CriticalLevelDirectory,
      path: 'critical-levels',
      swaggerTag: 'Уровни критичности',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),
    BaseDirectoryModule.register<
      LicenseTypeDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: LicenseTypeDirectory,
      path: 'license-types',
      swaggerTag: 'Типы лицензий нв ПО',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),
    BaseDirectoryModule.register<
      NodeTypeDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: NodeTypeDirectory,
      path: 'node-types',
      swaggerTag: 'Типы технологических узлов',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),
    BaseDirectoryModule.register<
      SoftwareTypeDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: SoftwareTypeDirectory,
      path: 'software-types',
      swaggerTag: 'Тип системного ПО',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),
    BaseDirectoryModule.register<
      ProtocolTypeDirectory,
      CreateDirectoryDto,
      UpdateDirectoryDto
    >({
      entity: ProtocolTypeDirectory,
      path: 'protocol-types',
      swaggerTag: 'Тип сетевых протоколов',
      createDto: CreateDirectoryDto,
      updateDto: UpdateDirectoryDto,
    }),
  ],
})
export class DirectoriesModule {}
