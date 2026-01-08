import {
  ArchitectureStyleDirectory,
  ComponentStateDirectory,
  CriticalLevelDirectory,
  FailoverTypeDirectory,
  FailureHandlingDirectory,
  LicenseTypeDirectory,
  MonitoringLevelDirectory,
  NodeTypeDirectory,
  ProtocolTypeDirectory,
  RecoveryTimeDirectory,
  RedundancyTypeDirectory,
  ScalingTypeDirectory,
  SecurityZoneDirectory,
  SoftwareTypeDirectory,
  // SolutionStateDirectory,
  StakeholderRoleDirectory,
} from '@/model/directories/directories';

export const DIRECTORIES = [
  {
    entity: ArchitectureStyleDirectory,
    path: 'architecture-styles',
    swaggerTag: 'Архитектурный стиль',
  },
  {
    entity: CriticalLevelDirectory,
    path: 'critical-levels',
    swaggerTag: 'Уровни критичности',
  },
  {
    entity: LicenseTypeDirectory,
    path: 'license-types',
    swaggerTag: 'Типы лицензий нв ПО',
  },
  {
    entity: NodeTypeDirectory,
    path: 'node-types',
    swaggerTag: 'Типы технологических узлов',
  },
  {
    entity: SoftwareTypeDirectory,
    path: 'software-types',
    swaggerTag: 'Тип системного ПО',
  },
  {
    entity: ProtocolTypeDirectory,
    path: 'protocol-types',
    swaggerTag: 'Тип сетевых протоколов',
  },
  // {
  //   entity: StakeholderRoleDirectory,
  //   path: 'stakeholder-roles',
  //   swaggerTag: 'Роли стейкхолдеров',
  // },
  // {
  //   entity: SolutionStateDirectory,
  //   path: 'solution-states',
  //   swaggerTag: 'Состояния решения',
  // },
  {
    entity: ComponentStateDirectory,
    path: 'component-states',
    swaggerTag: 'Состояния компонента',
  },
  {
    entity: FailureHandlingDirectory,
    path: 'failure-handlings',
    swaggerTag: 'Обработка отказов',
  },
  {
    entity: FailoverTypeDirectory,
    path: 'failover-types',
    swaggerTag: 'Типы failover',
  },
  {
    entity: RecoveryTimeDirectory,
    path: 'recovery-times',
    swaggerTag: 'Время восстановления',
  },
  {
    entity: RedundancyTypeDirectory,
    path: 'redundancy-types',
    swaggerTag: 'Типы резервирования',
  },
  {
    entity: MonitoringLevelDirectory,
    path: 'monitoring-levels',
    swaggerTag: 'Уровни мониторинга',
  },
  {
    entity: ScalingTypeDirectory,
    path: 'scaling-types',
    swaggerTag: 'Типы масштабирования',
  },
  {
    entity: SecurityZoneDirectory,
    path: 'security-zones',
    swaggerTag: 'Зоны безопасности',
  },
] as const;
