import { EntityManager, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ActionStamp, BaseObject } from '@archpad/models';
import { LoggerService } from '@archpad/logger';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';

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

  beforeCreate(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;
    const ctx = getArchpadRequestContext();
    const by = ctx?.userId?.trim();
    // Ensure created stamp always exists (even for internal calls without request context),
    // and attach actor only when we have it.
    if (!entity.created) {
      entity.created = ActionStamp.now(by ?? null);
      return;
    }

    if (by && !entity.created.by) {
      entity.created = ActionStamp.now(by);
    }
  }

  beforeUpdate(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;
    const ctx = getArchpadRequestContext();
    const by = ctx?.userId?.trim();
    if (!by) return;

    entity.updated = ActionStamp.now(by);
  }

  beforeDelete(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;
    const ctx = getArchpadRequestContext();
    const by = ctx?.userId?.trim();
    if (!by) return;

    entity.deleted = ActionStamp.now(by);
  }

  afterCreate(args: EventArgs<BaseObject>): void {
    const entity: any = args.entity;

    this.logger.log(
      {
        event: 'CREATE',
        entity: entity.constructor.name,
        id: entity.id ?? null,
        createdAt: entity.created?.at ?? null,
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
        updatedAt: entity.updated?.at ?? null,
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
        deletedAt: entity.deleted?.at ?? null,
        deletedBy: entity.deleted?.by ?? null,
      },
      'AuditSubscriber',
    );
  }
}
