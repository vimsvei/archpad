import { Injectable } from '@nestjs/common';
import {
  EntityRepository,
  FilterQuery,
  QueryOrder,
  RequiredEntityData,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';

export type ApplicationInterfaceListQuery = {
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

@Injectable()
export class ApplicationInterfaceService {
  constructor(
    @InjectRepository(ApplicationInterface)
    private readonly interfaceRepo: EntityRepository<ApplicationInterface>,
    @InjectRepository(ApplicationComponentInterfaceMap)
    private readonly mapRepo: EntityRepository<ApplicationComponentInterfaceMap>,
  ) {}

  async findAll(
    query: ApplicationInterfaceListQuery,
  ): Promise<PaginatedResult<ApplicationInterface>> {
    const rawSearch = (query.search ?? '').trim();
    const search = rawSearch.length ? rawSearch : undefined;

    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(query.pageSize ?? 25) || 25));
    const offset = (page - 1) * pageSize;

    const where: FilterQuery<ApplicationInterface> = search
      ? ({ name: { $ilike: `%${search}%` } } as any)
      : ({} as any);

    const [items, total] = await (this.interfaceRepo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });

    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return { items, total, page, pageSize, pageCount };
  }

  findOne(id: string) {
    return this.interfaceRepo.findOneOrFail({ id } as any);
  }

  async createWithComponent(
    dto: {
    code: string;
    name: string;
    description?: string;
    componentId: string;
  },
    context: ArchpadRequestContext,
  ) {
    const em = this.interfaceRepo.getEntityManager();

    return em.transactional(async () => {
      const iface = this.interfaceRepo.create({
        code: dto.code,
        name: dto.name,
        description: dto.description,
        created: ActionStamp.now(context.userId),
      } as RequiredEntityData<ApplicationInterface>);

      const componentRef = em.getReference(ApplicationComponent, dto.componentId);
      const map = this.mapRepo.create({
        component: componentRef,
        interface: iface,
      } as any);

      await em.persistAndFlush([iface, map]);
      return iface;
    });
  }
}


