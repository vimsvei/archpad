import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { NamedObject } from '@archpad/models';
import { Employee } from '../../organisation/employee.entity';

@Entity({ abstract: true })
export abstract class ArchimateElementGeneric extends NamedObject {}
