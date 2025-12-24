export enum DirectoryKind {
  NODE_TYPE = 'directory.node.type',
  SCALING_TYPE = 'directory.scaling.type', // 3.9
  LICENSE_TYPE = 'directory.license.type',
  PROTOCOL_TYPE = 'directory.protocol.type',
  SOFTWARE_TYPE = 'directory.software.type',
  FAILOVER_TYPE = 'directory.failover.type', // 3.2
  RECOVERY_TIME = 'directory.recovery.time', // 3.3
  SECURITY_ZONE = 'directory.security.zone',
  CRITICAL_LEVEL = 'directory.critical.level', // 3.1 recovery priority
  SOLUTION_STATE = 'directory.solution.state',
  REDUNDANCY_TYPE = 'directory.redundancy.type', // 3.4
  COMPONENT_STATE = 'directory.component.state',
  STAKEHOLDER_ROLE = 'directory.stakeholder.role',
  FAILURE_HANDLING = 'directory.failure.handling', // 3.6
  MONITORING_LEVEL = 'directory.monitoring.level', // 3.8
  ARCHITECTURE_STYLE = 'directory.architecture.style',
}
