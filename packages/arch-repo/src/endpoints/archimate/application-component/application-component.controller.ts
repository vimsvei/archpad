import { Controller, Get, Put } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationComponentService } from '@/endpoints/archimate/application-component/application-component.service';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';

@ApiTags('Компонент приложения')
@ApiExtraModels(ApplicationComponent)
@Controller('application-components')
export class ApplicationComponentController {
  constructor(protected readonly service: ApplicationComponentService) {}

  @Get()
  @ApiOperation({ summary: `Получение списка компонентов приложений` })
  @ApiOkResponse({ type: [ApplicationComponent] })
  findAll() {
    // return this.service.findAll();
  }

  @Put()
  @ApiOperation({ summary: `Изменение компонента приложения` })
  update() {}
}
