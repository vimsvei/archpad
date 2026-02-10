import { Global, Module } from '@nestjs/common';
import { TechnologyNodeDefaultsService } from './technology-node-defaults.service';

@Global()
@Module({
  providers: [TechnologyNodeDefaultsService],
  exports: [TechnologyNodeDefaultsService],
})
export class TechnologyNodeDefaultsModule {}
