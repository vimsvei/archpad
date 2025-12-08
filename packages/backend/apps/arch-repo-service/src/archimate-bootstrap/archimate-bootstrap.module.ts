import { Module } from '@nestjs/common';
import {ArchimateSequenceInitializer} from "./archimate-sequence-initializer.service";

@Module({
  providers: [ArchimateSequenceInitializer],
})
export class ArchimateBootstrapModule {}
