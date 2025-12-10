import { EntityManager, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseObject } from '@archpad/models';
import { LoggerService } from '@archpad/logger';

@Injectable()
export class AuditSubscriber implements EventSubscriber<BaseObject> {
  constructor(
    private readonly em: EntityManager,
    private readonly logger: LoggerService,
  ) {
    this.em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities() {
    return [BaseObject];
  }

  afterCreate(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;

    this.logger.log(
      {
        event: 'CREATE',
        entity: entity.constructor.name,
        id: entity.id ?? null,
        createdAt: entity.created?.timestamp ?? null,
        createdBy: entity.created?.by ?? null,
      },
      'AuditSubscriber',
    );
  }

  afterUpdate(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;
    const changeSet = args.changeSet;

    this.logger.log(
      {
        event: 'UPDATE',
        entity: entity.constructor.name,
        id: entity.id ?? null,
        updatedAt: entity.updated?.timestamp ?? null,
        updatedBy: entity.updated?.by ?? null,
        // Можно логировать diff; у changeSet есть originalEntity и payload
        changes: changeSet
          ? {
              payload: changeSet.payload,
            }
          : undefined,
      },
      'AuditSubscriber',
    );
  }

  afterDelete(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;

    this.logger.log(
      {
        event: 'DELETE',
        entity: entity.constructor.name,
        id: entity.id ?? null,
        deletedAt: entity.deleted?.timestamp ?? null,
        deletedBy: entity.deleted?.by ?? null,
      },
      'AuditSubscriber',
    );
  }
}
