import { ArchimateCode, IdentifiedObject } from "@archpad/models";

export class Tenant extends IdentifiedObject {
    @ArchimateCode('TENANT')
    override code: string = undefined as any;
}