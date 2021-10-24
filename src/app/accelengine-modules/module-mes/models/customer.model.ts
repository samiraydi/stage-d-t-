import { AEAuditingEntity } from 'accelengine-lib';

export class Customer extends AEAuditingEntity {
    code: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    color: string;
    status: boolean;
}