import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { ActionStamp } from '@archpad/models';
import { getArchpadRequestContext } from '@/request-context/archpad-request-context';
import type { DrawIoImportJobReporter, DrawIoImportJob } from './draw-io-import.types';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentHierarchyMap } from '@/model/maps/application-component-hierarchy.map';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import {
  parseDrawIoXml,
  type DrawIoParsedElement,
  type DrawIoParsedEdge,
  type DrawIoParsedModel,
} from './draw-io-parser';

@Injectable()
export class DrawIoImportService {
  constructor(
    @InjectRepository(ApplicationComponent)
    private readonly componentRepo: EntityRepository<ApplicationComponent>,
    @InjectRepository(ApplicationFunction)
    private readonly functionRepo: EntityRepository<ApplicationFunction>,
    @InjectRepository(DataObject)
    private readonly dataObjectRepo: EntityRepository<DataObject>,
    @InjectRepository(SystemSoftware)
    private readonly systemSoftwareRepo: EntityRepository<SystemSoftware>,
    @InjectRepository(ApplicationFlow)
    private readonly flowRepo: EntityRepository<ApplicationFlow>,
  ) {}

  async importFromDrawIo(
    xml: string,
    reporter: DrawIoImportJobReporter,
    options?: { clear?: boolean },
  ): Promise<NonNullable<DrawIoImportJob['result']>> {
    const context = getArchpadRequestContext();
    const tenantId = context?.tenantIds?.[0];
    if (!tenantId) {
      throw new Error(
        'Import requires tenant context (x-archpad-tenant-ids header).',
      );
    }

    reporter.setProgress(5);
    reporter.log('repository.draw-io.stage.parse');

    const parsed = parseDrawIoXml(xml);
    const components = parsed.elements.filter((e) => e.type === 'component');
    const functions = parsed.elements.filter((e) => e.type === 'function');
    const dataObjects = parsed.elements.filter((e) => e.type === 'data');
    const systemSoftware = parsed.elements.filter((e) => e.type === 'software');

    reporter.log('repository.draw-io.stage.create-entities', {
      components: components.length,
      functions: functions.length,
      dataObjects: dataObjects.length,
      systemSoftware: systemSoftware.length,
    });

    const result: NonNullable<DrawIoImportJob['result']> = {
      created: {
        applicationComponents: 0,
        applicationFunctions: 0,
        dataObjects: 0,
        systemSoftware: 0,
        componentFunctionLinks: 0,
        componentHierarchyLinks: 0,
        applicationFlows: 0,
      },
    };

    const em = this.componentRepo.getEntityManager();

    await em.transactional(async (txEm) => {
      if (options?.clear) {
        reporter.log('repository.draw-io.stage.clear-repo');
        await this.clearRepository(txEm, reporter, tenantId);
      }

      const created = ActionStamp.now(context?.userId);
      const componentById = new Map<string, ApplicationComponent>();
      const functionById = new Map<string, ApplicationFunction>();
      const dataObjectById = new Map<string, DataObject>();
      const systemSoftwareById = new Map<string, SystemSoftware>();

      reporter.setProgress(15);

      for (const el of components) {
        const existing = await txEm.findOne(ApplicationComponent, {
          name: el.name,
          tenantId,
        } as any);
        const entity =
          existing ??
          txEm.create(ApplicationComponent, {
            name: el.name,
            description: el.description,
            created,
            tenantId,
          } as any);
        componentById.set(el.id, entity);
        if (!existing) {
          await txEm.persist(entity);
          result.created.applicationComponents += 1;
        }
      }

      for (const el of functions) {
        const existing = await txEm.findOne(ApplicationFunction, {
          name: el.name,
          tenantId,
          layer: LayerKind.APPLICATION as any,
        } as any);
        const entity =
          existing ??
          txEm.create(ApplicationFunction, {
            name: el.name,
            description: el.description,
            layer: LayerKind.APPLICATION,
            created,
            tenantId,
          } as any);
        functionById.set(el.id, entity);
        if (!existing) {
          await txEm.persist(entity);
          result.created.applicationFunctions += 1;
        }
      }

      for (const el of dataObjects) {
        const existing = await txEm.findOne(DataObject, {
          name: el.name,
          tenantId,
        } as any);
        const entity =
          existing ??
          txEm.create(DataObject, {
            name: el.name,
            description: el.description,
            created,
            tenantId,
          } as any);
        dataObjectById.set(el.id, entity);
        if (!existing) {
          await txEm.persist(entity);
          result.created.dataObjects += 1;
        }
      }

      for (const el of systemSoftware) {
        const existing = await txEm.findOne(SystemSoftware, {
          name: el.name,
          tenantId,
        } as any);
        const entity =
          existing ??
          txEm.create(SystemSoftware, {
            name: el.name,
            description: el.description,
            kind: SystemSoftwareKind.OTHER,
            created,
            tenantId,
          } as any);
        systemSoftwareById.set(el.id, entity);
        if (!existing) {
          await txEm.persist(entity);
          result.created.systemSoftware += 1;
        }
      }

      reporter.setProgress(50);
      reporter.log('repository.draw-io.stage.create-links');

      const elementById = new Map<string, DrawIoParsedElement>();
      for (const e of parsed.elements) elementById.set(e.id, e);

      const componentsByFunctionId = new Map<string, ApplicationComponent[]>();
      for (const el of parsed.elements) {
        if (el.type === 'function' && el.parentId) {
          const parent = componentById.get(el.parentId);
          if (parent) {
            const arr = componentsByFunctionId.get(el.id) ?? [];
            arr.push(parent);
            componentsByFunctionId.set(el.id, arr);
          }
        }
      }

      for (const el of functions) {
        const parentIds = [el.parentId].filter(Boolean) as string[];
        for (const pid of parentIds) {
          const comp = componentById.get(pid);
          const fn = functionById.get(el.id);
          if (!comp || !fn) continue;
          const existing = await txEm.findOne(ApplicationComponentFunctionMap, {
            component: comp.id as any,
            function: fn.id as any,
          } as any);
          if (!existing) {
            await txEm.persistAndFlush(
              txEm.create(ApplicationComponentFunctionMap, {
                component: comp,
                function: fn,
              } as any),
            );
            result.created.componentFunctionLinks += 1;
          }
          const arr = componentsByFunctionId.get(el.id) ?? [];
          if (!arr.some((c) => c.id === comp.id)) arr.push(comp);
          componentsByFunctionId.set(el.id, arr);
        }
      }

      for (const el of parsed.elements) {
        if (el.type === 'function' && !componentsByFunctionId.has(el.id)) {
          const fn = functionById.get(el.id);
          if (!fn) continue;
          const container = parsed.elements
            .filter((p) => p.type === 'component')
            .find(
              (p) =>
                p.x <= el.x &&
                p.y <= el.y &&
                p.x + p.width >= el.x + el.width &&
                p.y + p.height >= el.y + el.height,
            );
          if (container) {
            const comp = componentById.get(container.id);
            if (comp) {
              const existing = await txEm.findOne(
                ApplicationComponentFunctionMap,
                {
                  component: comp.id as any,
                  function: fn.id as any,
                } as any,
              );
              if (!existing) {
                await txEm.persistAndFlush(
                  txEm.create(ApplicationComponentFunctionMap, {
                    component: comp,
                    function: fn,
                  } as any),
                );
                result.created.componentFunctionLinks += 1;
              }
            }
          }
        }
      }

      for (const el of parsed.elements) {
        if (el.type === 'component' && el.parentId) {
          const parent = componentById.get(el.parentId);
          const child = componentById.get(el.id);
          if (!parent || !child || parent.id === child.id) continue;
          const existing = await txEm.findOne(
            ApplicationComponentHierarchyMap,
            {
              parent: parent.id as any,
              child: child.id as any,
            } as any,
          );
          if (!existing) {
            await txEm.persistAndFlush(
              txEm.create(ApplicationComponentHierarchyMap, {
                parent,
                child,
              } as any),
            );
            result.created.componentHierarchyLinks += 1;
          }
        }
      }

      reporter.setProgress(75);
      reporter.log('repository.draw-io.stage.create-flows');

      for (const el of dataObjects) {
        const parent = el.parentId ? componentById.get(el.parentId) : null;
        if (parent) {
          const dto = dataObjectById.get(el.id);
          if (dto) {
            const existing = await txEm.findOne(
              ApplicationComponentDataObjectMap,
              {
                component: parent.id as any,
                dataObject: dto.id as any,
              } as any,
            );
            if (!existing) {
              await txEm.persistAndFlush(
                txEm.create(ApplicationComponentDataObjectMap, {
                  component: parent,
                  dataObject: dto,
                } as any),
              );
            }
          }
        }
      }

      for (const el of systemSoftware) {
        const parent = el.parentId ? componentById.get(el.parentId) : null;
        if (parent) {
          const sw = systemSoftwareById.get(el.id);
          if (sw) {
            const existing = await txEm.findOne(
              ApplicationComponentSystemSoftwareMap,
              {
                component: parent.id as any,
                systemSoftware: sw.id as any,
              } as any,
            );
            if (!existing) {
              await txEm.persistAndFlush(
                txEm.create(ApplicationComponentSystemSoftwareMap, {
                  component: parent,
                  systemSoftware: sw,
                  kind: SystemSoftwareKind.OTHER,
                } as any),
              );
            }
          }
        }
      }

      for (const edge of parsed.edges) {
        const srcEl = elementById.get(edge.sourceId);
        const tgtEl = elementById.get(edge.targetId);
        if (!srcEl || !tgtEl) continue;

        const srcComp = componentById.get(edge.sourceId);
        const tgtComp = componentById.get(edge.targetId);

        if (srcComp && tgtComp) {
          const existing = await txEm.findOne(ApplicationFlow, {
            layer: LayerKind.APPLICATION as any,
            sourceComponent: srcComp.id as any,
            targetComponent: tgtComp.id as any,
          } as any);
          if (!existing) {
            await txEm.persistAndFlush(
              txEm.create(ApplicationFlow, {
                layer: LayerKind.APPLICATION,
                name: edge.label ?? `${srcComp.name} → ${tgtComp.name}`,
                sourceComponent: srcComp,
                targetComponent: tgtComp,
                created,
                tenantId,
              } as any),
            );
            result.created.applicationFlows += 1;
          }
        }
      }

      reporter.setProgress(95);
    });

    reporter.log('repository.draw-io.stage.completed', {
      components: result.created.applicationComponents,
      functions: result.created.applicationFunctions,
      dataObjects: result.created.dataObjects,
      systemSoftware: result.created.systemSoftware,
      links: result.created.componentFunctionLinks,
      hierarchy: result.created.componentHierarchyLinks,
      flows: result.created.applicationFlows,
    });
    reporter.setProgress(100);
    return result;
  }

