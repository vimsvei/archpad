import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OpenExchangeImportController } from './open-exchange-import.controller';
import { OpenExchangeImportService } from './open-exchange-import.service';
import { OpenExchangeImportJobStore } from './open-exchange-import.job-store';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationFunctionDataObjectMap } from '@/model/maps/application-function-data-object.map';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { BusinessRole } from '@/model/archimate/business/business-role.entity';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { TechnologyLogicalNetwork } from '@/model/archimate/technology/technology-network.entity';
import { Principle } from '@/model/archimate/motivation/principle.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';
import { Requirement } from '@/model/archimate/motivation/requirement.entity';
import { Assessment } from '@/model/archimate/motivation/assessment.entity';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { TechnologyHostNode } from '@/model/archimate/technology/technology-node.entity';
import { OperatingSystem } from '@/model/archimate/technology/operating-system.entity';
import { NodeTypeDirectory } from '@/model/directories/directories';
import { TechnologyNodeSystemSoftwareMap } from '@/model/maps/technology-node-system-software.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationComponent,
      ApplicationFunction,
      ApplicationInterface,
      ApplicationEvent,
      DataObject,
      ApplicationFlow,
      ApplicationComponentFunctionMap,
      ApplicationComponentDataObjectMap,
      ApplicationFunctionDataObjectMap,
      BusinessActor,
      BusinessRole,
      BusinessActorRoleMap,
      SystemSoftware,
      TechnologyLogicalNetwork,
      Principle,
      Constraint,
      Requirement,
      Assessment,
      TechnologyDeviceNode,
      TechnologyHostNode,
      OperatingSystem,
      NodeTypeDirectory,
      TechnologyNodeSystemSoftwareMap,
    ]),
  ],
  controllers: [OpenExchangeImportController],
  providers: [OpenExchangeImportService, OpenExchangeImportJobStore],
})
export class OpenExchangeImportModule {}
