import { DynamicModule, Module } from '@nestjs/common';
import { NamedObjectModule } from './named-object.module';
import { ApplicationComponent } from '../../../model/archimate/application/application-component.entity';
import { createNamedObjectZodDto } from '../../../model/dto/named-object.dto-factory';
import { ApplicationFunction } from '../../../model/archimate/application/application-function.entity';
import { TechnologyNetwork } from '../../../model/archimate/technology/technology-network.entity';
import { TechnologyHostNode } from '../../../model/archimate/technology/technology-node.entity';
import { TechnologyClusterNode } from '../../../model/archimate/technology/technology-node-cluster.entity';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { DataObject } from '../../../model/archimate/application/data-object.entity';
import { ApplicationEvent } from '../../../model/archimate/application/application-event.entity';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { Role } from '@/model/archimate/common/role.entity';
import { BusinessProduct } from '@/model/archimate/business/business-product.entity';
import { Capability } from '@/model/archimate/strategy/capability.entity';
import { Location } from '@/model/archimate/common/location.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';
import { Principle } from '@/model/archimate/motivation/principle.entity';
import { Requirement } from '@/model/archimate/motivation/requirement.entity';
import { Assessment } from '@/model/archimate/motivation/assessment.entity';
import { TechnologyLogicalNetwork } from '@/model/archimate/technology/technology-network.entity';

@Module({})
export class NamedObjectAutoRegistry {
  static registerAll(): DynamicModule {
    return {
      module: NamedObjectAutoRegistry,
      imports: [
        NamedObjectModule.register({
          tag: 'Компонент приложения',
          entity: ApplicationComponent,
          path: 'application-component',
          createDto: createNamedObjectZodDto('CreateDtoApplicationComponent'),
        }),
        NamedObjectModule.register({
          tag: 'Функция компонента приложения',
          entity: ApplicationFunction,
          path: 'application-functions',
          createDto: createNamedObjectZodDto('CreateDtoApplicationFunction'),
        }),
        NamedObjectModule.register({
          tag: 'Объект данных',
          entity: DataObject,
          path: 'data-objects',
          createDto: createNamedObjectZodDto('CreateDtoDataObject'),
        }),
        NamedObjectModule.register({
          tag: 'Событие приложения',
          entity: ApplicationEvent,
          path: 'application-events',
          createDto: createNamedObjectZodDto('CreateDtoApplicationEvent'),
        }),
        NamedObjectModule.register({
          tag: 'Технологическая сеть',
          entity: TechnologyLogicalNetwork,
          path: 'technology-networks',
          createDto: createNamedObjectZodDto('CreateDtoTechnologyNetwork'),
        }),
        NamedObjectModule.register({
          tag: 'Узлы',
          entity: TechnologyHostNode,
          path: 'technology-host-nodes',
          createDto: createNamedObjectZodDto('CreateDtoTechnologyHostNode'),
        }),
        NamedObjectModule.register({
          tag: 'Кластеры',
          entity: TechnologyClusterNode,
          path: 'technology-cluster-nodes',
          createDto: createNamedObjectZodDto('CreateDtoTechnologyClusterNode'),
        }),
        NamedObjectModule.register({
          tag: 'Устройства',
          entity: TechnologyDeviceNode,
          path: 'technology-device-nodes',
          createDto: createNamedObjectZodDto('CreateDtoTechnologyDeviceNode'),
        }),
        NamedObjectModule.register({
          tag: 'Бизнес-акторы',
          entity: BusinessActor,
          path: 'business-actors',
          createDto: createNamedObjectZodDto('CreateDtoBusinessActor'),
        }),
        NamedObjectModule.register({
          tag: 'Бизнес-роли',
          entity: Role,
          path: 'business-roles',
          createDto: createNamedObjectZodDto('CreateDtoBusinessRole'),
        }),
        NamedObjectModule.register({
          tag: 'Бизнес-продукты',
          entity: BusinessProduct,
          path: 'business-products',
          createDto: createNamedObjectZodDto('CreateDtoBusinessProduct'),
        }),
        NamedObjectModule.register({
          tag: 'Capability',
          entity: Capability,
          path: 'capabilities',
          createDto: createNamedObjectZodDto('CreateDtoCapability'),
        }),
        NamedObjectModule.register({
          tag: 'Локации',
          entity: Location,
          path: 'locations',
          createDto: createNamedObjectZodDto('CreateDtoLocation'),
        }),
        NamedObjectModule.register({
          tag: 'Стейкхолдеры',
          entity: Stakeholder,
          path: 'stakeholders',
          createDto: createNamedObjectZodDto('CreateDtoStakeholder'),
        }),
        NamedObjectModule.register({
          tag: 'Motivation: Principle',
          entity: Principle,
          path: 'motivation/principles',
          createDto: createNamedObjectZodDto('CreateDtoPrinciple'),
        }),
        NamedObjectModule.register({
          tag: 'Motivation: Constraint',
          entity: Constraint,
          path: 'motivation/constraints',
          createDto: createNamedObjectZodDto('CreateDtoConstraint'),
        }),
        NamedObjectModule.register({
          tag: 'Motivation: Requirement',
          entity: Requirement,
          path: 'motivation/requirements',
          createDto: createNamedObjectZodDto('CreateDtoRequirement'),
        }),
        NamedObjectModule.register({
          tag: 'Motivation: Assessment',
          entity: Assessment,
          path: 'motivation/assessments',
          createDto: createNamedObjectZodDto('CreateDtoAssessment'),
        }),
      ],
    };
  }
}
