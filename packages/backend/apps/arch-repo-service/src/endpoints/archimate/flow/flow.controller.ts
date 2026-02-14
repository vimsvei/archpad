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
import { FlowService } from '@/endpoints/archimate/flow/flow.service';
import {
  CreateDtoFlow,
  UpdateDtoFlow,
} from '@/endpoints/archimate/flow/flow.dto';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

class FlowListResponse {
  items!: unknown[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Потоки')
@ApiExtraModels(CreateDtoFlow, UpdateDtoFlow)
@Controller('flows')
export class FlowController {
  constructor(private readonly service: FlowService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка потоков' })
  @ApiQuery({
    name: 'layer',
    required: false,
    description:
      'Слой потока: application | technology. По умолчанию application',
  })
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
  @ApiOkResponse({ type: FlowListResponse as any })
  findAll(
    @Query('layer') layer?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.service.findAll({
      layer,
      search,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение полной карточки потока по id' })
  @ApiParam({ name: 'id', description: 'UUID потока' })
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание потока' })
  @ApiOkResponse()
  create(
    @Body() dto: CreateDtoFlow,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(dto, context);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение потока' })
  @ApiParam({ name: 'id', description: 'UUID потока' })
  @ApiOkResponse()
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoFlow,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.update(id, dto, context);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление потока' })
  @ApiParam({ name: 'id', description: 'UUID потока' })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Delete(':id/proxy-components/:componentId')
  @ApiOperation({ summary: 'Удаление посредника-компонента из application flow' })
  @ApiParam({ name: 'id', description: 'UUID потока' })
  @ApiParam({ name: 'componentId', description: 'UUID компонента' })
  @ApiOkResponse()
  deleteProxyComponent(
    @Param('id') id: string,
    @Param('componentId') componentId: string,
  ) {
    return this.service.removeProxyComponent(id, componentId);
  }

  @Delete(':id/proxy-nodes/:nodeId')
  @ApiOperation({ summary: 'Удаление посредника-узла из technology flow' })
  @ApiParam({ name: 'id', description: 'UUID потока' })
  @ApiParam({ name: 'nodeId', description: 'UUID узла' })
  @ApiOkResponse()
  deleteProxyNode(@Param('id') id: string, @Param('nodeId') nodeId: string) {
    return this.service.removeProxyNode(id, nodeId);
  }
}

