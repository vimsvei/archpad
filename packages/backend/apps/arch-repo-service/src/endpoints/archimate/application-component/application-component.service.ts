import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';
import {
  ArchitectureStyleDirectory,
  CriticalLevelDirectory,
  LicenseTypeDirectory,
} from '@/model/directories/directories';
import type {
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
} from '@/model/dto/application-component.dto';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';

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
    @InjectRepository(ApplicationComponentDataObjectMap)
    private readonly dataObjectMapRepo: EntityRepository<ApplicationComponentDataObjectMap>,
    @InjectRepository(ApplicationComponentFunctionMap)
    private readonly functionMapRepo: EntityRepository<ApplicationComponentFunctionMap>,
    @InjectRepository(ApplicationComponentInterfaceMap)
    private readonly interfaceMapRepo: EntityRepository<ApplicationComponentInterfaceMap>,
    @InjectRepository(ApplicationComponentEventMap)
    private readonly eventMapRepo: EntityRepository<ApplicationComponentEventMap>,
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
    dto: CreateDtoApplicationComponent,
    context: ArchpadRequestContext,
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
    context: ArchpadRequestContext,
  ): Promise<ApplicationComponent> {
    const em = this.repo.getEntityManager();
    const entity = await this.findOne(id);

    const patch: Partial<ApplicationComponent> = {
      ...(dto.code !== undefined ? { code: dto.code } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined
        ? { description: dto.description }
        : {}),
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
      },
    };

    this.repo.assign(entity, patch as any);
    await em.flush();
    return entity;
  }

  async addDataObject(componentId: string, dataObjectId: string) {
    const em = this.repo.getEntityManager();

    // ensure component exists
    await this.findOne(componentId);

    const existing = await this.dataObjectMapRepo.findOne({
      component: componentId as any,
      dataObject: dataObjectId as any,
    } as any);
    if (existing) return existing;

    const map = this.dataObjectMapRepo.create({
      component: em.getReference(ApplicationComponent, componentId),
      dataObject: em.getReference(DataObject, dataObjectId),
    } as any);

    await em.persistAndFlush(map);
    return map;
  }

  async getDataObjects(componentId: string): Promise<DataObject[]> {
    await this.findOne(componentId);
    const maps = await this.dataObjectMapRepo.find(
      { component: componentId as any } as any,
      { populate: ['dataObject'] as any } as any,
    );
    return maps.map((m: any) => m.dataObject as DataObject).filter(Boolean);
  }

  async removeDataObject(componentId: string, dataObjectId: string) {
    const em = this.repo.getEntityManager();
    const map = await this.dataObjectMapRepo.findOneOrFail({
      component: componentId as any,
      dataObject: dataObjectId as any,
    } as any);
    await em.removeAndFlush(map);
  }

  async addFunction(componentId: string, functionId: string) {
    const em = this.repo.getEntityManager();

    // ensure component exists
    await this.findOne(componentId);

    const existing = await this.functionMapRepo.findOne({
      component: componentId as any,
      function: functionId as any,
    } as any);
    if (existing) return existing;

    const map = this.functionMapRepo.create({
      component: em.getReference(ApplicationComponent, componentId),
      function: em.getReference(ApplicationFunction, functionId),
    } as any);

    await em.persistAndFlush(map);
    return map;
  }

  async getFunctions(componentId: string): Promise<ApplicationFunction[]> {
    await this.findOne(componentId);
    const maps = await this.functionMapRepo.find(
      { component: componentId as any } as any,
      { populate: ['function'] as any } as any,
    );
    return maps.map((m: any) => m.function as ApplicationFunction).filter(Boolean);
  }

  async removeFunction(componentId: string, functionId: string) {
    const em = this.repo.getEntityManager();
    const map = await this.functionMapRepo.findOneOrFail({
      component: componentId as any,
      function: functionId as any,
    } as any);
    await em.removeAndFlush(map);
  }

  async getInterfaces(componentId: string): Promise<ApplicationInterface[]> {
    // ensure component exists
    await this.findOne(componentId);

    const maps = await this.interfaceMapRepo.find(
      { component: componentId as any } as any,
      { populate: ['interface'] as any } as any,
    );

    return maps
      .map((m: any) => m.interface as ApplicationInterface)
      .filter(Boolean);
  }

  async addInterface(componentId: string, interfaceId: string) {
    const em = this.repo.getEntityManager();

    // ensure component exists
    await this.findOne(componentId);

    const existing = await this.interfaceMapRepo.findOne({
      component: componentId as any,
      interface: interfaceId as any,
    } as any);
    if (existing) return existing;

    const map = this.interfaceMapRepo.create({
      component: em.getReference(ApplicationComponent, componentId),
      interface: em.getReference(ApplicationInterface, interfaceId),
    } as any);

    await em.persistAndFlush(map);
    return map;
  }

  async removeInterface(componentId: string, interfaceId: string) {
    const em = this.repo.getEntityManager();
    const map = await this.interfaceMapRepo.findOneOrFail({
      component: componentId as any,
      interface: interfaceId as any,
    } as any);
    await em.removeAndFlush(map);
  }

  async getEvents(componentId: string): Promise<ApplicationEvent[]> {
    await this.findOne(componentId);
    const maps = await this.eventMapRepo.find(
      { component: componentId as any } as any,
      { populate: ['event'] as any } as any,
    );
    return maps.map((m: any) => m.event as ApplicationEvent).filter(Boolean);
  }

  async addEvent(componentId: string, eventId: string) {
    const em = this.repo.getEntityManager();
    await this.findOne(componentId);

    const existing = await this.eventMapRepo.findOne({
      component: componentId as any,
      event: eventId as any,
    } as any);
    if (existing) return existing;

    const map = this.eventMapRepo.create({
      component: em.getReference(ApplicationComponent, componentId),
      event: em.getReference(ApplicationEvent, eventId),
    } as any);

    await em.persistAndFlush(map);
    return map;
  }

  async removeEvent(componentId: string, eventId: string) {
    const em = this.repo.getEntityManager();
    const map = await this.eventMapRepo.findOneOrFail({
      component: componentId as any,
      event: eventId as any,
    } as any);
    await em.removeAndFlush(map);
  }
}
