import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { Solution } from '@/model/solution/solution.entity';
import { SolutionApplicationComponentMap } from '@/model/maps/solution-application-component.map';
import { SolutionApplicationFunctionMap } from '@/model/maps/solution-application-function.map';
import { SolutionDataObjectMap } from '@/model/maps/solution-data-object.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionStakeholderMap } from '@/model/maps/solution-stakeholder.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Solution,
      SolutionApplicationComponentMap,
      SolutionApplicationFunctionMap,
      SolutionDataObjectMap,
      SolutionFlowMap,
      SolutionMotivationElementMap,
      SolutionStakeholderMap,
    ]),
  ],
  controllers: [SolutionController],
  providers: [SolutionService],
})
export class SolutionModule {}
