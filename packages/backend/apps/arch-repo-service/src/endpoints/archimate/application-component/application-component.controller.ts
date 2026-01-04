import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationComponentService } from './application-component.service';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import {
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
} from '@/model/dto/application-component.dto';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

class LinkDataObjectDto {
  dataObjectId!: string;
}

class LinkFunctionDto {
  functionId!: string;
}

class LinkInterfaceDto {
  interfaceId!: string;
}

class LinkEventDto {
  eventId!: string;
}

class ApplicationComponentListResponse {
  // NOTE: swagger decorators on properties are optional here; we keep response shape minimal.
  items!: ApplicationComponent[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Компонент приложения')
@ApiExtraModels(
  ApplicationComponent,
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
)
@Controller('application-components')
export class ApplicationComponentController {
  constructor(protected readonly service: ApplicationComponentService) {}

  @Get()
  @ApiOperation({ summary: `Получение списка компонентов приложений` })
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
  @ApiOkResponse({ type: ApplicationComponentListResponse as any })
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.service.findAll({
      search,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: `Получение компонента приложения по id` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: ApplicationComponent })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: `Создание компонента приложения` })
  @ApiOkResponse({ type: ApplicationComponent })
  create(
    @Body() dto: CreateDtoApplicationComponent,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(dto, context);
  }

  @Put(':id')
  @ApiOperation({
    summary: `Полное обновление компонента приложения со всеми связанными данными`,
    description:
      'Полностью перезаписывает компонент приложения и все его связи (функции, объекты данных, интерфейсы, события, системное ПО, технологические узлы, сети, иерархия) в одной транзакции. Все существующие связи, которые не переданы в запросе, будут удалены.',
  })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: ApplicationComponent })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoApplicationComponent,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.update(id, dto, context);
  }

  @Post(':id/data-objects')
  @ApiOperation({
    summary:
      'Создать связь компонент ↔ объект данных (map_application_component_data_object)',
  })
  addDataObject(
    @Param('id') componentId: string,
    @Body() dto: LinkDataObjectDto,
  ) {
    return this.service.addDataObject(componentId, dto.dataObjectId);
  }

  @Get(':id/data-objects')
  @ApiOperation({
    summary:
      'Получить объекты данных компонента (через map_application_component_data_object)',
  })
  getDataObjects(@Param('id') componentId: string) {
    return this.service.getDataObjects(componentId);
  }

  @Delete(':id/data-objects/:dataObjectId')
  @ApiOperation({
    summary:
      'Удалить связь компонент ↔ объект данных (map_application_component_data_object)',
  })
  removeDataObject(
    @Param('id') componentId: string,
    @Param('dataObjectId') dataObjectId: string,
  ) {
    return this.service.removeDataObject(componentId, dataObjectId);
  }

  @Post(':id/functions')
  @ApiOperation({
    summary:
      'Создать связь компонент ↔ функция (map_application_component_function)',
  })
  addFunction(@Param('id') componentId: string, @Body() dto: LinkFunctionDto) {
    return this.service.addFunction(componentId, dto.functionId);
  }

  @Get(':id/functions')
  @ApiOperation({
    summary:
      'Получить функции компонента (через map_application_component_function)',
  })
  getFunctions(@Param('id') componentId: string) {
    return this.service.getFunctions(componentId);
  }

  @Delete(':id/functions/:functionId')
  @ApiOperation({
    summary:
      'Удалить связь компонент ↔ функция (map_application_component_function)',
  })
  removeFunction(
    @Param('id') componentId: string,
    @Param('functionId') functionId: string,
  ) {
    return this.service.removeFunction(componentId, functionId);
  }

  @Get(':id/interfaces')
  @ApiOperation({
    summary:
      'Получить интерфейсы компонента (через map_application_component_interface)',
  })
  getInterfaces(@Param('id') componentId: string) {
    return this.service.getInterfaces(componentId);
  }

  @Post(':id/interfaces')
  @ApiOperation({
    summary:
      'Создать связь компонент ↔ интерфейс (map_application_component_interface)',
  })
  addInterface(
    @Param('id') componentId: string,
    @Body() dto: LinkInterfaceDto,
  ) {
    return this.service.addInterface(componentId, dto.interfaceId);
  }

  @Delete(':id/interfaces/:interfaceId')
  @ApiOperation({
    summary:
      'Удалить связь компонент ↔ интерфейс (map_application_component_interface)',
  })
  removeInterface(
    @Param('id') componentId: string,
    @Param('interfaceId') interfaceId: string,
  ) {
    return this.service.removeInterface(componentId, interfaceId);
  }

  @Get(':id/events')
  @ApiOperation({
    summary:
      'Получить события компонента (через map_application_component_event)',
  })
  getEvents(@Param('id') componentId: string) {
    return this.service.getEvents(componentId);
  }

  @Post(':id/events')
  @ApiOperation({
    summary:
      'Создать связь компонент ↔ событие (map_application_component_event)',
  })
  addEvent(@Param('id') componentId: string, @Body() dto: LinkEventDto) {
    return this.service.addEvent(componentId, dto.eventId);
  }

  @Delete(':id/events/:eventId')
  @ApiOperation({
    summary:
      'Удалить связь компонент ↔ событие (map_application_component_event)',
  })
  removeEvent(
    @Param('id') componentId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.service.removeEvent(componentId, eventId);
  }

  @Get(':id/flows')
  @ApiOperation({
    summary: 'Получить потоки компонента (входящие и исходящие)',
  })
  getFlows(@Param('id') componentId: string) {
    return this.service.getFlows(componentId);
  }
}
