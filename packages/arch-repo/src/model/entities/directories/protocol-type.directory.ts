import { Entity } from '@mikro-orm/core';
import { DirectoryKind } from '@/model/enums/directory-kind.enum';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';

@Entity({ discriminatorValue: DirectoryKind.PROTOCOL_TYPE })
export class ProtocolTypeDirectory extends DirectoryObject {}
