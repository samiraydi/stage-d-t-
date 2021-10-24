import { AEEntity } from 'accelengine-lib';

export class Address extends AEEntity {
    email1: string;
    email2: string;
    addr1: string;
    addr2: string;
    postalCode: string;
    city: string;
    country: string;
}