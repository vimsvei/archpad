import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationInterfaceController } from './application-interface.controller';
import { ApplicationInterfaceService } from './application-interface.service';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ApplicationInterface,
      ApplicationComponentInterfaceMap,
    ]),
  ],
  controllers: [ApplicationInterfaceController],
  providers: [ApplicationInterfaceService],
})
export class ApplicationInterfaceModule {}
