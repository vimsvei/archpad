import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { LoggerService } from '@archpad/logger';
import { ActionStamp } from '@archpad/models';
import {
  getArchpadRequestContext,
  type ArchpadRequestContext,
} from '@/request-context/archpad-request-context';
import type {
  ImportJobReporter,
  ImportJob,
} from './open-exchange-import.types';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationFunctionDataObjectMap } from '@/model/maps/application-function-data-object.map';
import { DataAccessKind } from '@/model/enums/data-access-kind.enum';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { Role } from '@/model/archimate/common/role.entity';
import { BusinessRole } from '@/model/archimate/business/business-role.entity';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import { TechnologyLogicalNetwork } from '@/model/archimate/technology/technology-network.entity';
import { NetworkAbstractionLevel } from '@/model/enums/network-abstraction-level.enum.';
import { Principle } from '@/model/archimate/motivation/principle.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';
import { Requirement } from '@/model/archimate/motivation/requirement.entity';
import { Assessment } from '@/model/archimate/motivation/assessment.entity';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { TechnologyHostNode } from '@/model/archimate/technology/technology-node.entity';
import { OperatingSystem } from '@/model/archimate/technology/operating-system.entity';
import { NodeTypeDirectory } from '@/model/directories/directories';
import { TechnologyNodeSystemSoftwareMap } from '@/model/maps/technology-node-system-software.map';
import { TechnologyNodeHierarchyMap } from '@/model/maps/technology-node-hierarchy.map';
import { ApplicationFunctionInterfaceMap } from '@/model/maps/application-function-interface.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentTechnologyNodeMap } from '@/model/maps/application-component-technology-node.map';
import { ApplicationComponentTechnologyLogicalNetworkMap } from '@/model/maps/application-component-technology-logical-network.map';
import { ApplicationComponentProductMap } from '@/model/maps/application-component-product.map';
import { ApplicationComponentStakeholderMap } from '@/model/maps/application-component-stakeholder.map';
import { ApplicationComponentHierarchyMap } from '@/model/maps/application-component-hierarchy.map';
import { ApplicationComponentDirectoryMap } from '@/model/maps/application-component-directory.map';
import { TechnologyNetworkHierarchyMap } from '@/model/maps/technology-network-hierarchy.map';
import { SolutionApplicationComponentMap } from '@/model/maps/solution-application-component.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionConstraintMap } from '@/model/maps/solution-constraint.map';
import { Location } from '@/model/archimate/common/location.entity';
import { BusinessProduct } from '@/model/archimate/business/business-product.entity';
import { Capability } from '@/model/archimate/strategy/capability.entity';
import { Stakeholder } from '@/model/archimate/motivation/stakeholder.entity';
import { Solution } from '@/model/solution/solution.entity';
import { FlowGeneric } from '@/model/archimate/core/flow.generic';
import { Interface as ArchimateInterface } from '@/model/archimate/common/interface.entity';
import { Function as ArchimateFunction } from '@/model/archimate/common/function.entity';
import { Event as ArchimateEvent } from '@/model/archimate/common/event.entity';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';

type ParsedElement = {
  id: string; // xml identifier
  type?: string; // xsi:type
  name?: string;
  documentation?: string;
};

type ParsedRelationship = {
  id: string; // xml identifier
  type?: string; // xsi:type
  source?: string; // element identifier
  target?: string; // element identifier
  name?: string;
  documentation?: string;
  accessType?: string; // for Access relationship
};

type ParsedModel = {
  elements: ParsedElement[];
  relationships: ParsedRelationship[];
};

function decodeXmlEntities(input: string): string {
  return input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseAttributes(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([\w:-]+)\s*=\s*"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    out[m[1]] = m[2];
  }
  return out;
}

function extractTagText(block: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = re.exec(block);
  if (!m) return undefined;
  const text = decodeXmlEntities(m[1] ?? '').trim();
  return text.length ? text : undefined;
}

function sliceBetween(input: string, startTag: string, endTag: string): string {
  const start = input.indexOf(startTag);
  if (start < 0) return '';
  const end = input.indexOf(endTag, start + startTag.length);
  if (end < 0) return '';
  return input.slice(start + startTag.length, end);
}

function parseOpenExchangeXml(xml: string): ParsedModel {
  const elementsBlock = sliceBetween(xml, '<elements>', '</elements>');
  const relationshipsBlock = sliceBetween(
    xml,
    '<relationships>',
    '</relationships>',
  );

  const elements: ParsedElement[] = [];
  const relationships: ParsedRelationship[] = [];

  // <element ...>...</element>
  const elementRe = /<element\b([^>]*)>([\s\S]*?)<\/element>/gi;
  let m: RegExpExecArray | null;
  while ((m = elementRe.exec(elementsBlock))) {
    const attrs = parseAttributes(m[1] ?? '');
    const body = m[2] ?? '';
    const id = attrs['identifier'];
    if (!id) continue;
    const type = attrs['xsi:type'] ?? attrs['type'];
    elements.push({
      id,
      type,
      name: extractTagText(body, 'name'),
      documentation: extractTagText(body, 'documentation'),
    });
  }

  // <relationship ... /> OR <relationship ...>...</relationship>
  const relRe = /<relationship\b([^>]*?)(?:\/>|>([\s\S]*?)<\/relationship>)/gi;
  while ((m = relRe.exec(relationshipsBlock))) {
    const attrs = parseAttributes(m[1] ?? '');
    const body = m[2] ?? '';
    const id = attrs['identifier'];
    if (!id) continue;
    const type = attrs['xsi:type'] ?? attrs['type'];
    relationships.push({
      id,
      type,
      source: attrs['source'],
      target: attrs['target'],
      accessType: attrs['accessType'],
      name: extractTagText(body, 'name'),
      documentation: extractTagText(body, 'documentation'),
    });
  }

  return { elements, relationships };
}

