import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import type { EntityName, EntityData } from '@mikro-orm/core';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DirectoryLinkDto } from '@/model/dto/directory-link.dto';
import { BulkDirectoryLinkDto } from '@/model/dto/directory-link-bulk.dto';
import { DirectoryItemsMap } from '@/model/maps/directory-items.map';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LoggerService } from '@archpad/logger';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { ActionStamp } from '@archpad/models';

export class BaseDirectoryService<
  Entity extends DirectoryObject,
  CreateDto extends object = any,
  UpdateDto extends object = CreateDto,
> {
  private readonly loggerContext = BaseDirectoryService.name;

  constructor(
    protected readonly repo: EntityRepository<Entity>,

    @InjectRepository(DirectoryItemsMap)
    protected readonly mapRepo: EntityRepository<DirectoryItemsMap>,

    protected readonly entityName: EntityName<Entity>,
    private readonly logger: LoggerService,
  ) {}

  findAll(): Promise<Entity[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Entity> {
    const entity = await this.repo.findOne({ id } as any);
    if (!entity) {
      const name = (this.entityName as any).name ?? 'Entity';
      throw new NotFoundException(`${name} with id=${id} not found`);
    }
    return entity;
  }

  async create(
    dto: CreateDto,
    context: ArchpadRequestContext,
  ): Promise<Entity> {
    try {
      const entity = this.repo.create({
        ...(dto as any),
        created: {
          by: context.userId,
        },
      });
      await this.repo.getEntityManager().persistAndFlush(entity);
      return entity;
    } catch (error) {
      this.logger.error('Error in create()', error as any, this.loggerContext);
      throw error;
    }
  }

  async bulkCreate(
    dtos: CreateDto[],
    context: ArchpadRequestContext,
  ): Promise<Entity[]> {
    try {
      const entities = dtos.map((dto) =>
        this.repo.create({
          ...(dto as any),
          created: {
            by: context.userId,
          },
        }),
      );
      await this.repo.getEntityManager().persistAndFlush(entities);
      return entities;
    } catch (error) {
      this.logger.error('Error in bulkCreate()', error as any, this.loggerContext);
      throw error;
    }
  }

  /**
   * Idempotent bulk upsert (by `code`):
   * - if dto has `code` and entity with same code exists -> update fields
   * - otherwise create new entity
   *
   * Returns entities in the same order as input dtos (each dto resolves to one entity).
   */
  async bulkUpsert(
    dtos: CreateDto[],
    context: ArchpadRequestContext,
  ): Promise<Entity[]> {
    if (!dtos.length) return [];

    const codes = Array.from(
      new Set(
        dtos
          .map((d: any) =>
            typeof d?.code === 'string' ? String(d.code).trim() : '',
          )
          .filter(Boolean),
      ),
    );

    const existing = codes.length
      ? await this.repo.find({ code: { $in: codes } } as any)
      : [];
    const byCode = new Map(existing.map((e: any) => [String(e.code).trim(), e]));

    const createdEntities: Entity[] = [];
    const resolved: Entity[] = [];

    for (const dto of dtos) {
      const anyDto: any = dto as any;
      const code =
        typeof anyDto?.code === 'string' ? String(anyDto.code).trim() : '';

      // drop undefined values to avoid wiping existing fields accidentally
      const payload: Record<string, any> = {};
      for (const [k, v] of Object.entries(anyDto)) {
        if (v !== undefined) payload[k] = v;
      }

      if (code) {
        const existingEntity = byCode.get(code);
        if (existingEntity) {
          this.repo.assign(existingEntity, {
            ...(payload as any),
            updated: {
              by: context.userId,
            },
          } as any);
          resolved.push(existingEntity);
          continue;
        }

        const entity = this.repo.create({
          ...(payload as any),
          created: {
            by: context.userId,
          },
        } as any);
        createdEntities.push(entity);
        byCode.set(code, entity as any);
        resolved.push(entity);
        continue;
      }

      // no code -> always create
      const entity = this.repo.create({
        ...(payload as any),
        created: {
          by: context.userId,
        },
      } as any);
      createdEntities.push(entity);
      resolved.push(entity);
    }

    await this.repo.getEntityManager().persistAndFlush(createdEntities);
    // flush updates on existing entities too (they are managed)
    await this.repo.getEntityManager().flush();

    return resolved;
  }

  async update(
    id: string,
    dto: UpdateDto,
    context: ArchpadRequestContext,
  ): Promise<Entity> {
    try {
      const entity = await this.findOne(id);
      this.repo.assign(entity, {
        ...(dto as any),
        updated: {
          by: context.userId,
        },
      });
      await this.repo.getEntityManager().flush();
      return entity;
    } catch (error) {
      this.logger.error('Error in update()', error as any, this.loggerContext);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.getEntityManager().removeAndFlush(entity);
  }

  async addLink(
    sourceId: string,
    dto: DirectoryLinkDto,
    context: ArchpadRequestContext,
  ): Promise<DirectoryItemsMap> {
    const source = await this.repo.findOneOrFail({
      id: sourceId,
    } as FilterQuery<Entity>);
    const target = await this.repo.findOneOrFail({
      id: dto.targetId,
    } as FilterQuery<Entity>);

    const existing = await this.mapRepo.findOne({ source, target });
    if (existing) throw new ConflictException('Связь уже существует');

    const link = new DirectoryItemsMap();
    link.source = source;
    link.target = target;
    link.type = dto.type;
    link.created = ActionStamp.now(context.userId);

    await this.mapRepo.getEntityManager().persistAndFlush(link);
    return link;
  }

  async deleteLink(sourceId: string, targetId: string): Promise<void> {
    const link = await this.mapRepo.findOneOrFail({
      source: { id: sourceId },
      target: { id: targetId },
    });
    await this.mapRepo.getEntityManager().removeAndFlush(link);
  }

  async bulkAddLinks(
    dtos: BulkDirectoryLinkDto[],
    context: ArchpadRequestContext,
  ): Promise<DirectoryItemsMap[]> {
    if (!dtos.length) return [];

    const ids = Array.from(
      new Set(dtos.flatMap((d) => [d.sourceId, d.targetId])),
    ).filter(Boolean) as string[];

    const codes = Array.from(
      new Set(dtos.flatMap((d: any) => [d.sourceCode, d.targetCode])),
    ).filter(Boolean) as string[];

    // Load all referenced entities in one go.
    const entitiesById = ids.length ? await this.repo.find({ id: { $in: ids } } as any) : [];
    const entitiesByCode = codes.length ? await this.repo.find({ code: { $in: codes } } as any) : [];
    const entities = [...entitiesById, ...entitiesByCode];
    const byId = new Map(entities.map((e: any) => [e.id, e]));
    const byCode = new Map(entities.map((e: any) => [e.code, e]));

    const name = (this.entityName as any).name ?? 'Entity';
    for (const id of ids) {
      if (!byId.has(id)) throw new NotFoundException(`${name} with id=${id} not found`);
    }
    for (const code of codes) {
      if (!byCode.has(code)) throw new NotFoundException(`${name} with code=${code} not found`);
    }

    const pairs = dtos.map((dto) => {
      const anyDto: any = dto as any;
      const source =
        (dto.sourceId ? byId.get(dto.sourceId) : undefined) ??
        (anyDto.sourceCode ? byCode.get(anyDto.sourceCode) : undefined);
      const target =
        (dto.targetId ? byId.get(dto.targetId) : undefined) ??
        (anyDto.targetCode ? byCode.get(anyDto.targetCode) : undefined);

      if (!source) {
        throw new NotFoundException(
          dto.sourceId ? `${name} with id=${dto.sourceId} not found` : `${name} with code=${anyDto.sourceCode} not found`,
        );
      }
      if (!target) {
        throw new NotFoundException(
          dto.targetId ? `${name} with id=${dto.targetId} not found` : `${name} with code=${anyDto.targetCode} not found`,
        );
      }

      return {
        sourceId: (source as any).id as string,
        targetId: (target as any).id as string,
        type: dto.type as any,
      };
    });

    // Idempotent bulk insert (ignore duplicates by unique constraint on (source_id,target_id))
    const em: any = this.mapRepo.getEntityManager() as any;
    const knex = em.getKnex();
    const inserted: any[] = [];
    const createdBy = context?.userId ?? null;

    const chunkSize = 500;
    for (let i = 0; i < pairs.length; i += chunkSize) {
      const chunk = pairs.slice(i, i + chunkSize);

      const rows = await knex("map_directory_items")
        .insert(
          chunk.map((p) => ({
            source_id: p.sourceId,
            target_id: p.targetId,
            type: p.type,
            // `DirectoryItemsMap` extends `BaseObject` and has `created_at` NOT NULL,
            // but `onCreate` hooks don't run for raw knex inserts.
            created_at: knex.fn.now(),
            created_by: createdBy,
          }))
        )
        .onConflict(["source_id", "target_id"])
        .ignore()
        .returning([
          knex.raw('source_id as "sourceId"'),
          knex.raw('target_id as "targetId"'),
          "type",
        ]);

      // Return value is used only for client feedback; keep it lightweight
      inserted.push(...(rows as any));
    }

    return inserted as any;
  }
}
