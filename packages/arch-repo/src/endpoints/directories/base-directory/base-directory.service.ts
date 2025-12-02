import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import type { EntityName, EntityData } from '@mikro-orm/core';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DirectoryLinkDto } from '@/model/dto/directory-link.dto';
import { DirectoryItemsMap } from '@/model/entities/maps/directory-items.map';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';
import { InjectRepository } from '@mikro-orm/nestjs';

export class BaseDirectoryService<
  Entity extends DirectoryObject,
  CreateDto extends object = any,
  UpdateDto extends object = CreateDto,
> {
  constructor(
    protected readonly repo: EntityRepository<Entity>,

    @InjectRepository(DirectoryItemsMap)
    protected readonly mapRepo: EntityRepository<DirectoryItemsMap>,

    protected readonly entityName: EntityName<Entity>,
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

  async create(dto: CreateDto): Promise<Entity> {
    const entity = this.repo.create(dto as any);
    await this.repo.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UpdateDto): Promise<Entity> {
    const entity = await this.findOne(id);
    this.repo.assign(entity, dto as any);
    await this.repo.getEntityManager().flush();
    return entity;
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

  async updateLink(
    sourceId: string,
    targetId: string,
    dto: Pick<DirectoryLinkDto, 'type'>,
  ): Promise<DirectoryItemsMap> {
    const link = await this.mapRepo.findOneOrFail({
      source: { id: sourceId },
      target: { id: targetId },
    });
    link.type = dto.type;
    await this.mapRepo.getEntityManager().flush();
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