  private async clearRepository(
    em: EntityManager,
    reporter: DrawIoImportJobReporter,
    tenantId: string,
  ) {
    const deletes: Array<{ entity: object; where: object; label: string }> = [
      { entity: ApplicationFlow, where: { tenantId }, label: 'ApplicationFlow' },
      {
        entity: ApplicationComponentHierarchyMap,
        where: {
          $or: [
            { parent: { tenantId } },
            { child: { tenantId } },
          ],
        },
        label: 'ApplicationComponentHierarchyMap',
      },
      {
        entity: ApplicationComponentFunctionMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentFunctionMap',
      },
      {
        entity: ApplicationComponentDataObjectMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentDataObjectMap',
      },
      {
        entity: ApplicationComponentSystemSoftwareMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentSystemSoftwareMap',
      },
    ];

    for (const { entity, where, label } of deletes) {
      const deleted = await em.nativeDelete(entity as never, where as never);
      reporter.log('repository.draw-io.clear-repo.entity', {
        entity: label,
        deleted: String(deleted),
      });
    }

    await em.nativeDelete(ApplicationComponent, { tenantId } as never);
    await em.nativeDelete(ApplicationFunction, { tenantId } as never);
    await em.nativeDelete(DataObject, { tenantId } as never);
    await em.nativeDelete(SystemSoftware, { tenantId } as never);

    reporter.log('repository.draw-io.clear-repo.done', {});
  }
}
