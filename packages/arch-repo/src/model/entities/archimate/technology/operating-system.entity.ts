import { SystemSoftware } from '@/model/entities/archimate/technology/system-software.entity';
import { Entity } from '@mikro-orm/core';
import { SoftwareKind } from '@/model/enums/software-kind.enum';

@Entity({ discriminatorValue: SoftwareKind.OS })
export class OperatingSystem extends SystemSoftware {}
