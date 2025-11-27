import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../../abstract/directory-object.abstract';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';

@Entity({ discriminatorValue: DirectoryKind.LICENSE_TYPE })
export class LicenseTypeDirectory extends DirectoryObject {}
