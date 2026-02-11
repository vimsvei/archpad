import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';
import { ApplicationFlow } from '@/model/archimate/relationships/application-flow.entity';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentSystemSoftwareMap } from '@/model/maps/application-component-system-software.map';
import { ApplicationComponentHierarchyMap } from '@/model/maps/application-component-hierarchy.map';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { DrawIoImportController } from './draw-io-import.controller';
import { DrawIoImportService } from './draw-io-import.service';
import { DrawIoImportJobStore } from './draw-io-import.job-store';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationComponent,
      ApplicationFunction,
      DataObject,
      ApplicationFlow,
      ApplicationComponentFunctionMap,
      ApplicationComponentDataObjectMap,
      ApplicationComponentSystemSoftwareMap,
      ApplicationComponentHierarchyMap,
      SystemSoftware,
    ]),
  ],
  controllers: [DrawIoImportController],
  providers: [DrawIoImportService, DrawIoImportJobStore],
})
export class DrawIoImportModule {}
