import { NamedObject } from '../../../model/abstract/named-object.abstract';
import { EntityName, EntityRepository } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Delete,
  DynamicModule,
  Get,
  Injectable,
  Module,
  Param,
  Patch,
  Post,
  Type,
} from '@nestjs/common';
import { BaseDirectoryService } from './base-directory.service';
import { InjectRepository, MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

export interface BaseDirectoryModuleOptions<
  Entity extends NamedObject,
  CreateDto extends object = any,
  UpdateDto extends object = CreateDto,
> {
  /** Класс сущности MikroORM, например LicenseTypeDirectory */
  entity: EntityName<Entity>;

  /** Базовый путь контроллера, например 'license-types' */
  path: string;

  /** Имя тэга в Swagger (если не задан — возьмём имя класса или path) */
  swaggerTag?: string;

  /** DTO для создания (если не указать — будет использоваться entity) */
  createDto?: Type<CreateDto>;

  /** DTO для обновления (если не указать — будет использоваться createDto или entity) */
  updateDto?: Type<UpdateDto>;
}

@Module({})
export class BaseDirectoryModule {
  static register<
    Entity extends NamedObject,
    CreateDto extends object = any,
    UpdateDto extends object = CreateDto,
  >(
    options: BaseDirectoryModuleOptions<Entity, CreateDto, UpdateDto>,
  ): DynamicModule {
    const { entity, path, swaggerTag, createDto, updateDto } = options;

    const EntityClass = entity as any;
    const CreateDtoClass = createDto ?? EntityClass;
    const UpdateDtoClass = updateDto ?? createDto ?? EntityClass;

    @Injectable()
    class DirectoryService extends BaseDirectoryService<
      Entity,
      CreateDto,
      UpdateDto
    > {
      constructor(
        @InjectRepository(entity)
        repo: EntityRepository<Entity>,
      ) {
        super(repo, entity);
      }
    }

    @ApiTags(swaggerTag ?? EntityClass.name ?? path)
    @ApiExtraModels(EntityClass, CreateDtoClass, UpdateDtoClass)
    @Controller(path)
    class DirectoryController {
      constructor(private readonly service: DirectoryService) {}

      @Get()
      @ApiOkResponse({ type: EntityClass, isArray: true })
      findAll() {
        return this.service.findAll();
      }

      @Get(':id')
      @ApiOkResponse({ type: EntityClass })
      @ApiNotFoundResponse()
      findOne(@Param('id') id: string) {
        return this.service.findOne(id);
      }

      @Post()
      @ApiCreatedResponse({ type: EntityClass })
      @ApiBody({ type: CreateDtoClass })
      create(@Body() dto: CreateDto) {
        return this.service.create(dto);
      }

      @Patch(':id')
      @ApiOkResponse({ type: EntityClass })
      @ApiNotFoundResponse()
      @ApiBody({ type: UpdateDtoClass })
      update(@Param('id') id: string, @Body() dto: UpdateDto) {
        return this.service.update(id, dto);
      }

      @Delete(':id')
      @ApiNoContentResponse()
      @ApiNotFoundResponse()
      async remove(@Param('id') id: string) {
        await this.service.remove(id);
      }
    }

    return {
      module: BaseDirectoryModule,
      imports: [MikroOrmModule.forFeature([entity])],
      providers: [DirectoryService],
      controllers: [DirectoryController],
      exports: [DirectoryService],
    };
  }
}
