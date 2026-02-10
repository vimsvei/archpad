import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TechnologyDeviceNode } from '@/model/archimate/technology/technology-node-device.entity';
import { TechnologyHostNode } from '@/model/archimate/technology/technology-node.entity';
import { NodeTypeDirectory } from '@/model/directories/directories';
import { OperatingSystem } from '@/model/archimate/technology/operating-system.entity';
import { TechnologyNodeDefaultsModule } from '../technology-node-defaults/technology-node-defaults.module';
import { TechnologyDeviceNodeController } from './technology-device-node.controller';
import { TechnologyHostNodeController } from './technology-host-node.controller';
import { TechnologyDeviceNodeService } from './technology-device-node.service';
import { TechnologyHostNodeService } from './technology-host-node.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      TechnologyDeviceNode,
      TechnologyHostNode,
      NodeTypeDirectory,
      OperatingSystem,
    ]),
    TechnologyNodeDefaultsModule,
  ],
  controllers: [TechnologyDeviceNodeController, TechnologyHostNodeController],
  providers: [TechnologyDeviceNodeService, TechnologyHostNodeService],
})
export class TechnologyNodeModule {}
