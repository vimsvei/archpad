import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationComponentController } from './application-component.controller';
import { ApplicationComponentService } from './application-component.service';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ApplicationComponent])],
  controllers: [ApplicationComponentController],
  providers: [ApplicationComponentService],
})
export class ApplicationComponentModule {}