@Injectable()
export class OpenExchangeImportService {
  constructor(
    @InjectRepository(ApplicationComponent)
    private readonly componentRepo: EntityRepository<ApplicationComponent>,
    @InjectRepository(ApplicationFunction)
    private readonly functionRepo: EntityRepository<ApplicationFunction>,
    @InjectRepository(ApplicationInterface)
    private readonly interfaceRepo: EntityRepository<ApplicationInterface>,
    @InjectRepository(ApplicationEvent)
    private readonly eventRepo: EntityRepository<ApplicationEvent>,
    @InjectRepository(DataObject)
    private readonly dataObjectRepo: EntityRepository<DataObject>,
    @InjectRepository(ApplicationFlow)
    private readonly flowRepo: EntityRepository<ApplicationFlow>,
    @InjectRepository(ApplicationComponentFunctionMap)
    private readonly componentFunctionMapRepo: EntityRepository<ApplicationComponentFunctionMap>,
    @InjectRepository(ApplicationComponentDataObjectMap)
    private readonly componentDataObjectMapRepo: EntityRepository<ApplicationComponentDataObjectMap>,
    @InjectRepository(ApplicationFunctionDataObjectMap)
    private readonly functionDataObjectMapRepo: EntityRepository<ApplicationFunctionDataObjectMap>,
    @InjectRepository(BusinessActor)
    private readonly businessActorRepo: EntityRepository<BusinessActor>,
    @InjectRepository(BusinessRole)
    private readonly businessRoleRepo: EntityRepository<BusinessRole>,
    @InjectRepository(BusinessActorRoleMap)
    private readonly businessActorRoleMapRepo: EntityRepository<BusinessActorRoleMap>,
    @InjectRepository(SystemSoftware)
    private readonly systemSoftwareRepo: EntityRepository<SystemSoftware>,
    @InjectRepository(TechnologyLogicalNetwork)
    private readonly technologyNetworkRepo: EntityRepository<TechnologyLogicalNetwork>,
    @InjectRepository(Principle)
    private readonly principleRepo: EntityRepository<Principle>,
    @InjectRepository(Constraint)
    private readonly constraintRepo: EntityRepository<Constraint>,
    @InjectRepository(Requirement)
    private readonly requirementRepo: EntityRepository<Requirement>,
    @InjectRepository(Assessment)
    private readonly assessmentRepo: EntityRepository<Assessment>,
    @InjectRepository(TechnologyDeviceNode)
    private readonly deviceNodeRepo: EntityRepository<TechnologyDeviceNode>,
    @InjectRepository(TechnologyHostNode)
    private readonly hostNodeRepo: EntityRepository<TechnologyHostNode>,
    @InjectRepository(OperatingSystem)
    private readonly operatingSystemRepo: EntityRepository<OperatingSystem>,
    @InjectRepository(NodeTypeDirectory)
    private readonly nodeTypeDirectoryRepo: EntityRepository<NodeTypeDirectory>,
    @InjectRepository(TechnologyNodeSystemSoftwareMap)
    private readonly technologyNodeSystemSoftwareRepo: EntityRepository<TechnologyNodeSystemSoftwareMap>,
    private readonly logger: LoggerService,
  ) {}

