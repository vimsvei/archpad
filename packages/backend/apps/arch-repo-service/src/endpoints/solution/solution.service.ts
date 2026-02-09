import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Solution } from '@/model/solution/solution.entity';
import { SolutionApplicationComponentMap } from '@/model/maps/solution-application-component.map';
import { SolutionApplicationFunctionMap } from '@/model/maps/solution-application-function.map';
import { SolutionDataObjectMap } from '@/model/maps/solution-data-object.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionStakeholderMap } from '@/model/maps/solution-stakeholder.map';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { SolutionLifecycle } from '@/model/enums/solution-life-cycle.enum';
import { SolutionImplementationStatus } from '@/model/enums/solution-implementation-status.enum';
import { StakeholderRole } from '@/model/enums/stakeholder-role.enum';
import type {
  CreateDtoSolution,
  UpdateDtoSolution,
} from '@/model/dto/solution.dto';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';

export type SolutionListQuery = {
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
export class SolutionService {
  constructor(
    @InjectRepository(Solution)
    private readonly repo: EntityRepository<Solution>,
    @InjectRepository(SolutionApplicationComponentMap)
    private readonly componentMapRepo: EntityRepository<SolutionApplicationComponentMap>,
    @InjectRepository(SolutionApplicationFunctionMap)
    private readonly functionMapRepo: EntityRepository<SolutionApplicationFunctionMap>,
    @InjectRepository(SolutionDataObjectMap)
    private readonly dataObjectMapRepo: EntityRepository<SolutionDataObjectMap>,
    @InjectRepository(SolutionFlowMap)
    private readonly flowMapRepo: EntityRepository<SolutionFlowMap>,
    @InjectRepository(SolutionMotivationElementMap)
    private readonly motivationMapRepo: EntityRepository<SolutionMotivationElementMap>,
    @InjectRepository(SolutionStakeholderMap)
    private readonly stakeholderMapRepo: EntityRepository<SolutionStakeholderMap>,
  ) {}

  async findAll(query: SolutionListQuery): Promise<PaginatedResult<Solution>> {
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
    const where: FilterQuery<Solution> = {
      ...(tenantId ? { tenantId } : {}),
      ...(search ? { name: { $ilike: `%${search}%` } } : {}),
    } as FilterQuery<Solution>;

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
    const where: FilterQuery<Solution> = tenantId
      ? ({ id, tenantId } as FilterQuery<Solution>)
      : ({ id } as FilterQuery<Solution>);
    return this.repo.findOneOrFail(where);
  }

  async create(
    dto: CreateDtoSolution,
    context: ArchpadRequestContext,
  ): Promise<Solution> {
    const em = this.repo.getEntityManager();

    // Get tenantId from context (first tenantId from the list, or use default)
    const ctx = getArchpadRequestContext();
    const tenantId =
      ctx?.tenantIds?.[0] ||
      context.tenantIds?.[0] ||
      '102153b6-28d4-40c2-ac27-11e419b639e0';

    const dtoData = dto as any;
    const entity = this.repo.create({
      code: dtoData.code,
      name: dtoData.name,
      description: dtoData.description,
      context: dtoData.context || '',
      decision: dtoData.decision || '',
      consequences: dtoData.consequences || '',
      alternatives: dtoData.alternatives || '',
      decisionStatus: dtoData.decisionStatus
        ? (dtoData.decisionStatus as SolutionLifecycle)
        : SolutionLifecycle.PROPOSED,
      ImplementationStatus: dtoData.implementationStatus
        ? (dtoData.implementationStatus as SolutionImplementationStatus)
        : SolutionImplementationStatus.NOT_STARTED,
      tenantId,
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
    dto: UpdateDtoSolution,
    context: ArchpadRequestContext,
  ): Promise<Solution> {
    const em = this.repo.getEntityManager();

    // Start transaction
    await em.transactional(async (trxEm) => {
      const entity = await trxEm.findOneOrFail(Solution, {
        id,
      } as FilterQuery<Solution>);

      // Update basic fields
      const dtoData = dto as any;
      const patch: Partial<Solution> = {
        ...(dtoData.code !== undefined ? { code: dtoData.code } : {}),
        ...(dtoData.name !== undefined ? { name: dtoData.name } : {}),
        ...(dtoData.description !== undefined
          ? { description: dtoData.description }
          : {}),
        ...(dtoData.context !== undefined ? { context: dtoData.context } : {}),
        ...(dtoData.decision !== undefined
          ? { decision: dtoData.decision }
          : {}),
        ...(dtoData.consequences !== undefined
          ? { consequences: dtoData.consequences }
          : {}),
        ...(dtoData.alternatives !== undefined
          ? { alternatives: dtoData.alternatives }
          : {}),
        ...(dtoData.decisionStatus !== undefined
          ? { decisionStatus: dtoData.decisionStatus as SolutionLifecycle }
          : {}),
        ...(dtoData.implementationStatus !== undefined
          ? {
              ImplementationStatus:
                dtoData.implementationStatus as SolutionImplementationStatus,
            }
          : {}),
        updated: {
          at: new Date(),
          by: context.userId,
        },
      };

      trxEm.assign(entity, patch as any);

      // Update components - always replace all existing with provided ones
      const existingComponentMaps = await trxEm.find(
        SolutionApplicationComponentMap,
        {
          solution: id as any,
        } as any,
      );
      await trxEm.remove(existingComponentMaps);

      if (dtoData.componentIds && dtoData.componentIds.length > 0) {
        for (const componentId of dtoData.componentIds) {
          const map = trxEm.create(SolutionApplicationComponentMap, {
            solution: trxEm.getReference(Solution, id),
            component: trxEm.getReference(ApplicationComponent, componentId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update functions - always replace all existing with provided ones
      const existingFunctionMaps = await trxEm.find(
        SolutionApplicationFunctionMap,
        {
          solution: id as any,
        } as any,
      );
      await trxEm.remove(existingFunctionMaps);

      if (dtoData.functionIds && dtoData.functionIds.length > 0) {
        for (const functionId of dtoData.functionIds) {
          const map = trxEm.create(SolutionApplicationFunctionMap, {
            solution: trxEm.getReference(Solution, id),
            function: trxEm.getReference(ApplicationFunction, functionId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update data objects - always replace all existing with provided ones
      const existingDataObjectMaps = await trxEm.find(SolutionDataObjectMap, {
        solution: id as any,
      } as any);
      await trxEm.remove(existingDataObjectMaps);

      if (dtoData.dataObjectIds && dtoData.dataObjectIds.length > 0) {
        for (const dataObjectId of dtoData.dataObjectIds) {
          const map = trxEm.create(SolutionDataObjectMap, {
            solution: trxEm.getReference(Solution, id),
            dataObject: trxEm.getReference(DataObject, dataObjectId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update flows - always replace all existing with provided ones
      const existingFlowMaps = await trxEm.find(SolutionFlowMap, {
        solution: id as any,
      } as any);
      await trxEm.remove(existingFlowMaps);

      if (dtoData.flowIds && dtoData.flowIds.length > 0) {
        for (const flowId of dtoData.flowIds) {
          const map = trxEm.create(SolutionFlowMap, {
            solution: trxEm.getReference(Solution, id),
            flow: trxEm.getReference(ApplicationFlow, flowId),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update motivations - always replace all existing with provided ones
      const existingMotivationMaps = await trxEm.find(
        SolutionMotivationElementMap,
        {
          solution: id as any,
        } as any,
      );
      await trxEm.remove(existingMotivationMaps);

      if (dtoData.motivationIds && dtoData.motivationIds.length > 0) {
        for (const motivationId of dtoData.motivationIds) {
          const map = trxEm.create(SolutionMotivationElementMap, {
            solution: trxEm.getReference(Solution, id),
            motivation: trxEm.getReference(
              MotivationElementGeneric,
              motivationId,
            ),
          } as any);
          await trxEm.persist(map);
        }
      }

      // Update stakeholders - always replace all existing with provided ones
      const existingStakeholderMaps = await trxEm.find(SolutionStakeholderMap, {
        solution: id as any,
      } as any);
      await trxEm.remove(existingStakeholderMaps);

      if (dtoData.stakeholderIds && dtoData.stakeholderIds.length > 0) {
        for (const stakeholderItem of dtoData.stakeholderIds) {
          const map = trxEm.create(SolutionStakeholderMap, {
            solution: trxEm.getReference(Solution, id),
            stakeholder: trxEm.getReference(
              Stakeholder,
              stakeholderItem.stakeholderId,
            ),
            role: stakeholderItem.roleId as StakeholderRole,
          } as any);
          await trxEm.persist(map);
        }
      }

      await trxEm.flush();
    });

    return this.findOne(id);
  }
}
