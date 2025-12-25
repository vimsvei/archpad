import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApplicationInterfaceService } from './application-interface.service';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

const createApplicationInterfaceSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  componentId: z.string().uuid(),
});

class CreateDtoApplicationInterface extends createZodDto(
  createApplicationInterfaceSchema,
) {}

class ApplicationInterfaceListResponse {
  items!: ApplicationInterface[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Интерфейс компонента приложения')
@ApiExtraModels(ApplicationInterface, CreateDtoApplicationInterface)
@Controller('application-interfaces')
export class ApplicationInterfaceController {
  constructor(private readonly service: ApplicationInterfaceService) {}

  @Get()
  @ApiOperation({ summary: `Получение списка интерфейсов` })
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
  @ApiOkResponse({ type: ApplicationInterfaceListResponse as any })
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
  @ApiOperation({ summary: `Получение интерфейса по id` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: ApplicationInterface })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: `Создание интерфейса приложения + связь с компонентом (componentId обязателен)`,
  })
  @ApiOkResponse({ type: ApplicationInterface })
  create(
    @Body() dto: CreateDtoApplicationInterface,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.createWithComponent(dto, context);
  }
}


