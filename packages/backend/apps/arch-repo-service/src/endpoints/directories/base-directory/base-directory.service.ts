import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import type { EntityName, EntityData } from '@mikro-orm/core';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DirectoryLinkDto } from '@/model/dto/directory-link.dto';
import { DirectoryItemsMap } from '@/model/maps/directory-items.map';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LoggerService } from '@archpad/logger';
import { ArchpadRequestContext } from '@/request-context/archpad-request-context';

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
}
