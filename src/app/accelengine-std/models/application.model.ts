import { AEEntity, AEAuditingEntity } from 'accelengine-lib';

export class Application extends AEEntity {
    code: string;
    name: string;
    description: string;
    version: string;
    modules: Module[];

    databaseName: string;
    databaseVersion: string;
    databaseURL: string;
    driverName: string;
    driverVersion: string;
}

export class Module extends AEEntity {
    code: string;
    name: string;
    settings: Setting[];
}

export class Setting extends AEAuditingEntity {
    code: string;
    name: string;
    type: VALUE_TYPE;
    valueString: string;
    valueNumber: number;
    valueBoolean: boolean;
    displayOrder: number;
    module: string;
}

export enum VALUE_TYPE {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN"
}

