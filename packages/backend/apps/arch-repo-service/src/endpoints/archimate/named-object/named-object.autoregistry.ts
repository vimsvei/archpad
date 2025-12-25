import { DynamicModule, Module } from '@nestjs/common';
import { NamedObjectModule } from './named-object.module';
import { ApplicationComponent } from '../../../model/archimate/application/application-component.entity';
import { createNamedObjectZodDto } from '../../../model/dto/named-object.dto-factory';
import { ApplicationFunction } from '../../../model/archimate/application/application-function.entity';
import { TechnologyNetwork } from '../../../model/archimate/technology/technology-network.entity';
import { TechnologyHostNode } from '../../../model/archimate/technology/technology-node.entity';
import { TechnologyClusterNode } from '../../../model/archimate/technology/technology-node-cluster.entity';
import { DataObject } from '../../../model/archimate/application/data-object.entity';
import { ApplicationEvent } from '../../../model/archimate/application/application-event.entity';

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
          entity: TechnologyNetwork,
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
      ],
    };
  }
}
