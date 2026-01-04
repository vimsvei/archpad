import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { SystemSoftwareService } from './system-software.service';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import {
  CreateDtoSystemSoftware,
  UpdateDtoSystemSoftware,
} from '@/model/dto/system-software.dto';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

class SystemSoftwareListResponse {
  // NOTE: swagger decorators on properties are optional here; we keep response shape minimal.
  items!: SystemSoftware[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Системное ПО')
@ApiExtraModels(
  SystemSoftware,
  CreateDtoSystemSoftware,
  UpdateDtoSystemSoftware,
)
@Controller('system-software')
export class SystemSoftwareController {
  constructor(protected readonly service: SystemSoftwareService) {}

  @Get()
  @ApiOperation({ summary: `Получение списка системного ПО` })
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
  @ApiOkResponse({ type: SystemSoftwareListResponse as any })
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
  @ApiOperation({ summary: `Получение системного ПО по id` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: SystemSoftware })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: `Создание системного ПО` })
  @ApiOkResponse({ type: SystemSoftware })
  create(
    @Body() dto: CreateDtoSystemSoftware,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(dto, context);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Изменение системного ПО` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse({ type: SystemSoftware })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoSystemSoftware,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.update(id, dto, context);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Удаление системного ПО` })
  @ApiParam({ name: 'id', description: 'UUID объекта' })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
