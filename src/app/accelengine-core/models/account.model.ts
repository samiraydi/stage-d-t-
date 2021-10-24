import { AEEntity, AEAuditingEntity, CodeNameEntity } from 'accelengine-lib';
import { Menu } from './menu.model';

export class Account extends AEAuditingEntity {
    username: string;
    password: string;
    email: string;
    activated: boolean;
    profile: Profile = new Profile();
    roles: Role[] = [];
    token?: string;
    info: string;

    code: string;
    type: string;
}

export class Profile extends AEEntity {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
}

export const CIVILITY: any = [
    { code: 'M', label: 'MR' },
    { code: 'F', label: 'MS' },
];

export class Role extends AEEntity {
    code: string;
    name: string;
    permissions: Permission[] = [];
    menus: Menu[] = [];
}

export class Permission extends AEEntity {
    document: Document;
    action: Action;
}

export class Document extends CodeNameEntity {
}

export class Action extends CodeNameEntity {
}