  async importApplicationFromOpenExchangeXml(
    xml: string,
    context: ArchpadRequestContext,
    reporter: ImportJobReporter,
    options?: { clear?: boolean },
  ): Promise<NonNullable<ImportJob['result']>> {
    const tenantId = getArchpadRequestContext()?.tenantIds?.[0];
    if (!tenantId) {
      throw new Error(
        'Import requires tenant context (x-archpad-tenant-ids header). ' +
          'Ensure you are authenticated and have a tenant selected.',
      );
    }
    reporter.setProgress(2);
    reporter.log('repository.open-exchange.stage.parse');
    const parsed = parseOpenExchangeXml(xml);

    const elementById = new Map<string, ParsedElement>();
    for (const el of parsed.elements) elementById.set(el.id, el);

    // Only "Application level" for now.
    const appComponents = parsed.elements.filter(
      (e) => e.type === 'ApplicationComponent',
    );
    const appFunctions = parsed.elements.filter(
      (e) => e.type === 'ApplicationFunction',
    );
    const dataObjects = parsed.elements.filter((e) => e.type === 'DataObject');
    const appInterfaces = parsed.elements.filter(
      (e) => e.type === 'ApplicationInterface',
    );
    const appEvents = parsed.elements.filter(
      (e) => e.type === 'ApplicationEvent',
    );
    const businessActors = parsed.elements.filter(
      (e) => e.type === 'BusinessActor',
    );
    const businessRoles = parsed.elements.filter(
      (e) => e.type === 'BusinessRole',
    );
    const systemSoftware = parsed.elements.filter(
      (e) => e.type === 'SystemSoftware',
    );
    const communicationNetworks = parsed.elements.filter(
      (e) => e.type === 'CommunicationNetwork',
    );
    const devices = parsed.elements.filter((e) => e.type === 'Device');
    const nodes = parsed.elements.filter((e) => e.type === 'Node');
    const principles = parsed.elements.filter((e) => e.type === 'Principle');
    const constraints = parsed.elements.filter((e) => e.type === 'Constraint');
    const requirements = parsed.elements.filter(
      (e) => e.type === 'Requirement',
    );
    const assessments = parsed.elements.filter((e) => e.type === 'Assessment');

    reporter.setProgress(8);
    reporter.log('repository.open-exchange.stage.create-entities', {
      components: appComponents.length,
      functions: appFunctions.length,
      dataObjects: dataObjects.length,
    });

    const result: NonNullable<ImportJob['result']> = {
      created: {
        applicationComponents: 0,
        applicationFunctions: 0,
        applicationInterfaces: 0,
        applicationEvents: 0,
        dataObjects: 0,
        applicationFlows: 0,
        componentFunctionLinks: 0,
        businessActors: 0,
        businessRoles: 0,
        systemSoftware: 0,
        communicationNetworks: 0,
        technologyNodes: 0,
      },
    };

    const em = this.componentRepo.getEntityManager();

    const componentEntityByXmlId = new Map<string, ApplicationComponent>();
    const functionEntityByXmlId = new Map<string, ApplicationFunction>();
    const dataObjectEntityByXmlId = new Map<string, DataObject>();
    const businessActorEntityByXmlId = new Map<string, BusinessActor>();
    const businessRoleEntityByXmlId = new Map<string, BusinessRole>();
    const systemSoftwareEntityByXmlId = new Map<string, SystemSoftware>();
    const networkEntityByXmlId = new Map<string, TechnologyLogicalNetwork>();
    const deviceEntityByXmlId = new Map<string, TechnologyDeviceNode>();
    const hostEntityByXmlId = new Map<string, TechnologyHostNode>();

    await em.transactional(async (txEm) => {
      if (options?.clear) {
        reporter.log('repository.open-exchange.stage.clear-repo');
        await this.clearRepository(txEm, reporter, tenantId);
      }

      await this.createApplicationEntities(txEm, context, tenantId, {
        appComponents,
        appFunctions,
        dataObjects,
        appInterfaces,
        appEvents,
        componentEntityByXmlId,
        functionEntityByXmlId,
        dataObjectEntityByXmlId,
        result,
        dedupe: !options?.clear,
      });

      await this.createCrossLayerEntities(txEm, context, tenantId, {
        businessActors,
        businessRoles,
        systemSoftware,
        communicationNetworks,
        devices,
        nodes,
        principles,
        constraints,
        requirements,
        assessments,
        businessActorEntityByXmlId,
        businessRoleEntityByXmlId,
        systemSoftwareEntityByXmlId,
        networkEntityByXmlId,
        deviceEntityByXmlId,
        hostEntityByXmlId,
        result,
        dedupe: !options?.clear,
      });

      reporter.setProgress(55);
      reporter.log('repository.open-exchange.stage.create-links');

      // Relationships:
      // - component ↔ function: Assignment OR Realization
      // - business actor ↔ role: Assignment
      const componentFunctionRelTypes = new Set(['Assignment', 'Realization']);
      const maps: ApplicationComponentFunctionMap[] = [];
      const componentsByFunctionXmlId = new Map<
        string,
        ApplicationComponent[]
      >();

      for (const rel of parsed.relationships) {
        if (!rel.source || !rel.target || !rel.type) continue;
        const sourceEl = elementById.get(rel.source);
        const targetEl = elementById.get(rel.target);
        if (!sourceEl || !targetEl) continue;

        // ApplicationComponent ↔ ApplicationFunction (Assignment/Realization in XML)
        if (componentFunctionRelTypes.has(rel.type)) {
          const aIsComponent = sourceEl.type === 'ApplicationComponent';
          const bIsComponent = targetEl.type === 'ApplicationComponent';
          const aIsFunction = sourceEl.type === 'ApplicationFunction';
          const bIsFunction = targetEl.type === 'ApplicationFunction';

          if ((aIsComponent && bIsFunction) || (bIsComponent && aIsFunction)) {
            const componentXmlId = aIsComponent ? sourceEl.id : targetEl.id;
            const functionXmlId = aIsFunction ? sourceEl.id : targetEl.id;

            const c = componentEntityByXmlId.get(componentXmlId);
            const f = functionEntityByXmlId.get(functionXmlId);
            if (!c || !f) continue;

            const existing = await txEm.findOne(
              ApplicationComponentFunctionMap,
              { component: c.id as any, function: f.id as any } as any,
            );
            const map = existing
              ? existing
              : txEm.create(ApplicationComponentFunctionMap, {
                  component: c,
                  function: f,
                } as any);
            if (!existing) maps.push(map);

            const arr = componentsByFunctionXmlId.get(functionXmlId) ?? [];
            arr.push(c);
            componentsByFunctionXmlId.set(functionXmlId, arr);
          }
        }

        // BusinessActor -> BusinessRole (Assignment)
        if (rel.type === 'Assignment') {
          if (
            sourceEl.type === 'BusinessActor' &&
            targetEl.type === 'BusinessRole'
          ) {
            const actor = businessActorEntityByXmlId.get(sourceEl.id);
            const role = businessRoleEntityByXmlId.get(targetEl.id);
            if (!actor || !role) continue;
            const existing = await txEm.findOne(BusinessActorRoleMap, {
              actor: actor.id as any,
              role: role.id as any,
            } as any);
            if (!existing) {
              await txEm.persistAndFlush(
                txEm.create(BusinessActorRoleMap, { actor, role } as any),
              );
            }
          }
        }
      }

      if (maps.length) {
        await txEm.persistAndFlush(maps);
        result.created.componentFunctionLinks += maps.length;
      }

      // Technology relationships: Device ↔ CommunicationNetwork and Device ↔ SystemSoftware
      reporter.setProgress(60);
      reporter.log('repository.open-exchange.stage.create-technology-links');
      await this.linkTechnologyFromXml(txEm, {
        relationships: parsed.relationships,
        elementById,
        deviceEntityByXmlId,
        hostEntityByXmlId,
        networkEntityByXmlId,
        systemSoftwareEntityByXmlId,
      });

      // Relationships: Access (component/function -> dataObject)
      reporter.setProgress(65);
      reporter.log('repository.open-exchange.stage.create-data-access');

      const accesses = parsed.relationships.filter((r) => r.type === 'Access');
      const functionDataObjectSeen = new Set<string>();
      for (const rel of accesses) {
        if (!rel.source || !rel.target) continue;
        const sourceEl = elementById.get(rel.source);
        const targetEl = elementById.get(rel.target);
        if (!sourceEl || !targetEl) continue;
        if (targetEl.type !== 'DataObject') continue;

        const dataObject = dataObjectEntityByXmlId.get(targetEl.id);
        if (!dataObject) continue;

        const accessKind = this.mapAccessType(rel.accessType);

        // Component -> DataObject
        if (sourceEl.type === 'ApplicationComponent') {
          const component = componentEntityByXmlId.get(sourceEl.id);
          if (!component) continue;

          const existing = await txEm.findOne(
            ApplicationComponentDataObjectMap,
            {
              component: component.id as any,
              dataObject: dataObject.id as any,
            } as any,
          );
          if (!existing) {
            await txEm.persistAndFlush(
              txEm.create(ApplicationComponentDataObjectMap, {
                component,
                dataObject,
              } as any),
            );
          }
          continue;
        }

        // Function -> DataObject (derive component(s) via Assignment)
        if (sourceEl.type === 'ApplicationFunction') {
          const fn = functionEntityByXmlId.get(sourceEl.id);
          if (!fn) continue;
          const components = componentsByFunctionXmlId.get(sourceEl.id) ?? [];
          for (const component of components) {
            const dedupeKey = `${component.id}|${fn.id}|${dataObject.id}`;
            if (functionDataObjectSeen.has(dedupeKey)) continue;
            functionDataObjectSeen.add(dedupeKey);

            // ensure component<->function exists
            const componentFunction =
              (await txEm.findOne(ApplicationComponentFunctionMap, {
                component: component.id as any,
                function: fn.id as any,
              } as any)) ??
              txEm.create(ApplicationComponentFunctionMap, {
                component,
                function: fn,
              } as any);

            // ensure component<->dataObject exists
            const componentDataObject =
              (await txEm.findOne(ApplicationComponentDataObjectMap, {
                component: component.id as any,
                dataObject: dataObject.id as any,
              } as any)) ??
              txEm.create(ApplicationComponentDataObjectMap, {
                component,
                dataObject,
              } as any);

            // ensure function<->dataObject exists
            const existing = await txEm
              .getConnection()
              .execute(
                `select 1 from map_application_function_data_object where component_id = ? and function_id = ? and data_object_id = ? limit 1`,
                [component.id, fn.id, dataObject.id],
              );

            if (!Array.isArray(existing) || existing.length === 0) {
              const map = txEm.create(ApplicationFunctionDataObjectMap, {
                componentFunction,
                componentDataObject,
                component,
                dataObject,
                accessKind,
              } as any);
              await txEm.persistAndFlush([
                componentFunction,
                componentDataObject,
                map,
              ]);
            }
          }
        }
      }

      reporter.setProgress(75);
      reporter.log('repository.open-exchange.stage.create-flows');

      // Relationships: Flow (component -> component)
      const flows = parsed.relationships.filter((r) => r.type === 'Flow');
      const flowEntities: ApplicationFlow[] = [];
      for (const rel of flows) {
        if (!rel.source || !rel.target) continue;
        const sourceEl = elementById.get(rel.source);
        const targetEl = elementById.get(rel.target);
        if (!sourceEl || !targetEl) continue;

        if (
          sourceEl.type === 'ApplicationComponent' &&
          targetEl.type === 'ApplicationComponent'
        ) {
          const source = componentEntityByXmlId.get(sourceEl.id);
          const target = componentEntityByXmlId.get(targetEl.id);
          if (!source || !target) continue;

          const name =
            rel.name ??
            `${sourceEl.name ?? sourceEl.id} → ${targetEl.name ?? targetEl.id}`;
          const existing = await txEm.findOne(ApplicationFlow, {
            layer: LayerKind.APPLICATION as any,
            name,
            sourceComponent: source.id as any,
            targetComponent: target.id as any,
          } as any);
          if (existing) continue;

          flowEntities.push(
            txEm.create(ApplicationFlow, {
              layer: LayerKind.APPLICATION,
              name,
              description: rel.documentation,
              sourceComponent: source,
              targetComponent: target,
              created: ActionStamp.now(context.userId),
              tenantId,
            } as any),
          );
        }
      }
      if (flowEntities.length) {
        await txEm.persistAndFlush(flowEntities);
        result.created.applicationFlows += flowEntities.length;
      }

      reporter.setProgress(92);
    });

    reporter.log('repository.open-exchange.stage.completed', {
      components: result.created.applicationComponents,
      functions: result.created.applicationFunctions,
      links: result.created.componentFunctionLinks,
      flows: result.created.applicationFlows,
    });

    reporter.setProgress(100);
    return result;
  }

