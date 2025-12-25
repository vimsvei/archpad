import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationComponentController } from './application-component.controller';
import { ApplicationComponentService } from './application-component.service';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationComponent,
      ApplicationComponentDataObjectMap,
      ApplicationComponentFunctionMap,
      ApplicationComponentInterfaceMap,
      ApplicationComponentEventMap,
    ]),
  ],
  controllers: [ApplicationComponentController],
  providers: [ApplicationComponentService],
})
export class ApplicationComponentModule {}
