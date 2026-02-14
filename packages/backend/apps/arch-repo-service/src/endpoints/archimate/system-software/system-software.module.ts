import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SystemSoftwareController } from './system-software.controller';
import { SystemSoftwareService } from './system-software.service';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { TechnologyNodeSystemSoftwareMap } from '@/model/maps/technology-node-system-software.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      SystemSoftware,
      ApplicationComponentSystemSoftwareMap,
      TechnologyNodeSystemSoftwareMap,
    ]),
  ],
  controllers: [SystemSoftwareController],
  providers: [SystemSoftwareService],
})
export class SystemSoftwareModule {}
