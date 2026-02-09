import { ActionStamp, NamedObject } from '@archpad/models';
import {
  EntityRepository,
  FilterQuery,
  RequiredEntityData,
  QueryOrder,
} from '@mikro-orm/core';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';

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
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const entity = this.repo.create({
      ...(data as any),
      ...(tenantId ? { tenantId } : {}),
      created: ActionStamp.now(context.userId) as any,
    } as RequiredEntityData<T>);
    await this.repo.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  findAll() {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<T> = tenantId ? ({ tenantId } as any) : ({} as any);
    return this.repo.find(where);
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

    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<T> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<T>;

    const [items, total] = await (this.repo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });

    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return { items, total, page, pageSize, pageCount };
  }

  findOne(id: string) {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<T> = tenantId
      ? ({ id, tenantId } as FilterQuery<T>)
      : ({ id } as FilterQuery<T>);
    return this.repo.findOneOrFail(where);
  }

  async delete(id: string) {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<T> = tenantId
      ? ({ id, tenantId } as FilterQuery<T>)
      : ({ id } as FilterQuery<T>);
    const entity = await this.repo.findOneOrFail(where);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
