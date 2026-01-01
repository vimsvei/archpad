import { Module } from '@nestjs/common';
import { ArchimateSequenceInitializer } from './archimate-sequence-initializer.service';
import { HasuraRelationshipNameInitializer } from './hasura-relationship-name-initializer.service';
import { LoggerModule } from '@archpad/logger';

@Module({
  imports: [LoggerModule],
  providers: [ArchimateSequenceInitializer, HasuraRelationshipNameInitializer],
})
export class ArchimateBootstrapModule {}
