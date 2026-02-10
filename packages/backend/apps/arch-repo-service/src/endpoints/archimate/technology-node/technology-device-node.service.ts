import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  QueryOrder,
} from '@mikro-orm/core';
import { ActionStamp } from '@archpad/models';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { TechnologyNodeDefaultsService } from '../technology-node-defaults/technology-node-defaults.service';

export type TechnologyNodeListQuery = {
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

export type CreateTechnologyDeviceNodeDto = {
  code: string;
  name: string;
  description?: string;
};

@Injectable()
export class TechnologyDeviceNodeService {
  constructor(
    @InjectRepository(TechnologyDeviceNode)
    private readonly repo: EntityRepository<TechnologyDeviceNode>,
    private readonly defaultsService: TechnologyNodeDefaultsService,
  ) {}

  async create(
    dto: CreateTechnologyDeviceNodeDto,
    context: ArchpadRequestContext,
  ): Promise<TechnologyDeviceNode> {
    const em = this.repo.getEntityManager();
    const { type, operatingSystem } =
      await this.defaultsService.getDefaultsForDevice(em, context);
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const entity = this.repo.create({
      ...dto,
      ...(tenantId ? { tenantId } : {}),
      type,
      operatingSystem,
      created: ActionStamp.now(context.userId) as any,
    } as any);
    await em.persistAndFlush(entity);
    return entity;
  }

  async findAllPaginated(
    query: TechnologyNodeListQuery,
  ): Promise<PaginatedResult<TechnologyDeviceNode>> {
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
    const where: FilterQuery<TechnologyDeviceNode> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<TechnologyDeviceNode>;
    const [items, total] = await (this.repo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    return { items, total, page, pageSize, pageCount };
  }

  findOne(id: string): Promise<TechnologyDeviceNode> {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<TechnologyDeviceNode> = tenantId
      ? ({ id, tenantId } as FilterQuery<TechnologyDeviceNode>)
      : ({ id } as FilterQuery<TechnologyDeviceNode>);
    return this.repo.findOneOrFail(where);
  }

  async delete(id: string): Promise<void> {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<TechnologyDeviceNode> = tenantId
      ? ({ id, tenantId } as FilterQuery<TechnologyDeviceNode>)
      : ({ id } as FilterQuery<TechnologyDeviceNode>);
    const entity = await this.repo.findOneOrFail(where);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
