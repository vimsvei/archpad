import {IdentifiedObject} from "@archpad/models";
import {Entity} from "@mikro-orm/core";

@Entity({ tableName: 'states' })
export class State extends IdentifiedObject {}
