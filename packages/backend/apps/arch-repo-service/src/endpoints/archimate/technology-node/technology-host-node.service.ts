import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityRepository,
  FilterQuery,
  QueryOrder,
} from '@mikro-orm/core';
import { ActionStamp } from '@archpad/models';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';
import { TechnologyHostNode } from '@/model/archimate/technology/technology-node.entity';
import { TechnologyNodeDefaultsService } from '../technology-node-defaults/technology-node-defaults.service';
import type {
  TechnologyNodeListQuery,
  PaginatedResult,
} from './technology-device-node.service';

export type CreateTechnologyHostNodeDto = {
  code: string;
  name: string;
  description?: string;
};

export type UpdateTechnologyHostNodeDto = {
  code?: string;
  name?: string;
  description?: string;
};

@Injectable()
export class TechnologyHostNodeService {
  constructor(
    @InjectRepository(TechnologyHostNode)
    private readonly repo: EntityRepository<TechnologyHostNode>,
    private readonly defaultsService: TechnologyNodeDefaultsService,
  ) {}

  async create(
    dto: CreateTechnologyHostNodeDto,
    context: ArchpadRequestContext,
  ): Promise<TechnologyHostNode> {
    const em = this.repo.getEntityManager();
    const { type, operatingSystem } =
      await this.defaultsService.getDefaultsForHost(em, context);
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
  ): Promise<PaginatedResult<TechnologyHostNode>> {
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
    const where: FilterQuery<TechnologyHostNode> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<TechnologyHostNode>;
    const [items, total] = await (this.repo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    return { items, total, page, pageSize, pageCount };
  }

  findOne(id: string): Promise<TechnologyHostNode> {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<TechnologyHostNode> = tenantId
      ? ({ id, tenantId } as FilterQuery<TechnologyHostNode>)
      : ({ id } as FilterQuery<TechnologyHostNode>);
    return this.repo.findOneOrFail(where);
  }

  async update(
    id: string,
    dto: UpdateTechnologyHostNodeDto,
    context: ArchpadRequestContext,
  ): Promise<TechnologyHostNode> {
    const entity = await this.findOne(id);

    if (dto.code !== undefined) entity.code = dto.code;
    if (dto.name !== undefined) entity.name = dto.name;
    if (dto.description !== undefined) entity.description = dto.description;
    (entity as any).updated = ActionStamp.now(context.userId) as any;

    await this.repo.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<TechnologyHostNode> = tenantId
      ? ({ id, tenantId } as FilterQuery<TechnologyHostNode>)
      : ({ id } as FilterQuery<TechnologyHostNode>);
    const entity = await this.repo.findOneOrFail(where);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }
}
