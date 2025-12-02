// ✅ Zod-based directories.dto.ts с типами
import { createDirectoryZodDto } from './directory-dto.factory';

const CreateDtoArchitectureStyleClass = createDirectoryZodDto('CreateDtoArchitectureStyle');
export type CreateDtoArchitectureStyle = InstanceType<typeof CreateDtoArchitectureStyleClass>;
export { CreateDtoArchitectureStyleClass as CreateDtoArchitectureStyle };

const UpdateDtoArchitectureStyleClass = createDirectoryZodDto('UpdateDtoArchitectureStyle');
export type UpdateDtoArchitectureStyle = InstanceType<typeof UpdateDtoArchitectureStyleClass>;
export { UpdateDtoArchitectureStyleClass as UpdateDtoArchitectureStyle };

const CreateDtoLicenseTypeClass = createDirectoryZodDto('CreateDtoLicenseType');
export type CreateDtoLicenseType = InstanceType<typeof CreateDtoLicenseTypeClass>;
export { CreateDtoLicenseTypeClass as CreateDtoLicenseType };

const UpdateDtoLicenseTypeClass = createDirectoryZodDto('UpdateDtoLicenseType');
export type UpdateDtoLicenseType = InstanceType<typeof UpdateDtoLicenseTypeClass>;
export { UpdateDtoLicenseTypeClass as UpdateDtoLicenseType };

const CreateDtoCriticalLevelClass = createDirectoryZodDto('CreateDtoCriticalLevel');
export type CreateDtoCriticalLevel = InstanceType<typeof CreateDtoCriticalLevelClass>;
export { CreateDtoCriticalLevelClass as CreateDtoCriticalLevel };

const UpdateDtoCriticalLevelClass = createDirectoryZodDto('UpdateDtoCriticalLevel');
export type UpdateDtoCriticalLevel = InstanceType<typeof UpdateDtoCriticalLevelClass>;
export { UpdateDtoCriticalLevelClass as UpdateDtoCriticalLevel };

const CreateDtoNodeTypeClass = createDirectoryZodDto('CreateDtoNodeType');
export type CreateDtoNodeType = InstanceType<typeof CreateDtoNodeTypeClass>;
export { CreateDtoNodeTypeClass as CreateDtoNodeType };

const UpdateDtoNodeTypeClass = createDirectoryZodDto('UpdateDtoNodeType');
export type UpdateDtoNodeType = InstanceType<typeof UpdateDtoNodeTypeClass>;
export { UpdateDtoNodeTypeClass as UpdateDtoNodeType };

const CreateDtoProtocolTypeClass = createDirectoryZodDto('CreateDtoProtocolType');
export type CreateDtoProtocolType = InstanceType<typeof CreateDtoProtocolTypeClass>;
export { CreateDtoProtocolTypeClass as CreateDtoProtocolType };

const UpdateDtoProtocolTypeClass = createDirectoryZodDto('UpdateDtoProtocolType');
export type UpdateDtoProtocolType = InstanceType<typeof UpdateDtoProtocolTypeClass>;
export { UpdateDtoProtocolTypeClass as UpdateDtoProtocolType };

const CreateDtoSoftwareTypeClass = createDirectoryZodDto('CreateDtoSoftwareType');
export type CreateDtoSoftwareType = InstanceType<typeof CreateDtoSoftwareTypeClass>;
export { CreateDtoProtocolTypeClass as CreateDtoSoftwareType };

const UpdateDtoSoftwareTypeClass = createDirectoryZodDto('UpdateDtoSoftwareType');
export type UpdateDtoSoftwareType = InstanceType<typeof UpdateDtoSoftwareTypeClass>;
export { UpdateDtoSoftwareTypeClass as UpdateDtoSoftwareType };
