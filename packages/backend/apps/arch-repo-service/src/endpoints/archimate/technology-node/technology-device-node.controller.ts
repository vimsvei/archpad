import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { TechnologyDeviceNodeService } from './technology-device-node.service';
import {
  CreateDtoTechnologyDeviceNode,
  UpdateDtoTechnologyDeviceNode,
} from '@/model/dto/technology-node.dto';

class TechnologyDeviceNodeListResponse {
  items!: TechnologyDeviceNode[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Устройства (Technology Device Node)')
@Controller('technology-device-nodes')
export class TechnologyDeviceNodeController {
  constructor(
    protected readonly service: TechnologyDeviceNodeService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание устройства' })
  @ApiBody({ type: CreateDtoTechnologyDeviceNode })
  @ApiCreatedResponse({ type: TechnologyDeviceNode })
  create(
    @Body() dto: CreateDtoTechnologyDeviceNode,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(
      { code: dto.code, name: dto.name, description: dto.description },
      context,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Список устройств' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiOkResponse({ type: TechnologyDeviceNodeListResponse as any })
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
  @ApiOperation({ summary: 'Получение устройства по id' })
  @ApiParam({ name: 'id', description: 'UUID' })
  @ApiOkResponse({ type: TechnologyDeviceNode })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление устройства' })
  @ApiParam({ name: 'id', description: 'UUID' })
  @ApiBody({ type: UpdateDtoTechnologyDeviceNode })
  @ApiOkResponse({ type: TechnologyDeviceNode })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoTechnologyDeviceNode,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.update(id, dto, context);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление устройства' })
  @ApiParam({ name: 'id', description: 'UUID' })
  @ApiNoContentResponse()
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
