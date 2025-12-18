import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { ArchimateCode } from '@archpad/models';
import { ArchimateElementGeneric } from '../archimate/core/archimate-element.generic';
import { SolutionApplicationComponentMap } from '../maps/solution-application-component.map';
import {SolutionStateDirectory} from "@/model/directories/directories";

@Entity({ tableName: 'solutions' })
export class Solution extends ArchimateElementGeneric {
  @ArchimateCode('SOLUTION')
  override code: string = undefined as any;

  @ApiProperty({
    format: 'uuid',
    type: SolutionStateDirectory,
    description: 'Тип лицензии',
  })
  @ManyToOne({
    entity: () => SolutionStateDirectory,
    name: 'state_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  state!: SolutionStateDirectory;

  @OneToMany({
    entity: () => SolutionApplicationComponentMap,
    mappedBy: 'solution',
  })
  components = new Collection<SolutionApplicationComponentMap>(this);
}
