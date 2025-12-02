// ✅ Обновлённый безопасный экспорт DTO без ошибки TS4023
import { createDirectoryZodDto } from './directory-dto.factory';

export class CreateDtoArchitectureStyle extends createDirectoryZodDto(
  'CreateDtoArchitectureStyle',
) {}
export class UpdateDtoArchitectureStyle extends createDirectoryZodDto(
  'UpdateDtoArchitectureStyle',
) {}

export class CreateDtoLicenseType extends createDirectoryZodDto(
  'CreateDtoLicenseType',
) {}
export class UpdateDtoLicenseType extends createDirectoryZodDto(
  'UpdateDtoLicenseType',
) {}

export class CreateDtoCriticalLevel extends createDirectoryZodDto(
  'CreateDtoCriticalLevel',
) {}
export class UpdateDtoCriticalLevel extends createDirectoryZodDto(
  'UpdateDtoCriticalLevel',
) {}

export class CreateDtoNodeType extends createDirectoryZodDto(
  'CreateDtoNodeType',
) {}
export class UpdateDtoNodeType extends createDirectoryZodDto(
  'UpdateDtoNodeType',
) {}

export class CreateDtoProtocolType extends createDirectoryZodDto(
  'CreateDtoProtocolType',
) {}
export class UpdateDtoProtocolType extends createDirectoryZodDto(
  'UpdateDtoProtocolType',
) {}

export class CreateDtoSoftwareType extends createDirectoryZodDto(
  'CreateDtoSoftwareType',
) {}
export class UpdateDtoSoftwareType extends createDirectoryZodDto(
  'UpdateDtoSoftwareType',
) {}
