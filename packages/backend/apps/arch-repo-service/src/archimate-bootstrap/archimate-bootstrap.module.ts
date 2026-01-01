import { Module } from '@nestjs/common';
import { ArchimateSequenceInitializer } from './archimate-sequence-initializer.service';
import { HasuraRelationshipNameInitializer } from './hasura-relationship-name-initializer.service';

@Module({
  providers: [ArchimateSequenceInitializer, HasuraRelationshipNameInitializer],
})
export class ArchimateBootstrapModule {}
