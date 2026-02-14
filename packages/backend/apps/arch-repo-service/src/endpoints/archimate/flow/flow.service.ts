import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  QueryOrder,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ActionStamp } from '@archpad/models';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { TechnologyFlow } from '@/model/archimate/relationships/technology-flow.entity';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { Environment } from '@/model/enums/environment.enum';
import { ApplicationFlowProxyComponentsMap } from '@/model/maps/application-flow-proxy-components.map';
import { TechnologyFlowProxyNodesMap } from '@/model/maps/technology-flow-proxy-nodes.map';
import { FlowMotivationItemMap } from '@/model/maps/flow-motivation-item.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { TechnologyInterface } from '@/model/archimate/technology/technology-interface.entity';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { Solution } from '@/model/solution/solution.entity';
import {
  CreateDtoFlow,
  UpdateDtoFlow,
} from '@/endpoints/archimate/flow/flow.dto';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';

export type FlowListQuery = {
  search?: string;
  page?: number;
  pageSize?: number;
  layer?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

type RelatedItemDto = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

type FlowProxyComponentDto = {
  order: number;
  component: RelatedItemDto;
};

type FlowProxyNodeDto = {
  order: number;
  node: RelatedItemDto;
};

type FlowSolutionDto = RelatedItemDto & { label: string | null };

type FlowPortDto = RelatedItemDto & { protocol: string | null };

type FlowListItem = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  layer: LayerKind;
  flowType: 'application' | 'technology';
  environment: Environment | null;
  source: RelatedItemDto | null;
  target: RelatedItemDto | null;
  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
};

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(ApplicationFlow)
    private readonly applicationFlowRepo: EntityRepository<ApplicationFlow>,
    @InjectRepository(TechnologyFlow)
    private readonly technologyFlowRepo: EntityRepository<TechnologyFlow>,
    @InjectRepository(ApplicationFlowProxyComponentsMap)
    private readonly applicationProxyRepo: EntityRepository<ApplicationFlowProxyComponentsMap>,
    @InjectRepository(TechnologyFlowProxyNodesMap)
    private readonly technologyProxyRepo: EntityRepository<TechnologyFlowProxyNodesMap>,
    @InjectRepository(FlowMotivationItemMap)
    private readonly flowMotivationRepo: EntityRepository<FlowMotivationItemMap>,
    @InjectRepository(SolutionFlowMap)
    private readonly solutionFlowRepo: EntityRepository<SolutionFlowMap>,
  ) {}

  async findAll(query: FlowListQuery): Promise<PaginatedResult<FlowListItem>> {
    const rawSearch = (query.search ?? '').trim();
    const search = rawSearch.length ? rawSearch : undefined;

    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(query.pageSize ?? 25) || 25),
    );
    const offset = (page - 1) * pageSize;

    const layer = this.parseLayer(query.layer);
    if (layer === LayerKind.APPLICATION) {
      return this.findApplicationFlows(search, page, pageSize, offset);
    }
    if (layer === LayerKind.TECHNOLOGY) {
      return this.findTechnologyFlows(search, page, pageSize, offset);
    }

    throw new BadRequestException(
      'Invalid layer. Supported values: application, technology',
    );
  }

  async findOne(id: string) {
    const applicationFlow = await this.findApplicationFlowWithRelations(id);
    if (applicationFlow) {
      return this.buildApplicationFlowDetail(applicationFlow);
    }

    const technologyFlow = await this.findTechnologyFlowWithRelations(id);
    if (technologyFlow) {
      return this.buildTechnologyFlowDetail(technologyFlow);
    }

    throw new NotFoundException(`Flow ${id} not found`);
  }

  async create(dto: CreateDtoFlow, context: ArchpadRequestContext) {
    const payload = dto as any;
    const em = this.applicationFlowRepo.getEntityManager();
    const tenantId = this.getTenantId();
    const now = new Date();

    if (payload.layer === LayerKind.APPLICATION) {
      const created = this.applicationFlowRepo.create({
        ...(payload.code !== undefined ? { code: payload.code } : {}),
        name: payload.name,
        ...(payload.description !== undefined
          ? { description: payload.description }
          : {}),
        layer: LayerKind.APPLICATION,
        ...(tenantId ? { tenantId } : {}),
        sourceComponent: em.getReference(ApplicationComponent, payload.sourceComponentId),
        targetComponent: em.getReference(ApplicationComponent, payload.targetComponentId),
        created: {
          at: now,
          by: context.userId,
        } as ActionStamp,
      } as any);

      if (payload.sourceFunctionId) {
        created.sourceFunction = await this.requireComponentFunctionMap(
          em,
          payload.sourceComponentId,
          payload.sourceFunctionId,
        );
      }
      if (payload.targetFunctionId) {
        created.targetFunction = await this.requireComponentFunctionMap(
          em,
          payload.targetComponentId,
          payload.targetFunctionId,
        );
      }
      if (payload.requestDataObjectId) {
        created.requestDataObject = await this.requireComponentDataObjectMap(
          em,
          payload.sourceComponentId,
          payload.requestDataObjectId,
        );
      }
      if (payload.responseDataObjectId) {
        created.responseDataObject = await this.requireComponentDataObjectMap(
          em,
          payload.sourceComponentId,
          payload.responseDataObjectId,
        );
      }

      await em.persistAndFlush(created);

      if (payload.proxyComponentIds !== undefined) {
        await this.syncApplicationProxyComponents(
          em,
          created.id,
          payload.proxyComponentIds,
        );
      }
      if (payload.motivationIds !== undefined) {
        await this.syncFlowMotivations(
          em,
          created.id,
          payload.motivationIds,
          LayerKind.APPLICATION,
        );
      }
      if (payload.solutionIds !== undefined) {
        await this.syncFlowSolutions(
          em,
          created.id,
          payload.solutionIds,
          LayerKind.APPLICATION,
        );
      }

      await em.flush();
      return this.findOne(created.id);
    }

    const created = this.technologyFlowRepo.create({
      ...(payload.code !== undefined ? { code: payload.code } : {}),
      name: payload.name,
      ...(payload.description !== undefined
        ? { description: payload.description }
        : {}),
      layer: LayerKind.TECHNOLOGY,
      environment: payload.environment ?? Environment.DEV,
      ...(tenantId ? { tenantId } : {}),
      sourceNode: em.getReference(TechnologyNode, payload.sourceNodeId),
      sourcePort: em.getReference(TechnologyInterface, payload.sourcePortId),
      targetNode: em.getReference(TechnologyNode, payload.targetNodeId),
      targetPort: em.getReference(TechnologyInterface, payload.targetPortId),
      created: {
        at: now,
        by: context.userId,
      } as ActionStamp,
    } as any);

    await em.persistAndFlush(created);

    if (payload.proxyNodeIds !== undefined) {
      await this.syncTechnologyProxyNodes(em, created.id, payload.proxyNodeIds);
    }
    if (payload.motivationIds !== undefined) {
      await this.syncFlowMotivations(
        em,
        created.id,
        payload.motivationIds,
        LayerKind.TECHNOLOGY,
      );
    }
    if (payload.solutionIds !== undefined) {
      await this.syncFlowSolutions(
        em,
        created.id,
        payload.solutionIds,
        LayerKind.TECHNOLOGY,
      );
    }

    await em.flush();
    return this.findOne(created.id);
  }

  async update(
    id: string,
    dto: UpdateDtoFlow,
    context: ArchpadRequestContext,
  ) {
    const em = this.applicationFlowRepo.getEntityManager();
    const updatedId = await em.transactional(async (trxEm) => {
      const applicationFlow = await this.findApplicationFlowForWrite(trxEm, id);
      if (applicationFlow) {
        await this.patchApplicationFlow(trxEm, applicationFlow, dto, context);
        return applicationFlow.id;
      }

      const technologyFlow = await this.findTechnologyFlowForWrite(trxEm, id);
      if (technologyFlow) {
        await this.patchTechnologyFlow(trxEm, technologyFlow, dto, context);
        return technologyFlow.id;
      }

      throw new NotFoundException(`Flow ${id} not found`);
    });

    return this.findOne(updatedId);
  }

  async delete(id: string): Promise<void> {
    const em = this.applicationFlowRepo.getEntityManager();
    await em.transactional(async (trxEm) => {
      const applicationFlow = await this.findApplicationFlowForWrite(trxEm, id);
      if (applicationFlow) {
        await this.deleteFlowMappings(trxEm, id);
        await trxEm.removeAndFlush(applicationFlow);
        return;
      }

      const technologyFlow = await this.findTechnologyFlowForWrite(trxEm, id);
      if (technologyFlow) {
        await this.deleteFlowMappings(trxEm, id);
        await trxEm.removeAndFlush(technologyFlow);
        return;
      }

      throw new NotFoundException(`Flow ${id} not found`);
    });
  }

  async removeProxyComponent(flowId: string, componentId: string): Promise<void> {
    const flow = await this.findApplicationFlowForWrite(
      this.applicationFlowRepo.getEntityManager(),
      flowId,
    );
    if (!flow) {
      throw new NotFoundException(`Application flow ${flowId} not found`);
    }

    const em = this.applicationFlowRepo.getEntityManager();
    const map = await this.applicationProxyRepo.findOne({
      flow: flowId as any,
      component: componentId as any,
    } as any);
    if (!map) return;

    await em.removeAndFlush(map);
    await this.reindexApplicationProxyComponents(em, flowId);
  }

  async removeProxyNode(flowId: string, nodeId: string): Promise<void> {
    const flow = await this.findTechnologyFlowForWrite(
      this.technologyFlowRepo.getEntityManager(),
      flowId,
    );
    if (!flow) {
      throw new NotFoundException(`Technology flow ${flowId} not found`);
    }

    const em = this.technologyFlowRepo.getEntityManager();
    const map = await this.technologyProxyRepo.findOne({
      flow: flowId as any,
      node: nodeId as any,
    } as any);
    if (!map) return;

    await em.removeAndFlush(map);
    await this.reindexTechnologyProxyNodes(em, flowId);
  }

  private async findApplicationFlows(
    search: string | undefined,
    page: number,
    pageSize: number,
    offset: number,
  ): Promise<PaginatedResult<FlowListItem>> {
    const tenantId = this.getTenantId();
    const where: FilterQuery<ApplicationFlow> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
      layer: LayerKind.APPLICATION,
    } as FilterQuery<ApplicationFlow>;

    const [items, total] = await (this.applicationFlowRepo as any).findAndCount(
      where,
      {
        limit: pageSize,
        offset,
        orderBy: { name: QueryOrder.ASC } as any,
        populate: ['sourceComponent', 'targetComponent'] as any,
      },
    );

    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    return {
      items: (items as ApplicationFlow[]).map((item) =>
        this.mapApplicationFlowListItem(item),
      ),
      total,
      page,
      pageSize,
      pageCount,
    };
  }

  private async findTechnologyFlows(
    search: string | undefined,
    page: number,
    pageSize: number,
    offset: number,
  ): Promise<PaginatedResult<FlowListItem>> {
    const tenantId = this.getTenantId();
    const where: FilterQuery<TechnologyFlow> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
      layer: LayerKind.TECHNOLOGY,
    } as FilterQuery<TechnologyFlow>;

    const [items, total] = await (this.technologyFlowRepo as any).findAndCount(
      where,
      {
        limit: pageSize,
        offset,
        orderBy: { name: QueryOrder.ASC } as any,
        populate: ['sourceNode', 'targetNode'] as any,
      },
    );

    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    return {
      items: (items as TechnologyFlow[]).map((item) =>
        this.mapTechnologyFlowListItem(item),
      ),
      total,
      page,
      pageSize,
      pageCount,
    };
  }

  private mapApplicationFlowListItem(flow: ApplicationFlow): FlowListItem {
    return {
      id: String(flow.id),
      code: String(flow.code ?? ''),
      name: String(flow.name ?? ''),
      description: flow.description ?? null,
      layer: LayerKind.APPLICATION,
      flowType: 'application',
      environment: null,
      source: this.mapRelatedItem(flow.sourceComponent),
      target: this.mapRelatedItem(flow.targetComponent),
      createdAt: this.getDateValue(flow, 'createdAt'),
      createdBy: this.getUserValue(flow, 'createdBy'),
      updatedAt: this.getDateValue(flow, 'updatedAt'),
      updatedBy: this.getUserValue(flow, 'updatedBy'),
    };
  }

  private mapTechnologyFlowListItem(flow: TechnologyFlow): FlowListItem {
    return {
      id: String(flow.id),
      code: String(flow.code ?? ''),
      name: String(flow.name ?? ''),
      description: flow.description ?? null,
      layer: LayerKind.TECHNOLOGY,
      flowType: 'technology',
      environment: flow.environment ?? null,
      source: this.mapRelatedItem(flow.sourceNode),
      target: this.mapRelatedItem(flow.targetNode),
      createdAt: this.getDateValue(flow, 'createdAt'),
      createdBy: this.getUserValue(flow, 'createdBy'),
      updatedAt: this.getDateValue(flow, 'updatedAt'),
      updatedBy: this.getUserValue(flow, 'updatedBy'),
    };
  }

  private async findApplicationFlowWithRelations(
    id: string,
  ): Promise<ApplicationFlow | null> {
    return this.applicationFlowRepo.findOne(this.flowWhere(id) as any, {
      populate: [
        'sourceComponent',
        'sourceFunction',
        'sourceFunction.function',
        'targetComponent',
        'targetFunction',
        'targetFunction.function',
        'requestDataObject',
        'requestDataObject.dataObject',
        'responseDataObject',
        'responseDataObject.dataObject',
      ] as any,
    } as any);
  }

  private async findTechnologyFlowWithRelations(
    id: string,
  ): Promise<TechnologyFlow | null> {
    return this.technologyFlowRepo.findOne(this.flowWhere(id) as any, {
      populate: [
        'sourceNode',
        'sourcePort',
        'sourcePort.protocol',
        'targetNode',
        'targetPort',
        'targetPort.protocol',
      ] as any,
    } as any);
  }

  private async buildApplicationFlowDetail(flow: ApplicationFlow) {
    const [proxyMaps, motivationMaps, solutionMaps] = await Promise.all([
        this.applicationProxyRepo.find(
          this.flowMapWhere({ flow: flow.id as any }),
          {
            populate: ['component'] as any,
            orderBy: { order: QueryOrder.ASC } as any,
          } as any,
        ),
        this.flowMotivationRepo.find(this.flowMapWhere({ flow: flow.id as any }), {
          populate: ['assessment'] as any,
        } as any),
        this.solutionFlowRepo.find(this.flowMapWhere({ flow: flow.id as any }), {
          populate: ['solution'] as any,
        } as any),
      ]);

    const requestDataObject = this.mapRelatedItem(
      (flow.requestDataObject as any)?.dataObject,
    );
    const responseDataObject = this.mapRelatedItem(
      (flow.responseDataObject as any)?.dataObject,
    );

    const dataObjects = this.uniqueById([
      ...(requestDataObject ? [requestDataObject] : []),
      ...(responseDataObject ? [responseDataObject] : []),
    ]);

    return {
      id: String(flow.id),
      code: String(flow.code ?? ''),
      name: String(flow.name ?? ''),
      description: flow.description ?? null,
      layer: LayerKind.APPLICATION,
      flowType: 'application' as const,
      environment: null,
      source: {
        component: this.mapRelatedItem(flow.sourceComponent),
        function: this.mapRelatedItem((flow.sourceFunction as any)?.function),
      },
      target: {
        component: this.mapRelatedItem(flow.targetComponent),
        function: this.mapRelatedItem((flow.targetFunction as any)?.function),
      },
      requestDataObject,
      responseDataObject,
      dataObjects,
      proxyComponents: (proxyMaps as ApplicationFlowProxyComponentsMap[]).map(
        (item): FlowProxyComponentDto => ({
          order: Number((item as any).order ?? 0),
          component: this.mapRelatedItem((item as any).component) as RelatedItemDto,
        }),
      ),
      motivations: (motivationMaps as FlowMotivationItemMap[])
        .map((item) => this.mapRelatedItem((item as any).assessment))
        .filter(Boolean) as RelatedItemDto[],
      solutions: (solutionMaps as SolutionFlowMap[])
        .map((item): FlowSolutionDto | null => {
          const solution = this.mapRelatedItem((item as any).solution);
          if (!solution) return null;
          return {
            ...solution,
            label: (item as any).label ?? null,
          };
        })
        .filter(Boolean) as FlowSolutionDto[],
      createdAt: this.getDateValue(flow, 'createdAt'),
      createdBy: this.getUserValue(flow, 'createdBy'),
      updatedAt: this.getDateValue(flow, 'updatedAt'),
      updatedBy: this.getUserValue(flow, 'updatedBy'),
    };
  }

  private async buildTechnologyFlowDetail(flow: TechnologyFlow) {
    const [proxyMaps, motivationMaps, solutionMaps] = await Promise.all([
      this.technologyProxyRepo.find(this.flowMapWhere({ flow: flow.id as any }), {
        populate: ['node'] as any,
        orderBy: { order: QueryOrder.ASC } as any,
      } as any),
      this.flowMotivationRepo.find(this.flowMapWhere({ flow: flow.id as any }), {
        populate: ['assessment'] as any,
      } as any),
      this.solutionFlowRepo.find(this.flowMapWhere({ flow: flow.id as any }), {
        populate: ['solution'] as any,
      } as any),
    ]);

    return {
      id: String(flow.id),
      code: String(flow.code ?? ''),
      name: String(flow.name ?? ''),
      description: flow.description ?? null,
      layer: LayerKind.TECHNOLOGY,
      flowType: 'technology' as const,
      environment: flow.environment ?? null,
      source: {
        node: this.mapRelatedItem(flow.sourceNode),
        port: this.mapPort(flow.sourcePort),
      },
      target: {
        node: this.mapRelatedItem(flow.targetNode),
        port: this.mapPort(flow.targetPort),
      },
      proxyNodes: (proxyMaps as TechnologyFlowProxyNodesMap[]).map(
        (item): FlowProxyNodeDto => ({
          order: Number((item as any).order ?? 0),
          node: this.mapRelatedItem((item as any).node) as RelatedItemDto,
        }),
      ),
      motivations: (motivationMaps as FlowMotivationItemMap[])
        .map((item) => this.mapRelatedItem((item as any).assessment))
        .filter(Boolean) as RelatedItemDto[],
      solutions: (solutionMaps as SolutionFlowMap[])
        .map((item): FlowSolutionDto | null => {
          const solution = this.mapRelatedItem((item as any).solution);
          if (!solution) return null;
          return {
            ...solution,
            label: (item as any).label ?? null,
          };
        })
        .filter(Boolean) as FlowSolutionDto[],
      createdAt: this.getDateValue(flow, 'createdAt'),
      createdBy: this.getUserValue(flow, 'createdBy'),
      updatedAt: this.getDateValue(flow, 'updatedAt'),
      updatedBy: this.getUserValue(flow, 'updatedBy'),
    };
  }

  private async patchApplicationFlow(
    em: EntityManager,
    flow: ApplicationFlow,
    dto: UpdateDtoFlow,
    context: ArchpadRequestContext,
  ): Promise<void> {
    this.assertApplicationFlowPatch(dto);

    if (dto.code !== undefined) flow.code = dto.code;
    if (dto.name !== undefined) flow.name = dto.name;
    if (dto.description !== undefined) {
      flow.description = dto.description ?? undefined;
    }

    const currentSourceComponentId = this.extractId(flow.sourceComponent);
    const currentTargetComponentId = this.extractId(flow.targetComponent);

    if (dto.sourceComponentId !== undefined) {
      flow.sourceComponent = em.getReference(
        ApplicationComponent,
        dto.sourceComponentId,
      );
    }
    if (dto.targetComponentId !== undefined) {
      flow.targetComponent = em.getReference(
        ApplicationComponent,
        dto.targetComponentId,
      );
    }

    const sourceComponentId = dto.sourceComponentId ?? currentSourceComponentId;
    const targetComponentId = dto.targetComponentId ?? currentTargetComponentId;
    if (!sourceComponentId || !targetComponentId) {
      throw new BadRequestException('Flow must have source and target component');
    }

    if (dto.sourceFunctionId !== undefined) {
      flow.sourceFunction = dto.sourceFunctionId
        ? await this.requireComponentFunctionMap(
            em,
            sourceComponentId,
            dto.sourceFunctionId,
          )
        : (undefined as any);
    } else if (dto.sourceComponentId !== undefined) {
      flow.sourceFunction = undefined as any;
    }

    if (dto.targetFunctionId !== undefined) {
      flow.targetFunction = dto.targetFunctionId
        ? await this.requireComponentFunctionMap(
            em,
            targetComponentId,
            dto.targetFunctionId,
          )
        : (undefined as any);
    } else if (dto.targetComponentId !== undefined) {
      flow.targetFunction = undefined as any;
    }

    if (dto.requestDataObjectId !== undefined) {
      flow.requestDataObject = dto.requestDataObjectId
        ? await this.requireComponentDataObjectMap(
            em,
            sourceComponentId,
            dto.requestDataObjectId,
          )
        : (undefined as any);
    } else if (dto.sourceComponentId !== undefined) {
      flow.requestDataObject = undefined as any;
    }

    if (dto.responseDataObjectId !== undefined) {
      flow.responseDataObject = dto.responseDataObjectId
        ? await this.requireComponentDataObjectMap(
            em,
            sourceComponentId,
            dto.responseDataObjectId,
          )
        : (undefined as any);
    } else if (dto.sourceComponentId !== undefined) {
      flow.responseDataObject = undefined as any;
    }

    flow.updated = {
      at: new Date(),
      by: context.userId,
    } as ActionStamp;

    if (dto.proxyComponentIds !== undefined) {
      await this.syncApplicationProxyComponents(em, flow.id, dto.proxyComponentIds);
    }
    if (dto.motivationIds !== undefined) {
      await this.syncFlowMotivations(
        em,
        flow.id,
        dto.motivationIds,
        LayerKind.APPLICATION,
      );
    }
    if (dto.solutionIds !== undefined) {
      await this.syncFlowSolutions(
        em,
        flow.id,
        dto.solutionIds,
        LayerKind.APPLICATION,
      );
    }

    await em.flush();
  }

  private async patchTechnologyFlow(
    em: EntityManager,
    flow: TechnologyFlow,
    dto: UpdateDtoFlow,
    context: ArchpadRequestContext,
  ): Promise<void> {
    this.assertTechnologyFlowPatch(dto);

    if (dto.code !== undefined) flow.code = dto.code;
    if (dto.name !== undefined) flow.name = dto.name;
    if (dto.description !== undefined) {
      flow.description = dto.description ?? undefined;
    }

    if (dto.environment !== undefined) {
      flow.environment = dto.environment;
    }
    if (dto.sourceNodeId !== undefined) {
      flow.sourceNode = em.getReference(TechnologyNode, dto.sourceNodeId);
    }
    if (dto.sourcePortId !== undefined) {
      flow.sourcePort = em.getReference(TechnologyInterface, dto.sourcePortId);
    }
    if (dto.targetNodeId !== undefined) {
      flow.targetNode = em.getReference(TechnologyNode, dto.targetNodeId);
    }
    if (dto.targetPortId !== undefined) {
      flow.targetPort = em.getReference(TechnologyInterface, dto.targetPortId);
    }

    flow.updated = {
      at: new Date(),
      by: context.userId,
    } as ActionStamp;

    if (dto.proxyNodeIds !== undefined) {
      await this.syncTechnologyProxyNodes(em, flow.id, dto.proxyNodeIds);
    }
    if (dto.motivationIds !== undefined) {
      await this.syncFlowMotivations(
        em,
        flow.id,
        dto.motivationIds,
        LayerKind.TECHNOLOGY,
      );
    }
    if (dto.solutionIds !== undefined) {
      await this.syncFlowSolutions(
        em,
        flow.id,
        dto.solutionIds,
        LayerKind.TECHNOLOGY,
      );
    }

    await em.flush();
  }

  private async syncApplicationProxyComponents(
    em: EntityManager,
    flowId: string,
    componentIds: string[],
  ) {
    const normalizedIds = this.normalizeIdList(componentIds);
    const existing = await this.applicationProxyRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { populate: ['component'] as any } as any,
    );

    const existingByComponentId = new Map<string, ApplicationFlowProxyComponentsMap>();
    for (const item of existing as ApplicationFlowProxyComponentsMap[]) {
      const key = this.extractId((item as any).component);
      if (key) {
        existingByComponentId.set(key, item);
      }
    }

    for (const [index, componentId] of normalizedIds.entries()) {
      const existingMap = existingByComponentId.get(componentId);
      if (existingMap) {
        existingMap.order = index;
        em.persist(existingMap);
        continue;
      }

      const map = this.applicationProxyRepo.create({
        flow: em.getReference(ApplicationFlow, flowId),
        component: em.getReference(ApplicationComponent, componentId),
        order: index,
      } as any);
      em.persist(map);
    }

    for (const item of existing as ApplicationFlowProxyComponentsMap[]) {
      const key = this.extractId((item as any).component);
      if (!key || normalizedIds.includes(key)) continue;
      em.remove(item);
    }
  }

  private async syncTechnologyProxyNodes(
    em: EntityManager,
    flowId: string,
    nodeIds: string[],
  ) {
    const normalizedIds = this.normalizeIdList(nodeIds);
    const existing = await this.technologyProxyRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { populate: ['node'] as any } as any,
    );

    const existingByNodeId = new Map<string, TechnologyFlowProxyNodesMap>();
    for (const item of existing as TechnologyFlowProxyNodesMap[]) {
      const key = this.extractId((item as any).node);
      if (key) {
        existingByNodeId.set(key, item);
      }
    }

    for (const [index, nodeId] of normalizedIds.entries()) {
      const existingMap = existingByNodeId.get(nodeId);
      if (existingMap) {
        existingMap.order = index;
        em.persist(existingMap);
        continue;
      }

      const map = this.technologyProxyRepo.create({
        flow: em.getReference(TechnologyFlow, flowId),
        node: em.getReference(TechnologyNode, nodeId),
        order: index,
      } as any);
      em.persist(map);
    }

    for (const item of existing as TechnologyFlowProxyNodesMap[]) {
      const key = this.extractId((item as any).node);
      if (!key || normalizedIds.includes(key)) continue;
      em.remove(item);
    }
  }

  private async syncFlowMotivations(
    em: EntityManager,
    flowId: string,
    motivationIds: string[],
    flowLayer: LayerKind,
  ) {
    const normalizedIds = this.normalizeIdList(motivationIds);
    const existing = await this.flowMotivationRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { populate: ['assessment'] as any } as any,
    );

    const existingByMotivationId = new Map<string, FlowMotivationItemMap>();
    for (const item of existing as FlowMotivationItemMap[]) {
      const key = this.extractId((item as any).assessment);
      if (key) {
        existingByMotivationId.set(key, item);
      }
    }

    for (const motivationId of normalizedIds) {
      if (existingByMotivationId.has(motivationId)) continue;
      const map = this.flowMotivationRepo.create({
        flow: em.getReference(
          flowLayer === LayerKind.TECHNOLOGY
            ? TechnologyFlow
            : ApplicationFlow,
          flowId,
        ),
        assessment: em.getReference(MotivationElementGeneric, motivationId),
      } as any);
      em.persist(map);
    }

    for (const item of existing as FlowMotivationItemMap[]) {
      const key = this.extractId((item as any).assessment);
      if (!key || normalizedIds.includes(key)) continue;
      em.remove(item);
    }
  }

  private async syncFlowSolutions(
    em: EntityManager,
    flowId: string,
    solutionIds: string[],
    flowLayer: LayerKind,
  ) {
    const normalizedIds = this.normalizeIdList(solutionIds);
    const existing = await this.solutionFlowRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { populate: ['solution'] as any } as any,
    );

    const existingBySolutionId = new Map<string, SolutionFlowMap>();
    for (const item of existing as SolutionFlowMap[]) {
      const key = this.extractId((item as any).solution);
      if (key) {
        existingBySolutionId.set(key, item);
      }
    }

    for (const solutionId of normalizedIds) {
      if (existingBySolutionId.has(solutionId)) continue;
      const map = this.solutionFlowRepo.create({
        flow: em.getReference(
          flowLayer === LayerKind.TECHNOLOGY
            ? TechnologyFlow
            : ApplicationFlow,
          flowId,
        ),
        solution: em.getReference(Solution, solutionId),
      } as any);
      em.persist(map);
    }

    for (const item of existing as SolutionFlowMap[]) {
      const key = this.extractId((item as any).solution);
      if (!key || normalizedIds.includes(key)) continue;
      em.remove(item);
    }
  }

  private async reindexApplicationProxyComponents(
    em: EntityManager,
    flowId: string,
  ): Promise<void> {
    const maps = await this.applicationProxyRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { orderBy: { order: QueryOrder.ASC } as any } as any,
    );
    maps.forEach((item, index) => {
      (item as any).order = index;
      em.persist(item);
    });
    await em.flush();
  }

  private async reindexTechnologyProxyNodes(
    em: EntityManager,
    flowId: string,
  ): Promise<void> {
    const maps = await this.technologyProxyRepo.find(
      this.flowMapWhere({ flow: flowId as any }),
      { orderBy: { order: QueryOrder.ASC } as any } as any,
    );
    maps.forEach((item, index) => {
      (item as any).order = index;
      em.persist(item);
    });
    await em.flush();
  }

  private async requireComponentFunctionMap(
    em: EntityManager,
    componentId: string,
    functionId: string,
  ): Promise<ApplicationComponentFunctionMap> {
    const map = await em.findOne(ApplicationComponentFunctionMap, {
      component: componentId as any,
      function: functionId as any,
    } as any);
    if (!map) {
      throw new BadRequestException(
        `Function ${functionId} is not linked with component ${componentId}`,
      );
    }
    return map;
  }

  private async requireComponentDataObjectMap(
    em: EntityManager,
    componentId: string,
    dataObjectId: string,
  ): Promise<ApplicationComponentDataObjectMap> {
    const map = await em.findOne(ApplicationComponentDataObjectMap, {
      component: componentId as any,
      dataObject: dataObjectId as any,
    } as any);
    if (!map) {
      throw new BadRequestException(
        `Data object ${dataObjectId} is not linked with component ${componentId}`,
      );
    }
    return map;
  }

  private async deleteFlowMappings(em: EntityManager, flowId: string) {
    await em.nativeDelete(ApplicationFlowProxyComponentsMap, {
      flow: flowId as any,
    } as any);
    await em.nativeDelete(TechnologyFlowProxyNodesMap, {
      flow: flowId as any,
    } as any);
    await em.nativeDelete(FlowMotivationItemMap, { flow: flowId as any } as any);
    await em.nativeDelete(SolutionFlowMap, { flow: flowId as any } as any);
  }

  private parseLayer(layerRaw?: string): LayerKind | null {
    if (!layerRaw) return LayerKind.APPLICATION;
    const value = layerRaw.trim().toLowerCase();
    if (value === 'application') return LayerKind.APPLICATION;
    if (value === 'technology') return LayerKind.TECHNOLOGY;
    return null;
  }

  private flowWhere(id: string): Record<string, unknown> {
    const tenantId = this.getTenantId();
    return tenantId ? { id, tenantId } : { id };
  }

  private flowMapWhere(base: Record<string, unknown>): Record<string, unknown> {
    const tenantId = this.getTenantId();
    return tenantId ? { ...base, tenantId } : base;
  }

  private getTenantId(): string | undefined {
    const ctx = getArchpadRequestContext();
    return ctx?.tenantIds?.[0];
  }

  private extractId(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object' && value.id) return String(value.id);
    return null;
  }

  private mapRelatedItem(value: any): RelatedItemDto | null {
    if (!value) return null;
    const id = this.extractId(value);
    if (!id) return null;
    return {
      id,
      code: String(value.code ?? ''),
      name: String(value.name ?? ''),
      description: value.description ?? null,
    };
  }

  private mapPort(value: any): FlowPortDto | null {
    const related = this.mapRelatedItem(value);
    if (!related) return null;
    return {
      ...related,
      protocol: (value?.protocol as any)?.name ?? null,
    };
  }

  private uniqueById<T extends { id: string }>(items: T[]): T[] {
    const result: T[] = [];
    const seen = new Set<string>();
    for (const item of items) {
      if (!item?.id) continue;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      result.push(item);
    }
    return result;
  }

  private normalizeIdList(ids: string[] | null | undefined): string[] {
    if (!ids || ids.length === 0) return [];
    const result: string[] = [];
    const seen = new Set<string>();
    for (const id of ids) {
      const normalized = String(id);
      if (!normalized) continue;
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      result.push(normalized);
    }
    return result;
  }

  private getDateValue(entity: any, field: 'createdAt' | 'updatedAt'): string | null {
    const direct = entity?.[field];
    if (direct) {
      return new Date(direct).toISOString();
    }

    const embedded = field === 'createdAt' ? entity?.created?.at : entity?.updated?.at;
    return embedded ? new Date(embedded).toISOString() : null;
  }

  private getUserValue(entity: any, field: 'createdBy' | 'updatedBy'): string | null {
    const direct = entity?.[field];
    if (direct) return String(direct);
    const embedded = field === 'createdBy' ? entity?.created?.by : entity?.updated?.by;
    return embedded ? String(embedded) : null;
  }

  private async findApplicationFlowForWrite(
    em: EntityManager,
    id: string,
  ): Promise<ApplicationFlow | null> {
    return em.findOne(ApplicationFlow, this.flowWhere(id) as any);
  }

  private async findTechnologyFlowForWrite(
    em: EntityManager,
    id: string,
  ): Promise<TechnologyFlow | null> {
    return em.findOne(TechnologyFlow, this.flowWhere(id) as any);
  }

  private assertApplicationFlowPatch(dto: UpdateDtoFlow) {
    if (
      dto.environment !== undefined ||
      dto.sourceNodeId !== undefined ||
      dto.sourcePortId !== undefined ||
      dto.targetNodeId !== undefined ||
      dto.targetPortId !== undefined ||
      dto.proxyNodeIds !== undefined
    ) {
      throw new BadRequestException(
        'Technology-only fields cannot be used for application flow update',
      );
    }
  }

  private assertTechnologyFlowPatch(dto: UpdateDtoFlow) {
    if (
      dto.sourceComponentId !== undefined ||
      dto.sourceFunctionId !== undefined ||
      dto.targetComponentId !== undefined ||
      dto.targetFunctionId !== undefined ||
      dto.requestDataObjectId !== undefined ||
      dto.responseDataObjectId !== undefined ||
      dto.proxyComponentIds !== undefined
    ) {
      throw new BadRequestException(
        'Application-only fields cannot be used for technology flow update',
      );
    }
  }
}
