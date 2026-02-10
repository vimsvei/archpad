import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { ActionStamp } from '@archpad/models';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { NodeTypeDirectory } from '@/model/directories/directories';
import { OperatingSystem } from '@/model/archimate/technology/operating-system.entity';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

/**
 * Provides default NodeTypeDirectory and OperatingSystem for creating
 * technology nodes (Device / Host) when not supplied by the client.
 * Used by API create endpoints and by Open Exchange import.
 */
@Injectable()
export class TechnologyNodeDefaultsService {
  async ensureNodeType(
    em: EntityManager,
    context: ArchpadRequestContext,
    options: { name: string; makeDefault: boolean },
  ): Promise<NodeTypeDirectory> {
    if (options.makeDefault) {
      const byDefault = await em.findOne(NodeTypeDirectory, {
        byDefault: true,
      } as any);
      if (byDefault) return byDefault;
    }

    const existing = await em.findOne(NodeTypeDirectory, {
      name: options.name,
    } as any);
    if (existing) return existing;

    const created = ActionStamp.now(context.userId);
    const entity = em.create(NodeTypeDirectory, {
      name: options.name,
      description: 'Auto-created for technology node',
      byDefault: options.makeDefault,
      created,
    } as any);
    await em.persistAndFlush(entity);
    return entity;
  }

  async ensureUnknownOperatingSystem(
    em: EntityManager,
    context: ArchpadRequestContext,
  ): Promise<OperatingSystem> {
    const name = 'Unknown OS';
    const existing = await em.findOne(OperatingSystem, { name } as any);
    if (existing) return existing;

    const created = ActionStamp.now(context.userId);
    const entity = em.create(OperatingSystem, {
      name,
      description: 'Auto-created for technology node',
      kind: SystemSoftwareKind.OS,
      created,
    } as any);
    await em.persistAndFlush(entity);
    return entity;
  }

  async getDefaultsForDevice(
    em: EntityManager,
    context: ArchpadRequestContext,
  ): Promise<{ type: NodeTypeDirectory; operatingSystem: OperatingSystem }> {
    const [type, operatingSystem] = await Promise.all([
      this.ensureNodeType(em, context, { name: 'Device', makeDefault: true }),
      this.ensureUnknownOperatingSystem(em, context),
    ]);
    return { type, operatingSystem };
  }

  async getDefaultsForHost(
    em: EntityManager,
    context: ArchpadRequestContext,
  ): Promise<{ type: NodeTypeDirectory; operatingSystem: OperatingSystem }> {
    const [type, operatingSystem] = await Promise.all([
      this.ensureNodeType(em, context, { name: 'Host', makeDefault: false }),
      this.ensureUnknownOperatingSystem(em, context),
    ]);
    return { type, operatingSystem };
  }
}
