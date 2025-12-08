import { Module } from '@nestjs/common';
import { ApplicationComponentController } from './application-component.controller';
import { ApplicationComponentService } from './application-component.service';

@Module({
  controllers: [ApplicationComponentController],
  providers: [ApplicationComponentService],
})
export class ApplicationComponentModule {}
