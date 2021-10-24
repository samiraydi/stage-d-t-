import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

// Models
import { Account } from '../models/account.model';

// Services
import { CrudAPIService } from 'accelengine-lib';
import { StorageService } from './storage.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';

@Injectable({ providedIn: 'root' })
export class AccountService extends CrudAPIService<Account>{

    constructor(
        private injector: Injector,
        private storageService: StorageService) {
        super(injector);
        this.endpointService = APP_CONFIG.apiBaseUrl + '/account';
    }

    getAccountBylogin(username: string): Observable<{}> {
        const url = `${this.endpointService}/bylogin`;
        return this.http.post<Account>(url, { username }).pipe(map(account => {
            // store user details
            this.storageService.setCurentAccount(account);
            return account;
        }));
    }


}