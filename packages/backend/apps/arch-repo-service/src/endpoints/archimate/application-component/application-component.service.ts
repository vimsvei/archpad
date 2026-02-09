import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentTechnologyNodeMap } from '@/model/maps/application-component-technology-node.map';
import { ApplicationComponentTechnologyLogicalNetworkMap } from '@/model/maps/application-component-technology-logical-network.map';
import { ApplicationComponentHierarchyMap } from '@/model/maps/application-component-hierarchy.map';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { TechnologyLogicalNetwork } from '@/model/archimate/technology/technology-network.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import {
  ArchitectureStyleDirectory,
  ComponentStateDirectory,
  CriticalLevelDirectory,
  FailoverTypeDirectory,
  LicenseTypeDirectory,
  MonitoringLevelDirectory,
  RecoveryTimeDirectory,
  RedundancyTypeDirectory,
  ScalingTypeDirectory,
} from '@/model/directories/directories';
import type {
  CreateDtoApplicationComponent,
  UpdateDtoApplicationComponent,
} from '@/model/dto/application-component.dto';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

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
    @InjectRepository(ApplicationComponentSystemSoftwareMap)
    private readonly systemSoftwareMapRepo: EntityRepository<ApplicationComponentSystemSoftwareMap>,
    @InjectRepository(ApplicationComponentTechnologyNodeMap)
    private readonly technologyNodeMapRepo: EntityRepository<ApplicationComponentTechnologyNodeMap>,
    @InjectRepository(ApplicationComponentTechnologyLogicalNetworkMap)
    private readonly technologyNetworkMapRepo: EntityRepository<ApplicationComponentTechnologyLogicalNetworkMap>,
    @InjectRepository(ApplicationComponentHierarchyMap)
    private readonly hierarchyMapRepo: EntityRepository<ApplicationComponentHierarchyMap>,
    @InjectRepository(ApplicationFlow)
    private readonly flowRepo: EntityRepository<ApplicationFlow>,
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

    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<ApplicationComponent> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<ApplicationComponent>;

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
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];
    const where: FilterQuery<ApplicationComponent> = tenantId
      ? ({ id, tenantId } as FilterQuery<ApplicationComponent>)
      : ({ id } as FilterQuery<ApplicationComponent>);
    return this.repo.findOneOrFail(where);
  }

  async create(
    dto: CreateDtoApplicationComponent,
    context: ArchpadRequestContext,
  ): Promise<ApplicationComponent> {
    const em = this.repo.getEntityManager();
    const ctx = getArchpadRequestContext();
    const tenantId = ctx?.tenantIds?.[0];

    const entity = this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description,
      ...(tenantId ? { tenantId } : {}),
      state: dto.stateId
        ? em.getReference(ComponentStateDirectory, dto.stateId)
        : undefined,
      created: {
        at: new Date(),
        by: context.userId,
      } as ActionStamp,
    } as any);

    await em.persistAndFlush(entity);
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
    return maps
      .map((m: any) => m.function as ApplicationFunction)
      .filter(Boolean);
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

  async getFlows(componentId: string): Promise<{
    incoming: ApplicationFlow[];
    outgoing: ApplicationFlow[];
  }> {
    await this.findOne(componentId);

    const [incoming, outgoing] = await Promise.all([
      this.flowRepo.find(
        { targetComponent: componentId as any } as any,
        {
          populate: [
            'sourceComponent',
            'sourceFunction',
            'targetComponent',
            'targetFunction',
          ] as any,
        } as any,
      ),
      this.flowRepo.find(
        { sourceComponent: componentId as any } as any,
        {
          populate: [
            'sourceComponent',
            'sourceFunction',
            'targetComponent',
            'targetFunction',
          ] as any,
        } as any,
      ),
    ]);

    return {
      incoming: incoming as ApplicationFlow[],
      outgoing: outgoing as ApplicationFlow[],
    };
  }

  async update(
    id: string,
    dto: UpdateDtoApplicationComponent,
    context: ArchpadRequestContext,
  ): Promise<ApplicationComponent> {
    const em = this.repo.getEntityManager();

    // Start transaction
    await em.transactional(async (trxEm) => {
      const entity = await trxEm.findOneOrFail(ApplicationComponent, {
        id,
      } as FilterQuery<ApplicationComponent>);

      // Update basic fields
      const patch: Partial<ApplicationComponent> = {
        ...(dto.code !== undefined ? { code: dto.code } : {}),
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
        ...(dto.stateId !== undefined
          ? {
              state: dto.stateId
                ? trxEm.getReference(ComponentStateDirectory, dto.stateId)
                : undefined,
            }
          : {}),
        ...(dto.licenseTypeId !== undefined
          ? {
              license: dto.licenseTypeId
                ? trxEm.getReference(LicenseTypeDirectory, dto.licenseTypeId)
                : undefined,
            }
          : {}),
        ...(dto.architectureStyleId !== undefined
          ? {
              architectureStyle: dto.architectureStyleId
                ? trxEm.getReference(
                    ArchitectureStyleDirectory,
                    dto.architectureStyleId,
                  )
                : undefined,
            }
          : {}),
        ...(dto.criticalLevelId !== undefined
          ? {
              criticalLevel: dto.criticalLevelId
                ? trxEm.getReference(
                    CriticalLevelDirectory,
                    dto.criticalLevelId,
                  )
                : undefined,
            }
          : {}),
        ...(dto.failoverTypeId !== undefined
          ? {
              failoverType: dto.failoverTypeId
                ? trxEm.getReference(FailoverTypeDirectory, dto.failoverTypeId)
                : undefined,
            }
          : {}),
        ...(dto.recoveryTimeId !== undefined
          ? {
              recoveryTime: dto.recoveryTimeId
                ? trxEm.getReference(RecoveryTimeDirectory, dto.recoveryTimeId)
                : undefined,
            }
          : {}),
        ...(dto.redundancyTypeId !== undefined
          ? {
              redundancyType: dto.redundancyTypeId
                ? trxEm.getReference(
                    RedundancyTypeDirectory,
                    dto.redundancyTypeId,
                  )
                : undefined,
            }
          : {}),
        ...(dto.monitoringLevelId !== undefined
          ? {
              monitoringLevel: dto.monitoringLevelId
                ? trxEm.getReference(
                    MonitoringLevelDirectory,
                    dto.monitoringLevelId,
                  )
                : undefined,
            }
          : {}),
        ...(dto.scalingTypeId !== undefined
          ? {
              scalingType: dto.scalingTypeId
                ? trxEm.getReference(ScalingTypeDirectory, dto.scalingTypeId)
                : undefined,
            }
          : {}),
        updated: {
          at: new Date(),
          by: context.userId,
        },
      };

      trxEm.assign(entity, patch as any);

      // Update functions - always replace all existing with provided ones
      const existingFunctionMaps = await trxEm.find(
        ApplicationComponentFunctionMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingFunctionMaps);

      if (dto.functionIds && dto.functionIds.length > 0) {
        for (const functionId of dto.functionIds) {
          const map = trxEm.create(ApplicationComponentFunctionMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            function: trxEm.getReference(ApplicationFunction, functionId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update data objects - always replace all existing with provided ones
      const existingDataObjectMaps = await trxEm.find(
        ApplicationComponentDataObjectMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingDataObjectMaps);

      if (dto.dataObjectIds && dto.dataObjectIds.length > 0) {
        for (const dataObjectId of dto.dataObjectIds) {
          const map = trxEm.create(ApplicationComponentDataObjectMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            dataObject: trxEm.getReference(DataObject, dataObjectId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update interfaces - always replace all existing with provided ones
      const existingInterfaceMaps = await trxEm.find(
        ApplicationComponentInterfaceMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingInterfaceMaps);

      if (dto.interfaceIds && dto.interfaceIds.length > 0) {
        for (const interfaceId of dto.interfaceIds) {
          const map = trxEm.create(ApplicationComponentInterfaceMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            interface: trxEm.getReference(ApplicationInterface, interfaceId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update events - always replace all existing with provided ones
      const existingEventMaps = await trxEm.find(ApplicationComponentEventMap, {
        component: id as any,
      } as any);
      await trxEm.remove(existingEventMaps);

      if (dto.eventIds && dto.eventIds.length > 0) {
        for (const eventId of dto.eventIds) {
          const map = trxEm.create(ApplicationComponentEventMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            event: trxEm.getReference(ApplicationEvent, eventId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update system software - always replace all existing with provided ones
      const existingSystemSoftwareMaps = await trxEm.find(
        ApplicationComponentSystemSoftwareMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingSystemSoftwareMaps);

      if (dto.systemSoftwareIds && dto.systemSoftwareIds.length > 0) {
        for (const item of dto.systemSoftwareIds) {
          const map = trxEm.create(ApplicationComponentSystemSoftwareMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            systemSoftware: trxEm.getReference(SystemSoftware, item.id),
            kind:
              (item.kind as SystemSoftwareKind) || SystemSoftwareKind.LIBRARY,
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update technology nodes - always replace all existing with provided ones
      const existingTechnologyNodeMaps = await trxEm.find(
        ApplicationComponentTechnologyNodeMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingTechnologyNodeMaps);

      if (dto.technologyNodeIds && dto.technologyNodeIds.length > 0) {
        for (const nodeId of dto.technologyNodeIds) {
          const map = trxEm.create(ApplicationComponentTechnologyNodeMap, {
            component: trxEm.getReference(ApplicationComponent, id),
            node: trxEm.getReference(TechnologyNode, nodeId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update technology networks - always replace all existing with provided ones
      const existingTechnologyNetworkMaps = await trxEm.find(
        ApplicationComponentTechnologyLogicalNetworkMap,
        {
          component: id as any,
        } as any,
      );
      await trxEm.remove(existingTechnologyNetworkMaps);

      if (dto.technologyNetworkIds && dto.technologyNetworkIds.length > 0) {
        for (const networkId of dto.technologyNetworkIds) {
          const map = trxEm.create(
            ApplicationComponentTechnologyLogicalNetworkMap,
            {
              component: trxEm.getReference(ApplicationComponent, id),
              logicalNetwork: trxEm.getReference(
                TechnologyLogicalNetwork,
                networkId,
              ),
            } as any,
          );
          await trxEm.persist(map);
        }
      }

      // Update parents (hierarchy) - always replace all existing with provided ones
      const existingParentMaps = await trxEm.find(
        ApplicationComponentHierarchyMap,
        {
          child: id as any,
        } as any,
      );
      await trxEm.remove(existingParentMaps);

      if (dto.parentIds && dto.parentIds.length > 0) {
        for (const parentId of dto.parentIds) {
          const map = trxEm.create(ApplicationComponentHierarchyMap, {
            parent: trxEm.getReference(ApplicationComponent, parentId),
            child: trxEm.getReference(ApplicationComponent, id),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update children (hierarchy) - always replace all existing with provided ones
      const existingChildMaps = await trxEm.find(
        ApplicationComponentHierarchyMap,
        {
          parent: id as any,
        } as any,
      );
      await trxEm.remove(existingChildMaps);

      if (dto.childIds && dto.childIds.length > 0) {
        for (const childId of dto.childIds) {
          const map = trxEm.create(ApplicationComponentHierarchyMap, {
            parent: trxEm.getReference(ApplicationComponent, id),
            child: trxEm.getReference(ApplicationComponent, childId),
          } as any);
          await trxEm.persist(map);
        }
      }

      await trxEm.flush();
    });

    return this.findOne(id);
  }
}
