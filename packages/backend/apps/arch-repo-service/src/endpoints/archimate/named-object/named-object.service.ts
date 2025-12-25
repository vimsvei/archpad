import { ActionStamp, NamedObject } from '@archpad/models';
import {
  EntityRepository,
  FilterQuery,
  RequiredEntityData,
} from '@mikro-orm/core';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

export class NamedObjectService<T extends NamedObject> {
  constructor(protected readonly repo: EntityRepository<T>) {}

  async create(data: RequiredEntityData<T>, context: ArchpadRequestContext) {
    // Most domain objects extend BaseObject and have `created` stamp.
    // We set `created.by` from request context for auditing.
    const entity = this.repo.create({
      ...(data as any),
      created: ActionStamp.now(context.userId) as any,
    } as RequiredEntityData<T>);
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
