import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {NamedObject} from "../../abstract/named-object.abstract";
import {Employee} from "../../organisation/employee.entity";

@Entity({ abstract: true })
export abstract class ArchimateElementGeneric extends NamedObject {
  @ApiProperty({ type: Employee, format: 'uuid', description: 'Owner' })
  @ManyToOne({
    entity: () => Employee,
    name: 'owner_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  owner!: Employee;
}
