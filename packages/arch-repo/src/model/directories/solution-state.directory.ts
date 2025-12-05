import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../abstract/directory-object.abstract';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';

@Entity({ discriminatorValue: DirectoryKind.SOLUTION_STATE })
export class SolutionStateDirectory extends DirectoryObject {}
