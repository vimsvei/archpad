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
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DirectoryLinkDto } from '@/model/dto/directory-link.dto';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';
import { DirectoryItemsMap } from '@/model/maps/directory-items.map';
import { LoggerService } from '@archpad/logger';
import { type ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';

export interface BaseDirectoryModuleOptions<
  Entity extends DirectoryObject,
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
  /**
   * Утилита для более компактной регистрации нескольких справочников сразу.
   * Возвращает массив DynamicModule, который можно "распылить" в imports.
   */
  static registerMany(
    options: Array<BaseDirectoryModuleOptions<any, any, any>>,
  ): DynamicModule[] {
    return options.map((o) => BaseDirectoryModule.register(o));
  }

  static register<
    Entity extends DirectoryObject,
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
        @InjectRepository(DirectoryItemsMap)
        mapRepo: EntityRepository<DirectoryItemsMap>,
        logger: LoggerService,
      ) {
        super(repo, mapRepo, entity, logger);
      }
    }

    @ApiTags(swaggerTag ?? EntityClass.name ?? path)
    @ApiExtraModels(EntityClass, CreateDtoClass, UpdateDtoClass)
    @Controller(path)
    class DirectoryController {
      constructor(private readonly service: DirectoryService) {}

      @Get()
      @ApiOperation({
        summary: 'Retrieve all directory items',
        description: 'Получить список всех элементов данного справочника.',
      })
      @ApiOkResponse({
        description: 'Успешно: возвращает массив объектов справочника.',
        type: EntityClass,
        isArray: true,
      })
      findAll() {
        return this.service.findAll();
      }

      @Get(':id')
      @ApiOperation({
        summary: 'Retrieve one directory item',
        description:
          'Получить элемент справочника по его уникальному идентификатору.',
      })
      @ApiParam({
        name: 'id',
        format: 'uuid',
        description: 'UUID элемента справочника',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @ApiOkResponse({
        description: 'Успешно: возвращает запрошенный объект справочника.',
        type: EntityClass,
      })
      @ApiNotFoundResponse({ description: 'Элемент с таким ID не найден.' })
      findOne(@Param('id') id: string) {
        return this.service.findOne(id);
      }

      @Post()
      @ApiOperation({
        summary: 'Create a new directory item',
        description:
          'Создать новый элемент справочника на основе переданных данных.',
      })
      @ApiBody({
        description: 'Данные для создания нового элемента справочника',
        type: CreateDtoClass,
      })
      @ApiCreatedResponse({
        description: 'Элемент успешно создан.',
        type: EntityClass,
      })
      create(
        @Body() dto: CreateDto,
        @ArchpadContext() context: ArchpadRequestContext,
      ) {
        return this.service.create(dto, context);
      }

      @Patch(':id')
      @ApiOperation({
        summary: 'Update an existing directory item',
        description:
          'Обновить существующий элемент справочника по его идентификатору.',
      })
      @ApiParam({
        name: 'id',
        description: 'UUID элемента справочника, который требуется обновить',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @ApiBody({
        description: 'Данные для обновления элемента справочника',
        type: UpdateDtoClass,
      })
      @ApiOkResponse({
        description: 'Элемент успешно обновлён.',
        type: EntityClass,
      })
      @ApiNotFoundResponse({ description: 'Элемент с таким ID не найден.' })
      update(
        @Param('id') id: string,
        @Body() dto: UpdateDto,
        @ArchpadContext() context: ArchpadRequestContext,
      ) {
        return this.service.update(id, dto, context);
      }

      @Delete(':id')
      @ApiOperation({
        summary: 'Delete a directory item',
        description:
          'Удалить элемент справочника по его уникальному идентификатору.',
      })
      @ApiParam({
        name: 'id',
        description: 'UUID элемента справочника, который требуется удалить',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @ApiNoContentResponse({
        description: 'Элемент успешно удалён (нет содержимого в ответе).',
      })
      @ApiNotFoundResponse({ description: 'Элемент с таким ID не найден.' })
      async remove(@Param('id') id: string) {
        await this.service.remove(id);
      }

      @Post(':id/links')
      @ApiOperation({ summary: 'Создать связь' })
      @ApiBody({ type: DirectoryLinkDto })
      async linkItem(@Param('id') id: string, @Body() dto: DirectoryLinkDto) {
        return this.service.addLink(id, dto);
      }

      @Delete(':id/links/:targetId')
      @ApiOperation({ summary: 'Удалить связь' })
      async deleteLink(
        @Param('id') id: string,
        @Param('targetId') targetId: string,
      ) {
        return this.service.deleteLink(id, targetId);
      }
    }

    return {
      module: BaseDirectoryModule,
      imports: [MikroOrmModule.forFeature([entity, DirectoryItemsMap])],
      providers: [DirectoryService, LoggerService],
      controllers: [DirectoryController],
      exports: [DirectoryService],
    };
  }
}
