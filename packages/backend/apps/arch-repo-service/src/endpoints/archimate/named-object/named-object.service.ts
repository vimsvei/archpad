import { ActionStamp, NamedObject } from '@archpad/models';
import {
  EntityRepository,
  FilterQuery,
  RequiredEntityData,
  QueryOrder,
} from '@mikro-orm/core';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';

export type NamedObjectListQuery = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

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

  async findAllPaginated(
    query: NamedObjectListQuery,
  ): Promise<PaginatedResult<T>> {
    const rawSearch = (query.search ?? '').trim();
    const search = rawSearch.length ? rawSearch : undefined;

    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(query.pageSize ?? 25) || 25),
    );
    const offset = (page - 1) * pageSize;

    const where: FilterQuery<T> = search
      ? ({ name: { $ilike: `%${search}%` } } as any)
      : ({} as any);

    const [items, total] = await (this.repo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });

    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return { items, total, page, pageSize, pageCount };
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ id } as FilterQuery<T>);
  }

  async delete(id: string) {
    const entity = await this.repo.findOneOrFail({ id } as FilterQuery<T>);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
