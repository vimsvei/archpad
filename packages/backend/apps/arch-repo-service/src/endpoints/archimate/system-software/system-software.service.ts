import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { TechnologyNodeSystemSoftwareMap } from '@/model/maps/technology-node-system-software.map';
import {
  LicenseTypeDirectory,
  SoftwareTypeDirectory,
} from '@/model/directories/directories';
import type {
  CreateDtoSystemSoftware,
  UpdateDtoSystemSoftware,
} from '@/model/dto/system-software.dto';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';
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
    @InjectRepository(ApplicationComponentSystemSoftwareMap)
    private readonly componentMapRepo: EntityRepository<ApplicationComponentSystemSoftwareMap>,
    @InjectRepository(TechnologyNodeSystemSoftwareMap)
    private readonly nodeMapRepo: EntityRepository<TechnologyNodeSystemSoftwareMap>,
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

    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<SystemSoftware> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<SystemSoftware>;

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
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<SystemSoftware> = tenantId
      ? ({ id, tenantId } as FilterQuery<SystemSoftware>)
      : ({ id } as FilterQuery<SystemSoftware>);
    return this.repo.findOneOrFail(where);
  }

  async create(
    dto: CreateDtoSystemSoftware,
    context: ArchpadRequestContext,
  ): Promise<SystemSoftware> {
    const em = this.repo.getEntityManager();
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];

    const entity = this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description,
      version: dto.version,
      kind: dto.kind ?? SystemSoftwareKind.OTHER,
      ...(dto.radarArea !== undefined ? { radarArea: dto.radarArea } : {}),
      ...(tenantId ? { tenantId } : {}),
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
      ...(dto.radarArea !== undefined ? { radarArea: dto.radarArea } : {}),
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

  async removeComponentRelation(
    systemSoftwareId: string,
    componentId: string,
  ): Promise<void> {
    await this.findOne(systemSoftwareId);
    const em = this.repo.getEntityManager();
    const map = await this.componentMapRepo.findOne({
      systemSoftware: systemSoftwareId as any,
      component: componentId as any,
    } as any);
    if (!map) return;
    await em.removeAndFlush(map);
  }

  async removeNodeRelation(
    systemSoftwareId: string,
    nodeId: string,
  ): Promise<void> {
    await this.findOne(systemSoftwareId);
    const em = this.repo.getEntityManager();
    const map = await this.nodeMapRepo.findOne({
      systemSoftware: systemSoftwareId as any,
      node: nodeId as any,
    } as any);
    if (!map) return;
    await em.removeAndFlush(map);
  }
}
