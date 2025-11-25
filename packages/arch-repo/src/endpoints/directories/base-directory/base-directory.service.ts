import { NamedObject } from '../../../model/abstract/named-object.abstract';
import { EntityName, EntityRepository } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';

export class BaseDirectoryService<
  Entity extends NamedObject,
  CreateDto extends object = any,
  UpdateDto extends object = CreateDto,
> {
  constructor(
    protected readonly repo: EntityRepository<Entity>,
    protected readonly entityName: EntityName<Entity>,
  ) {}

  findAll(): Promise<Entity[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Entity> {
    const entity = await this.repo.findOne({ id } as any);
    if (!entity) {
      const name = (this.entityName as any).name ?? 'Entity';
      throw new NotFoundException(`${name} with id=${id} not found`);
    }
    return entity;
  }

  async create(dto: CreateDto): Promise<Entity> {
    const entity = this.repo.create(dto as any);
    await this.repo.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UpdateDto): Promise<Entity> {
    const entity = await this.findOne(id);
    this.repo.assign(entity, dto as any);
    await this.repo.getEntityManager().flush();
    return entity;
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
