import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Type,
} from '@nestjs/common';
import { NamedObjectService } from './named-object.service';
import { NamedObject } from '@/model/abstract/named-object.abstract';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredEntityData } from '@mikro-orm/core';

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
    create(@Body() dto: TCreateDto): Promise<TEntity> {
      return this.service.create(dto as RequiredEntityData<TEntity>);
    }

    // @Get()
    // @ApiOperation({ summary: `Получение списка ${entityClass.name}` })
    // @ApiOkResponse({ type: [entityClass] })
    // findAll() {
    //   return this.service.findAll();
    // }

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
