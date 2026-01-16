import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SolutionService } from './solution.service';
import { Solution } from '@/model/solution/solution.entity';
import { CreateDtoSolution, UpdateDtoSolution } from '@/model/dto/solution.dto';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

class SolutionListResponse {
  // NOTE: swagger decorators on properties are optional here; we keep response shape minimal.
  items!: Solution[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Решение')
@ApiExtraModels(Solution, CreateDtoSolution, UpdateDtoSolution)
@Controller('solutions')
export class SolutionController {
  constructor(protected readonly service: SolutionService) {}

  @Get()
  @ApiOperation({ summary: `Получение списка решений` })
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
  @ApiOkResponse({ type: SolutionListResponse as any })
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
  @ApiOperation({ summary: `Получение решения по id` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: Solution })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: `Создание решения` })
  @ApiOkResponse({ type: Solution })
  create(
    @Body() dto: CreateDtoSolution,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(dto, context);
  }

  @Put(':id')
  @ApiOperation({
    summary: `Полное обновление решения со всеми связанными данными`,
    description:
      'Полностью перезаписывает решение и все его связи (компоненты, функции, объекты данных, потоки, мотивации, стейкхолдеры) в одной транзакции. Все существующие связи, которые не переданы в запросе, будут удалены.',
  })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: Solution })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoSolution,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.update(id, dto, context);
  }
}
