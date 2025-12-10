import { NamedObject } from '@archpad/models';
import {
  EntityRepository,
  FilterQuery,
  RequiredEntityData,
} from '@mikro-orm/core';

export class NamedObjectService<T extends NamedObject> {
  constructor(protected readonly repo: EntityRepository<T>) {}

  async create(data: RequiredEntityData<T>) {
    const entity = this.repo.create(data);
    await this.repo.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ id } as FilterQuery<T>);
  }

  async delete(id: string) {
    const entity = await this.repo.findOneOrFail({ id } as FilterQuery<T>);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
