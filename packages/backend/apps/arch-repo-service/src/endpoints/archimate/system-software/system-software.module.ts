import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SystemSoftwareController } from './system-software.controller';
import { SystemSoftwareService } from './system-software.service';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SystemSoftware])],
  controllers: [SystemSoftwareController],
  providers: [SystemSoftwareService],
})
export class SystemSoftwareModule {}