  private async createApplicationEntities(
    em: EntityManager,
    context: ArchpadRequestContext,
    tenantId: string,
    input: {
      appComponents: ParsedElement[];
      appFunctions: ParsedElement[];
      dataObjects: ParsedElement[];
      appInterfaces: ParsedElement[];
      appEvents: ParsedElement[];
      componentEntityByXmlId: Map<string, ApplicationComponent>;
      functionEntityByXmlId: Map<string, ApplicationFunction>;
      dataObjectEntityByXmlId: Map<string, DataObject>;
      result: NonNullable<ImportJob['result']>;
      dedupe: boolean;
    },
  ) {
    const created = ActionStamp.now(context.userId);

    const components: ApplicationComponent[] = [];
    for (const e of input.appComponents) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(ApplicationComponent, { name, tenantId } as any)
        : null;
      const entity =
        existing ??
        em.create(ApplicationComponent, {
          name,
          description: e.documentation,
          created,
          tenantId,
        } as any);
      input.componentEntityByXmlId.set(e.id, entity);
      if (!existing) components.push(entity);
    }

    const functions: ApplicationFunction[] = [];
    for (const e of input.appFunctions) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(ApplicationFunction, {
            layer: LayerKind.APPLICATION as any,
            name,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(ApplicationFunction, {
          layer: LayerKind.APPLICATION,
          name,
          description: e.documentation,
          created,
          tenantId,
        } as any);
      input.functionEntityByXmlId.set(e.id, entity);
      if (!existing) functions.push(entity);
    }

    const dataObjects: DataObject[] = [];
    for (const e of input.dataObjects) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(DataObject, { name, tenantId } as any)
        : null;
      const entity =
        existing ??
        em.create(DataObject, {
          name,
          description: e.documentation,
          created,
          tenantId,
        } as any);
      input.dataObjectEntityByXmlId.set(e.id, entity);
      if (!existing) dataObjects.push(entity);
    }

