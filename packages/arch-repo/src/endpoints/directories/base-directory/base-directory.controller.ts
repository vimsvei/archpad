import { BaseDirectoryService } from './base-directory.service';
import { NamedObject } from '../../../model/abstract/named-object.abstract';

export class BaseDirectoryController<
  Entity extends NamedObject,
  CreateDto extends object = any,
  UpdateDto extends object = CreateDto,
> {
  constructor(
    protected readonly service: BaseDirectoryService<
      Entity,
      CreateDto,
      UpdateDto
    >,
  ) {}

  // тут НЕТ nest-декораторов — это просто “бизнес”-методы,
  // поверх них будем навешивать @Get/@Post/@Swagger в наследнике

  findAll() {
    return this.service.findAll();
  }

  findOne(id: string) {
    return this.service.findOne(id);
  }

  create(dto: CreateDto) {
    return this.service.create(dto);
  }

  update(id: string, dto: UpdateDto) {
    return this.service.update(id, dto);
  }

  async remove(id: string) {
    await this.service.remove(id);
  }
}
