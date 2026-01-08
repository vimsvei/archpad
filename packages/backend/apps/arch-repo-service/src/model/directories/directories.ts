import { Entity } from '@mikro-orm/core';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';

@Entity({ discriminatorValue: DirectoryKind.ARCHITECTURE_STYLE })
export class ArchitectureStyleDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.COMPONENT_STATE })
export class ComponentStateDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.CRITICAL_LEVEL })
export class CriticalLevelDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.LICENSE_TYPE })
export class LicenseTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.NODE_TYPE })
export class NodeTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.PROTOCOL_TYPE })
export class ProtocolTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.SOFTWARE_TYPE })
export class SoftwareTypeDirectory extends DirectoryObject {}

// @Entity({ discriminatorValue: DirectoryKind.SOLUTION_STATE })
// export class SolutionStateDirectory extends DirectoryObject {}

// @Entity({ discriminatorValue: DirectoryKind.STAKEHOLDER_ROLE })
// export class StakeholderRoleDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.FAILURE_HANDLING })
export class FailureHandlingDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.FAILOVER_TYPE })
export class FailoverTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.RECOVERY_TIME })
export class RecoveryTimeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.REDUNDANCY_TYPE })
export class RedundancyTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.MONITORING_LEVEL })
export class MonitoringLevelDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.SCALING_TYPE })
export class ScalingTypeDirectory extends DirectoryObject {}

@Entity({ discriminatorValue: DirectoryKind.SECURITY_ZONE })
export class SecurityZoneDirectory extends DirectoryObject {}
