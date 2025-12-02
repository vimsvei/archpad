import { DynamicModule, Module } from '@nestjs/common';
import { NamedObjectModule } from '@/endpoints/archimate/named-object/named-object.module';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/entities/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/entities/archimate/application/application-interface.entity';
import { TechnologyNetwork } from '@/model/entities/archimate/technology/technology-network.entity';
import { TechnologyHostNode } from '@/model/entities/archimate/technology/technology-node.entity';
import { TechnologyClusterNode } from '@/model/entities/archimate/technology/technology-node-cluster.entity';
import { createNamedObjectZodDto } from '@/model/dto/named-object.dto-factory';

@Module({})
export class NamedObjectAutoRegistry {
  static registerAll(): DynamicModule {
    return {
      module: NamedObjectAutoRegistry,
      imports: [
        NamedObjectModule.register({
          tag: 'Компонент приложения',
          entity: ApplicationComponent,
          path: 'application-components',
          createDto: createNamedObjectZodDto('CreateDtoApplicationComponent'),
        }),
        NamedObjectModule.register({
          tag: 'Функция компонента приложения',
          entity: ApplicationFunction,
          path: 'application-functions',
          createDto: createNamedObjectZodDto('CreateDtoApplicationFunction'),
        }),
        NamedObjectModule.register({
          tag: 'Интерфейс компонента приложения',
          entity: ApplicationInterface,
          path: 'application-interfaces',
          createDto: createNamedObjectZodDto('CreateDtoApplicationInterface'),
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
