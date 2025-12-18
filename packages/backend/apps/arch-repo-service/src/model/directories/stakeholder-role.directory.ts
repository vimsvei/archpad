import {DirectoryObject} from "@/model/abstract/directory-object.abstract";
import {Entity} from "@mikro-orm/core";
import {DirectoryKind} from "@/model/enums/directory-kind.enum";

@Entity({ discriminatorValue: DirectoryKind.STAKEHOLDER_ROLE})
export class StakeholderRoleDirectory extends DirectoryObject {}
