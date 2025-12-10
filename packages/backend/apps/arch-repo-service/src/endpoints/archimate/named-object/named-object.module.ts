import { DynamicModule, Module, Type } from '@nestjs/common';
import { NamedObject } from '@archpad/models';
import { createNamedObjectController } from '@/endpoints/archimate/named-object/named-object.controller';
import { NamedObjectService } from '@/endpoints/archimate/named-object/named-object.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';

export interface NamedObjectModuleOptions<
  TEntity extends NamedObject,
  TCreateDto,
> {
  tag: string;
  entity: Type<TEntity>;
  path: string;
  createDto: Type<TCreateDto>;
}

@Module({})
export class NamedObjectModule {
  static register<TEntity extends NamedObject, TCreateDto>(
    options: NamedObjectModuleOptions<TEntity, TCreateDto>,
  ): DynamicModule {
    const { tag, entity, path, createDto } = options;

    const controller = createNamedObjectController<TEntity, TCreateDto>(
      tag,
      path,
      entity,
      createDto,
    );

    return {
      module: NamedObjectModule,
      controllers: [controller],
      providers: [
        {
          provide: NamedObjectService,
          useFactory: (repo) => new NamedObjectService(repo),
          inject: [getRepositoryToken(entity)],
        },
      ],
      imports: [MikroOrmModule.forFeature([entity])],
    };
  }
}
