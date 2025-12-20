import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationComponentService } from './application-component.service';
import { ApplicationComponent } from '../../../model/archimate/application/application-component.entity';
import {
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
} from '@/model/dto/application-component.dto';

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
  create(@Body() dto: CreateDtoApplicationComponent) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Изменение компонента приложения` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: ApplicationComponent })
  update(@Param('id') id: string, @Body() dto: UpdateDtoApplicationComponent) {
    return this.service.update(id, dto);
  }
}
