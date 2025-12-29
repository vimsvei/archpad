import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationComponentController } from './application-component.controller';
import { ApplicationComponentService } from './application-component.service';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentTechnologyNodeMap } from '@/model/maps/application-component-technology-node.map';
import { ApplicationComponentTechnologyLogicalNetworkMap } from '@/model/maps/application-component-technology-logical-network.map';
import { ApplicationComponentHierarchyMap } from '@/model/maps/application-component-hierarchy.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationComponent,
      ApplicationComponentDataObjectMap,
      ApplicationComponentFunctionMap,
      ApplicationComponentInterfaceMap,
      ApplicationComponentEventMap,
      ApplicationComponentSystemSoftwareMap,
      ApplicationComponentTechnologyNodeMap,
      ApplicationComponentTechnologyLogicalNetworkMap,
      ApplicationComponentHierarchyMap,
    ]),
  ],
  controllers: [ApplicationComponentController],
  providers: [ApplicationComponentService],
})
export class ApplicationComponentModule {}
