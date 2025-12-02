import { Entity } from '@mikro-orm/core';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';
import { SystemSoftware } from '@/model/entities/archimate/technology/system-software.entity';

@Entity({ discriminatorValue: SystemSoftwareKind.OS })
export class OperatingSystem extends SystemSoftware {}
