import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { SolutionApplicationComponentMap } from '@/model/maps/solution-application-component.map';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { LicenseTypeDirectory } from '@/model/directories/license-type.directory';
import { SolutionStateDirectory } from '@/model/directories/solution-state.directory';

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
