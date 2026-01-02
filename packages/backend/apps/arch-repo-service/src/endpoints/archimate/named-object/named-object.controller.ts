import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Type,
} from '@nestjs/common';
import { NamedObjectService } from './named-object.service';
import { NamedObject } from '@archpad/models';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredEntityData } from '@mikro-orm/core';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

export function createNamedObjectController<
  TEntity extends NamedObject,
  TCreateDto,
>(
  tag: string,
  controllerPath: string,
  entityClass: Type<TEntity>,
  createDtoClass: Type<TCreateDto>,
) {
  @ApiTags(tag)
  @ApiExtraModels(entityClass, createDtoClass)
  @Controller(controllerPath)
  class GeneratedController {
    constructor(readonly service: NamedObjectService<TEntity>) {}

    @Post()
    @ApiOperation({
      summary: `Создание ${entityClass.name}`,
    })
    @ApiBody({
      description: 'Данные для создания нового элемента',
      type: createDtoClass,
    })
    @ApiCreatedResponse({
      description: 'Элемент успешно создан.',
      type: entityClass,
    })
    create(
      @Body() dto: TCreateDto,
      @ArchpadContext() context: ArchpadRequestContext,
    ): Promise<TEntity> {
      return this.service.create(dto as RequiredEntityData<TEntity>, context);
    }

    @Get()
    @ApiOperation({ summary: `Получение списка ${entityClass.name}` })
    @ApiQuery({
      name: 'search',
      required: false,
      description: 'Фильтрация по name (contains, case-insensitive)',
    })
    @ApiQuery({
      name: 'page',
      required: false,
      description: 'Номер страницы (1..N)',
      example: 1,
    })
    @ApiQuery({
      name: 'pageSize',
      required: false,
      description: 'Размер страницы (1..100)',
      example: 25,
    })
    @ApiOkResponse({ type: Object })
    findAll(
      @Query('search') search?: string,
      @Query('page') page?: string,
      @Query('pageSize') pageSize?: string,
    ) {
      return this.service.findAllPaginated({
        search,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      });
    }

    @Get(':id')
    @ApiOperation({ summary: `Получение ${entityClass.name} по id` })
    @ApiParam({
      name: 'id',
      description: 'UUID объекта',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Удаление ${entityClass.name}` })
    @ApiParam({
      name: 'id',
      description: 'UUID удаляемого объекта',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
      description: `${entityClass.name} успешно удалён`,
    })
    delete(@Param('id') id: string) {
      return this.service.delete(id);
    }
  }

  return GeneratedController;
}
