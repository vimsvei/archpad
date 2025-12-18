export enum DirectoryKind {
  NODE_TYPE = 'directory.node.type',
  LICENSE_TYPE = 'directory.license.type',
  PROTOCOL_TYPE = 'directory.protocol.type',
  SOFTWARE_TYPE = 'directory.software.type',
  CRITICAL_LEVEL = 'directory.critical.level', // 3.1 recovery priority
  SOLUTION_STATE = 'directory.solution.state',
  COMPONENT_STATE = 'directory.component.state',
  STAKEHOLDER_ROLE = 'directory.stakeholder.role',
  ARCHITECTURE_STYLE = 'directory.architecture.style',
  FAILURE_HANDLING = 'directory.failure.handling', // 3.6
  FAILOVER_TYPE = 'directory.failover.type', // 3.2
  RECOVERY_TIME = 'directory.recovery.time', // 3.3
  REDUNDANCY_TYPE = 'directory.redundancy.type', // 3.4
  MONITORING_LEVEL = 'directory.monitoring.level', // 3.8
  SCALING_TYPE = 'directory.scaling.type', // 3.9
}
