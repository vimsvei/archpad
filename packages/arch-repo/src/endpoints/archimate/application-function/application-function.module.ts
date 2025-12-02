import { Module } from '@nestjs/common';
import { ApplicationFunctionController } from './application-function.controller';
import { ApplicationFunctionService } from './application-function.service';

@Module({
  controllers: [ApplicationFunctionController],
  providers: [ApplicationFunctionService],
})
export class ApplicationFunctionModule {}
