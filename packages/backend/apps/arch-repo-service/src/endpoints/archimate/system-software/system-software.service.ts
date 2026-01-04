import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import {
  LicenseTypeDirectory,
  SoftwareTypeDirectory,
} from '@/model/directories/directories';
import type {
  CreateDtoSystemSoftware,
  UpdateDtoSystemSoftware,
} from '@/model/dto/system-software.dto';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

export type SystemSoftwareListQuery = {
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
export class SystemSoftwareService {
  constructor(
    @InjectRepository(SystemSoftware)
    private readonly repo: EntityRepository<SystemSoftware>,
  ) {}

  async findAll(
    query: SystemSoftwareListQuery,
  ): Promise<PaginatedResult<SystemSoftware>> {
    const rawSearch = (query.search ?? '').trim();
    const search = rawSearch.length ? rawSearch : undefined;

    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(query.pageSize ?? 25) || 25),
    );
    const offset = (page - 1) * pageSize;

    const where: FilterQuery<SystemSoftware> = search
      ? ({ name: { $ilike: `%${search}%` } } as any)
      : ({} as any);

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
    return this.repo.findOneOrFail({ id } as FilterQuery<SystemSoftware>);
  }

  async create(
    dto: CreateDtoSystemSoftware,
    context: ArchpadRequestContext,
  ): Promise<SystemSoftware> {
    const em = this.repo.getEntityManager();

    const entity = this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description,
      version: dto.version,
      kind: dto.kind ?? SystemSoftwareKind.OTHER,
      type: dto.typeId
        ? em.getReference(SoftwareTypeDirectory, dto.typeId)
        : undefined,
      license: dto.licenseTypeId
        ? em.getReference(LicenseTypeDirectory, dto.licenseTypeId)
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
    dto: UpdateDtoSystemSoftware,
    context: ArchpadRequestContext,
  ): Promise<SystemSoftware> {
    const em = this.repo.getEntityManager();
    const entity = await this.findOne(id);

    const patch: Partial<SystemSoftware> = {
      ...(dto.code !== undefined ? { code: dto.code } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined
        ? { description: dto.description }
        : {}),
      ...(dto.version !== undefined ? { version: dto.version } : {}),
      ...(dto.kind !== undefined ? { kind: dto.kind } : {}),
      ...(dto.typeId !== undefined
        ? {
            type: dto.typeId
              ? em.getReference(SoftwareTypeDirectory, dto.typeId)
              : undefined,
          }
        : {}),
      ...(dto.licenseTypeId !== undefined
        ? {
            license: dto.licenseTypeId
              ? em.getReference(LicenseTypeDirectory, dto.licenseTypeId)
              : undefined,
          }
        : {}),
      updated: {
        at: new Date(),
        by: context.userId,
      },
    };

    this.repo.assign(entity, patch as any);
    await em.flush();
    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOne(id);
    const em = this.repo.getEntityManager();
    await em.removeAndFlush(entity);
  }
}
