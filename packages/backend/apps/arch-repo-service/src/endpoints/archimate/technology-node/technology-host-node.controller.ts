import {
  Body,
  Controller,
  Delete,
  Get,
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
import { TechnologyHostNode } from '@/model/archimate/technology/technology-node.entity';
import { TechnologyHostNodeService } from './technology-host-node.service';
import { CreateDtoTechnologyHostNode } from '@/model/dto/technology-node.dto';

class TechnologyHostNodeListResponse {
  items!: TechnologyHostNode[];
  total!: number;
  page!: number;
  pageSize!: number;
  pageCount!: number;
}

@ApiTags('Узлы-хосты (Technology Host Node)')
@Controller('technology-host-nodes')
export class TechnologyHostNodeController {
  constructor(protected readonly service: TechnologyHostNodeService) {}

  @Post()
  @ApiOperation({ summary: 'Создание узла-хоста' })
  @ApiBody({ type: CreateDtoTechnologyHostNode })
  @ApiCreatedResponse({ type: TechnologyHostNode })
  create(
    @Body() dto: CreateDtoTechnologyHostNode,
    @ArchpadContext() context: ArchpadRequestContext,
  ) {
    return this.service.create(
      { code: dto.code, name: dto.name, description: dto.description },
      context,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Список узлов-хостов' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiOkResponse({ type: TechnologyHostNodeListResponse as any })
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
  @ApiOperation({ summary: 'Получение узла-хоста по id' })
  @ApiParam({ name: 'id', description: 'UUID' })
  @ApiOkResponse({ type: TechnologyHostNode })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление узла-хоста' })
  @ApiParam({ name: 'id', description: 'UUID' })
  @ApiNoContentResponse()
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
