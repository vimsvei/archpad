import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlowController } from '@/endpoints/archimate/flow/flow.controller';
import { FlowService } from '@/endpoints/archimate/flow/flow.service';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { TechnologyFlow } from '@/model/archimate/relationships/technology-flow.entity';
import { ApplicationFlowProxyComponentsMap } from '@/model/maps/application-flow-proxy-components.map';
import { TechnologyFlowProxyNodesMap } from '@/model/maps/technology-flow-proxy-nodes.map';
import { FlowMotivationItemMap } from '@/model/maps/flow-motivation-item.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationFlow,
      TechnologyFlow,
      ApplicationFlowProxyComponentsMap,
      TechnologyFlowProxyNodesMap,
      FlowMotivationItemMap,
      SolutionFlowMap,
      ApplicationComponentFunctionMap,
      ApplicationComponentDataObjectMap,
    ]),
  ],
  controllers: [FlowController],
  providers: [FlowService],
})
export class FlowModule {}