    const interfaces: ApplicationInterface[] = input.appInterfaces.map((e) =>
      em.create(ApplicationInterface, {
        layer: LayerKind.APPLICATION,
        name: e.name ?? e.id,
        description: e.documentation,
        created,
        tenantId,
      } as any),
    );

    const events: ApplicationEvent[] = input.appEvents.map((e) =>
      em.create(ApplicationEvent, {
        layer: LayerKind.APPLICATION,
        name: e.name ?? e.id,
        description: e.documentation,
        created,
        tenantId,
      } as any),
    );

    // Persist in a single flush.
    const all = [
      ...components,
      ...functions,
      ...dataObjects,
      ...interfaces,
      ...events,
    ];
    if (all.length) {
      await em.persistAndFlush(all);
    }

    input.result.created.applicationComponents += components.length;
    input.result.created.applicationFunctions += functions.length;
    input.result.created.dataObjects += dataObjects.length;
    input.result.created.applicationInterfaces += interfaces.length;
    input.result.created.applicationEvents += events.length;
  }

  private mapAccessType(input?: string): DataAccessKind {
    const v = (input ?? '').toLowerCase();
    if (v === 'read') return DataAccessKind.READ;
    if (v === 'write') return DataAccessKind.WRITE;
    if (v === 'readwrite' || v === 'read_write' || v === 'read-write')
      return DataAccessKind.READ_WRITE;
    // Default for Access without explicit type is READ.
    return DataAccessKind.READ;
  }

  private async clearRepository(
    em: EntityManager,
    reporter: ImportJobReporter,
    tenantId: string,
  ) {
    // Keep directories (and directory items) intact; remove only ArchiMate domain tables.
    // Order matters due to FK constraints (maps first, then base tables).
    // Clear only data for the given tenant, not the entire tables.
    const logContext = 'OpenExchangeImportService.clearRepository';

    reporter.log('repository.open-exchange.clear-repo.count', {
      count: 35,
    });

    // Map tables: delete via ORM (component/interface/role/solution scoped)
    // ApplicationFunctionDataObjectMap: MikroORM bug (nativeDelete + QueryBuilder) generates invalid
    // composite PK subquery — "subquery has too few columns". Use raw SQL as workaround.
    const conn = em.getConnection();
    await conn.execute(
      `DELETE FROM map_application_function_data_object WHERE component_id IN (SELECT id FROM components WHERE tenant_id = ?)`,
      [tenantId],
    );
    this.logger.log(
      `[tenantId=${tenantId}] clearRepository: deleted from map_application_function_data_object (raw, MikroORM composite PK bug)`,
      logContext,
    );
    reporter.log('repository.open-exchange.clear-repo.entity', {
      entity: 'ApplicationFunctionDataObjectMap',
      deleted: 'N/A',
    });

    const mapDeletes: Array<{
      entity: object;
      where: object;
      label: string;
    }> = [
      {
        entity: ApplicationComponentDataObjectMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentDataObjectMap',
      },
      {
        entity: ApplicationComponentFunctionMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentFunctionMap',
      },
      {
        entity: ApplicationComponentInterfaceMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentInterfaceMap',
      },
      {
        entity: ApplicationFunctionInterfaceMap,
        where: { interface: { tenantId } },
        label: 'ApplicationFunctionInterfaceMap',
      },
      {
        entity: ApplicationComponentEventMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentEventMap',
      },
      {
        entity: ApplicationComponentSystemSoftwareMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentSystemSoftwareMap',
      },
      {
        entity: ApplicationComponentTechnologyNodeMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentTechnologyNodeMap',
      },
      {
        entity: ApplicationComponentTechnologyLogicalNetworkMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentTechnologyLogicalNetworkMap',
      },
      {
        entity: ApplicationComponentProductMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentProductMap',
      },
      {
        entity: ApplicationComponentStakeholderMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentStakeholderMap',
      },
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
        entity: ApplicationComponentDirectoryMap,
        where: { component: { tenantId } },
        label: 'ApplicationComponentDirectoryMap',
      },
      {
        entity: TechnologyNodeSystemSoftwareMap,
        where: { node: { tenantId } },
        label: 'TechnologyNodeSystemSoftwareMap',
      },
      {
        entity: TechnologyNodeHierarchyMap,
        where: {
          $or: [
            { parent: { tenantId } },
            { child: { tenantId } },
          ],
        },
        label: 'TechnologyNodeHierarchyMap',
      },
      {
        entity: TechnologyNetworkHierarchyMap,
        where: {
          $or: [
            { parent: { tenantId } },
            { child: { tenantId } },
          ],
        },
        label: 'TechnologyNetworkHierarchyMap',
      },
      {
        entity: BusinessActorRoleMap,
        where: { role: { tenantId } },
        label: 'BusinessActorRoleMap',
      },
      {
        entity: SolutionApplicationComponentMap,
        where: {
          $or: [
            { solution: { tenantId } },
            { component: { tenantId } },
          ],
        },
        label: 'SolutionApplicationComponentMap',
      },
      {
        entity: SolutionMotivationElementMap,
        where: { solution: { tenantId } },
        label: 'SolutionMotivationElementMap',
      },
      {
        entity: SolutionConstraintMap,
        where: { solution: { tenantId } },
        label: 'SolutionConstraintMap',
      },
    ];

    for (const { entity, where, label } of mapDeletes) {
      const deleted = await em.nativeDelete(entity as never, where as never);
      this.logger.log(
        `[tenantId=${tenantId}] clearRepository: deleted ${deleted} rows from ${label}`,
        logContext,
      );
      reporter.log('repository.open-exchange.clear-repo.entity', {
        entity: label,
        deleted,
      });
    }

    // Base tables with tenant_id
    const baseDeletes: Array<{ entity: object; label: string }> = [
      { entity: ApplicationFlow, label: 'ApplicationFlow (flows)' },
      { entity: ArchimateInterface, label: 'Interface (interfaces)' },
      { entity: ArchimateEvent, label: 'Event (events)' },
      { entity: ArchimateFunction, label: 'Function (functions)' },
      { entity: MotivationElementGeneric, label: 'MotivationElementGeneric (motivations)' },
      { entity: DataObject, label: 'DataObject (data_objects)' },
      { entity: ApplicationComponent, label: 'ApplicationComponent (components)' },
      { entity: Role, label: 'Role (roles)' },
      { entity: BusinessProduct, label: 'BusinessProduct (products)' },
      { entity: Capability, label: 'Capability (capabilities)' },
      { entity: Stakeholder, label: 'Stakeholder (stakeholders)' },
      { entity: Solution, label: 'Solution (solutions)' },
      { entity: SystemSoftware, label: 'SystemSoftware (system_software)' },
      { entity: TechnologyLogicalNetwork, label: 'TechnologyLogicalNetwork (technology_networks)' },
      { entity: TechnologyHostNode, label: 'TechnologyHostNode (technology_nodes)' },
      { entity: TechnologyDeviceNode, label: 'TechnologyDeviceNode (technology_nodes)' },
    ];

    for (const { entity, label } of baseDeletes) {
      const deleted = await em.nativeDelete(entity as never, {
        tenantId,
      } as never);
      this.logger.log(
        `[tenantId=${tenantId}] clearRepository: deleted ${deleted} rows from ${label}`,
        logContext,
      );
      reporter.log('repository.open-exchange.clear-repo.entity', {
        entity: label,
        deleted,
      });
    }

    // actors, locations: no tenant_id; delete only those linked to tenant's data via relations
    const actorsDeleted = await em.nativeDelete(BusinessActor, {
      roles: { role: { tenantId } },
    } as never);
    this.logger.log(
      `[tenantId=${tenantId}] clearRepository: deleted ${actorsDeleted} rows from BusinessActor (roles.role.tenantId)`,
      logContext,
    );
    reporter.log('repository.open-exchange.clear-repo.entity', {
      entity: 'BusinessActor',
      deleted: actorsDeleted,
    });

    const locationsDeleted = await em.nativeDelete(Location, {
      networks: { tenantId },
    } as never);
    this.logger.log(
      `[tenantId=${tenantId}] clearRepository: deleted ${locationsDeleted} rows from Location (networks.tenantId)`,
      logContext,
    );
    reporter.log('repository.open-exchange.clear-repo.entity', {
      entity: 'Location',
      deleted: locationsDeleted,
    });
  }

  private async createCrossLayerEntities(
    em: EntityManager,
    context: ArchpadRequestContext,
    tenantId: string,
    input: {
      businessActors: ParsedElement[];
      businessRoles: ParsedElement[];
      systemSoftware: ParsedElement[];
      communicationNetworks: ParsedElement[];
      devices: ParsedElement[];
      nodes: ParsedElement[];
      principles: ParsedElement[];
      constraints: ParsedElement[];
      requirements: ParsedElement[];
      assessments: ParsedElement[];
      businessActorEntityByXmlId: Map<string, BusinessActor>;
      businessRoleEntityByXmlId: Map<string, BusinessRole>;
      systemSoftwareEntityByXmlId: Map<string, SystemSoftware>;
      networkEntityByXmlId: Map<string, TechnologyLogicalNetwork>;
      deviceEntityByXmlId: Map<string, TechnologyDeviceNode>;
      hostEntityByXmlId: Map<string, TechnologyHostNode>;
      result: NonNullable<ImportJob['result']>;
      dedupe: boolean;
    },
  ) {
    const created = ActionStamp.now(context.userId);

    // Business layer
    for (const e of input.businessActors) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(BusinessActor, { name } as any)
        : null;
      const entity =
        existing ??
        em.create(BusinessActor, {
          name,
          description: e.documentation,
          created,
        } as any);
      input.businessActorEntityByXmlId.set(e.id, entity);
      if (!existing) {
        await em.persist(entity);
        input.result.created.businessActors += 1;
      }
    }

    for (const e of input.businessRoles) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(BusinessRole, { name, tenantId } as any)
        : null;
      const entity =
        existing ??
        em.create(BusinessRole, {
          name,
          description: e.documentation,
          created,
          tenantId,
        } as any);
      input.businessRoleEntityByXmlId.set(e.id, entity);
      if (!existing) {
        await em.persist(entity);
        input.result.created.businessRoles += 1;
      }
    }

    // Technology layer: SystemSoftware (dedupe by name+tenantId+kind in DB and within batch)
    const systemSoftwareByKey = new Map<string, SystemSoftware>();
    const systemSoftwareKey = (n: string) => `${n}|${tenantId}|${SystemSoftwareKind.OTHER}`;
    for (const e of input.systemSoftware) {
      const name = e.name ?? e.id;
      const key = systemSoftwareKey(name);
      let entity = systemSoftwareByKey.get(key);
      if (!entity && input.dedupe) {
        entity = await em.findOne(SystemSoftware, {
          name,
          kind: SystemSoftwareKind.OTHER as any,
          tenantId,
        } as any) ?? undefined;
        if (entity) systemSoftwareByKey.set(key, entity);
      }
      if (!entity) {
        entity = em.create(SystemSoftware, {
          name,
          description: e.documentation,
          kind: SystemSoftwareKind.OTHER,
          created,
          tenantId,
        } as any);
        systemSoftwareByKey.set(key, entity);
        await em.persist(entity);
        input.result.created.systemSoftware += 1;
      }
      input.systemSoftwareEntityByXmlId.set(e.id, entity);
    }

    // Technology layer: CommunicationNetwork -> TechnologyLogicalNetwork
    for (const e of input.communicationNetworks) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(TechnologyLogicalNetwork, {
            name,
            level: NetworkAbstractionLevel.LOGICAL as any,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(TechnologyLogicalNetwork, {
          name,
          description: e.documentation,
          level: NetworkAbstractionLevel.LOGICAL,
          created,
          tenantId,
        } as any);
      input.networkEntityByXmlId.set(e.id, entity);
      if (!existing) {
        await em.persist(entity);
        input.result.created.communicationNetworks += 1;
      }
    }

    // Technology layer: Device -> TechnologyDeviceNode
    // Required fields: `type` (directory) and `operatingSystem` (system software kind OS).
    const defaultNodeType = await this.ensureNodeTypeDirectory(em, context, {
      name: 'Device',
      makeDefault: true,
    });
    const unknownOs = await this.ensureUnknownOperatingSystem(em, context, tenantId);

    for (const e of input.devices) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(TechnologyDeviceNode, { name, tenantId } as any)
        : null;

      const entity =
        existing ??
        em.create(TechnologyDeviceNode, {
          name,
          description: e.documentation,
          type: defaultNodeType,
          operatingSystem: unknownOs,
          created,
          tenantId,
        } as any);

      input.deviceEntityByXmlId.set(e.id, entity);
      if (!existing) {
        await em.persist(entity);
        input.result.created.technologyNodes += 1;
      }
    }

    // Technology layer: Node -> TechnologyHostNode
    const defaultHostNodeType = await this.ensureNodeTypeDirectory(
      em,
      context,
      {
        name: 'Host',
        makeDefault: false,
      },
    );

    for (const e of input.nodes) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(TechnologyHostNode, { name, tenantId } as any)
        : null;

      const entity =
        existing ??
        em.create(TechnologyHostNode, {
          name,
          description: e.documentation,
          type: defaultHostNodeType,
          operatingSystem: unknownOs,
          created,
          tenantId,
        } as any);

      input.hostEntityByXmlId.set(e.id, entity);
      if (!existing) {
        await em.persist(entity);
        input.result.created.technologyNodes += 1;
      }
    }

    // Motivation layer
    for (const e of input.principles) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(Principle, {
            name,
            kind: MotivationKind.PRINCIPLE as any,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(Principle, {
          name,
          description: e.documentation,
          kind: MotivationKind.PRINCIPLE,
          created,
          tenantId,
        } as any);
      if (!existing) await em.persist(entity);
    }

    for (const e of input.constraints) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(Constraint, {
            name,
            kind: MotivationKind.CONSTRAINT as any,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(Constraint, {
          name,
          description: e.documentation,
          kind: MotivationKind.CONSTRAINT,
          created,
          tenantId,
        } as any);
      if (!existing) await em.persist(entity);
    }

    for (const e of input.requirements) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(Requirement, {
            name,
            kind: MotivationKind.REQUIREMENT as any,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(Requirement, {
          name,
          description: e.documentation,
          kind: MotivationKind.REQUIREMENT,
          created,
          tenantId,
        } as any);
      if (!existing) await em.persist(entity);
    }

    for (const e of input.assessments) {
      const name = e.name ?? e.id;
      const existing = input.dedupe
        ? await em.findOne(Assessment, {
            name,
            kind: MotivationKind.ASSESSMENT as any,
            tenantId,
          } as any)
        : null;
      const entity =
        existing ??
        em.create(Assessment, {
          name,
          description: e.documentation,
          kind: MotivationKind.ASSESSMENT,
          created,
          tenantId,
        } as any);
      if (!existing) await em.persist(entity);
    }

    await em.flush();
  }

  private async linkTechnologyFromXml(
    em: EntityManager,
    input: {
      relationships: ParsedRelationship[];
      elementById: Map<string, ParsedElement>;
      deviceEntityByXmlId: Map<string, TechnologyDeviceNode>;
      hostEntityByXmlId: Map<string, TechnologyHostNode>;
      networkEntityByXmlId: Map<string, TechnologyLogicalNetwork>;
      systemSoftwareEntityByXmlId: Map<string, SystemSoftware>;
    },
  ) {
    const networkRelKinds = new Set([
      'Realization',
      'Aggregation',
      'Composition',
      'Association',
    ]);
    const softwareRelKinds = new Set([
      'Realization',
      'Composition',
      'Aggregation',
      'Association',
    ]);

    for (const rel of input.relationships) {
      if (!rel.source || !rel.target || !rel.type) continue;

      const sourceEl = input.elementById.get(rel.source);
      const targetEl = input.elementById.get(rel.target);
      if (!sourceEl || !targetEl) continue;

      // CommunicationNetwork ↔ (Device|Node) => technologyNode.network
      if (networkRelKinds.has(rel.type)) {
        const aIsNetwork = sourceEl.type === 'CommunicationNetwork';
        const bIsNetwork = targetEl.type === 'CommunicationNetwork';
        const aIsDevice = sourceEl.type === 'Device';
        const bIsDevice = targetEl.type === 'Device';
        const aIsNode = sourceEl.type === 'Node';
        const bIsNode = targetEl.type === 'Node';

        if (
          (aIsNetwork && (bIsDevice || bIsNode)) ||
          (bIsNetwork && (aIsDevice || aIsNode))
        ) {
          const networkXmlId = aIsNetwork ? sourceEl.id : targetEl.id;
          const techNodeXmlId =
            aIsDevice || aIsNode ? sourceEl.id : targetEl.id;

          const node =
            input.deviceEntityByXmlId.get(techNodeXmlId) ??
            input.hostEntityByXmlId.get(techNodeXmlId);
          const network = input.networkEntityByXmlId.get(networkXmlId);
          if (!node || !network) continue;

          // Only set if missing (ManyToOne)
          const current = (node as any).network as any;
          if (!current) {
            (node as any).network = network;
            await em.persistAndFlush(node);
          }
        }
      }

      // Device ↔ SystemSoftware => map_technology_node_system_software
      if (softwareRelKinds.has(rel.type)) {
        const aIsTechNode =
          sourceEl.type === 'Device' || sourceEl.type === 'Node';
        const bIsTechNode =
          targetEl.type === 'Device' || targetEl.type === 'Node';
        const aIsSoftware = sourceEl.type === 'SystemSoftware';
        const bIsSoftware = targetEl.type === 'SystemSoftware';

        if ((aIsTechNode && bIsSoftware) || (bIsTechNode && aIsSoftware)) {
          const techNodeXmlId = aIsTechNode ? sourceEl.id : targetEl.id;
          const softwareXmlId = aIsSoftware ? sourceEl.id : targetEl.id;
          const node =
            input.deviceEntityByXmlId.get(techNodeXmlId) ??
            input.hostEntityByXmlId.get(techNodeXmlId);
          const software = input.systemSoftwareEntityByXmlId.get(softwareXmlId);
          if (!node || !software) continue;

          const existing = await em.findOne(TechnologyNodeSystemSoftwareMap, {
            node: node.id as any,
            systemSoftware: software.id as any,
          } as any);
          if (existing) continue;

          await em.persistAndFlush(
            em.create(TechnologyNodeSystemSoftwareMap, {
              node,
              systemSoftware: software,
              kind: (software as any).kind ?? SystemSoftwareKind.OTHER,
            } as any),
          );
        }
      }
    }
  }

  private async ensureUnknownOperatingSystem(
    em: EntityManager,
    context: ArchpadRequestContext,
    tenantId: string,
  ): Promise<OperatingSystem> {
    const name = 'Unknown OS';
    const existing = await em.findOne(OperatingSystem, { name, tenantId } as any);
    if (existing) return existing;

    const created = ActionStamp.now(context.userId);
    const entity = em.create(OperatingSystem, {
      name,
      description: 'Auto-created by Open Exchange importer',
      kind: SystemSoftwareKind.OS,
      created,
      tenantId,
    } as any);

    await em.persistAndFlush(entity);
    return entity;
  }

  private async ensureDeviceNodeTypeDirectory(
    em: EntityManager,
    context: ArchpadRequestContext,
  ): Promise<NodeTypeDirectory> {
    return this.ensureNodeTypeDirectory(em, context, {
      name: 'Device',
      makeDefault: true,
    });
  }

  private async ensureNodeTypeDirectory(
    em: EntityManager,
    context: ArchpadRequestContext,
    input: { name: string; makeDefault: boolean },
  ): Promise<NodeTypeDirectory> {
    if (input.makeDefault) {
      const byDefault = await em.findOne(NodeTypeDirectory, {
        byDefault: true,
      } as any);
      if (byDefault) return byDefault;
    }

    const existing = await em.findOne(NodeTypeDirectory, {
      name: input.name,
    } as any);
    if (existing) return existing;

    const created = ActionStamp.now(context.userId);
    const entity = em.create(NodeTypeDirectory, {
      name: input.name,
      description: 'Auto-created by Open Exchange importer',
      byDefault: input.makeDefault,
      created,
    } as any);

    await em.persistAndFlush(entity);
    return entity;
  }
}
