import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import {
  ArchitectureStyleDirectory,
  CriticalLevelDirectory,
  LicenseTypeDirectory,
} from '@/model/directories/directories';
import type {
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
} from '@/model/dto/application-component.dto';
import {ArchpadRequestContext} from "@/request-context/archpad-request-context";
import {ActionStamp} from "@archpad/models";

export type ApplicationComponentListQuery = {
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
export class ApplicationComponentService {
  constructor(
    @InjectRepository(ApplicationComponent)
    private readonly repo: EntityRepository<ApplicationComponent>,
  ) {}

  async findAll(
    query: ApplicationComponentListQuery,
  ): Promise<PaginatedResult<ApplicationComponent>> {
    const rawSearch = (query.search ?? '').trim();
    const search = rawSearch.length ? rawSearch : undefined;

    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(query.pageSize ?? 25) || 25),
    );
    const offset = (page - 1) * pageSize;

    const where: FilterQuery<ApplicationComponent> = search
      ? ({ name: { $ilike: `%${search}%` } } as any)
      : ({} as any);

    // MikroORM doesn't have "findAndCount" used elsewhere in this codebase,
    // but it's a stable API and avoids two separate queries.
    const [items, total] = await (this.repo as any).findAndCount(where, {
      limit: pageSize,
      offset,
      orderBy: { name: QueryOrder.ASC } as any,
    });

    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return {
      items,
      total,
      page,
      pageSize,
      pageCount,
    };
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ id } as FilterQuery<ApplicationComponent>);
  }

  async create(
    dto: CreateDtoApplicationComponent, context: ArchpadRequestContext
  ): Promise<ApplicationComponent> {
    const em = this.repo.getEntityManager();

    const entity = this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description,
      license: dto.licenseTypeId
        ? em.getReference(LicenseTypeDirectory, dto.licenseTypeId)
        : undefined,
      architectureStyle: dto.styleId
        ? em.getReference(ArchitectureStyleDirectory, dto.styleId)
        : undefined,
      criticalLevel: dto.criticalLevelId
        ? em.getReference(CriticalLevelDirectory, dto.criticalLevelId)
        : undefined,
      created: {
        at: new Date(),
        by: context.userId,
      } as ActionStamp,
    } as any);

    await em.persistAndFlush(entity);
    return entity;
  }

  async update(
    id: string,
    dto: UpdateDtoApplicationComponent,
    context: ArchpadRequestContext
  ): Promise<ApplicationComponent> {
    const em = this.repo.getEntityManager();
    const entity = await this.findOne(id);

    const patch: Partial<ApplicationComponent> = {
      ...(dto.code !== undefined ? { code: dto.code } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.licenseTypeId !== undefined
        ? {
            license: dto.licenseTypeId
              ? em.getReference(LicenseTypeDirectory, dto.licenseTypeId)
              : undefined,
          }
        : {}),
      ...(dto.styleId !== undefined
        ? {
            architectureStyle: dto.styleId
              ? em.getReference(ArchitectureStyleDirectory, dto.styleId)
              : undefined,
          }
        : {}),
      ...(dto.criticalLevelId !== undefined
        ? {
            criticalLevel: dto.criticalLevelId
              ? em.getReference(CriticalLevelDirectory, dto.criticalLevelId)
              : undefined,
          }
        : {}),
      updated: {
        at: new Date(),
        by: context.userId,
      }
    };

    this.repo.assign(entity, patch as any);
    await em.flush();
    return entity;
  }
}
