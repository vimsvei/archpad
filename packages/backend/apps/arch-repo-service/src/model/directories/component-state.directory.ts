import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../abstract/directory-object.abstract';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';

@Entity({ discriminatorValue: DirectoryKind.COMPONENT_STATE })
export class ComponentStateDirectory extends DirectoryObject {}
