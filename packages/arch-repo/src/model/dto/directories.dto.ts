import {
  createDirectoryCreateDto,
  createDirectoryUpdateDto,
} from '@/model/dto/directory-dto.factory';
import { LicenseTypeDirectory } from '@/model/entities/directories/license-type.directory';
import { ArchitectureStyleDirectory } from '@/model/entities/directories/architecture-style.directory';
import { CriticalLevelDirectory } from '@/model/entities/directories/critical-level.directory';
import { NodeTypeDirectory } from '@/model/entities/directories/node-type.directory';
import { SoftwareTypeDirectory } from '@/model/entities/directories/software-type.directory';
import { ProtocolTypeDirectory } from '@/model/entities/directories/protocol-type.directory';

export class CreateDtoArchitectureStyle extends createDirectoryCreateDto(
  ArchitectureStyleDirectory,
) {}
export class UpdateDtoArchitectureStyle extends createDirectoryUpdateDto(
  CreateDtoArchitectureStyle,
) {}

export class CreateDtoCriticalLevel extends createDirectoryCreateDto(
  CriticalLevelDirectory,
) {}
export class UpdateDtoCriticalLevel extends createDirectoryUpdateDto(
  CreateDtoCriticalLevel,
) {}

export class CreateDtoLicenseType extends createDirectoryCreateDto(
  LicenseTypeDirectory,
) {}
export class UpdateDtoLicenseType extends createDirectoryUpdateDto(
  CreateDtoLicenseType,
) {}

export class CreateDtoNodeType extends createDirectoryCreateDto(
  NodeTypeDirectory,
) {}
export class UpdateDtoNodeType extends createDirectoryUpdateDto(
  CreateDtoNodeType,
) {}

export class CreateDtoSoftwareType extends createDirectoryCreateDto(
  SoftwareTypeDirectory,
) {}
export class UpdateDtoSoftwareType extends createDirectoryUpdateDto(
  CreateDtoSoftwareType,
) {}

export class CreateDtoProtocolType extends createDirectoryCreateDto(
  ProtocolTypeDirectory,
) {}
export class UpdateDtoProtocolType extends createDirectoryUpdateDto(
  CreateDtoProtocolType,
) {}
