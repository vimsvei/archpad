import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { Employee } from '@/model/entities/organisation/employee.entity';

@Entity({ abstract: true })
export abstract class ArchimateElementGeneric extends NamedObject {
  @ManyToOne(() => Employee, {
    name: 'owner_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  owner: Employee
}
