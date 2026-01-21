import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { SolutionImplementationStatus } from '@/model/enums/solution-implementation-status.enum';
import { SolutionLifecycle } from '@/model/enums/solution-life-cycle.enum';

@Entity({ abstract: true })
export class SolutionElementGeneric extends ArchimateElementGeneric {}
