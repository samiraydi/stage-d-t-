import { Injectable, Injector } from '@angular/core';

// Models
import { Account } from '@core/models/account.model';
import { Application } from '../../accelengine-std/models/application.model';
// Services

// Helper
import { Logger } from 'accelengine-lib';
const log = new Logger('StorageService');

@Injectable({ providedIn: 'root' })
export class StorageService {

    public static CURRENT_APP_CODE: string;
    public static CURRENT_APP: string = '_CURRENT_APP';
    public static TOKEN_NAME: string = '_JWT_TOKEN';
    public static CURRENT_ACCOUNT: string = '_CURRENT_ACCOUNT';

    constructor() {
    }

    setCurentApp(application: Application) {
        // init global var
        if (!StorageService.CURRENT_APP_CODE) {
            StorageService.CURRENT_APP_CODE = application.code;
            StorageService.CURRENT_APP = application.code + StorageService.CURRENT_APP;
            StorageService.CURRENT_ACCOUNT = application.code + StorageService.CURRENT_ACCOUNT;
            StorageService.TOKEN_NAME = application.code + StorageService.TOKEN_NAME;
        }

        localStorage.setItem(StorageService.CURRENT_APP, JSON.stringify(application));
    }

    getCurentApp(): Application {
        return JSON.parse(localStorage.getItem(StorageService.CURRENT_APP));
    }

    removeCurentApp() {
        log.info('Remove App');
        localStorage.removeItem(StorageService.CURRENT_APP);
    }

    setToken(token: string): void {
        localStorage.setItem(StorageService.TOKEN_NAME, token);
    }

    getToken(): string {
        return localStorage.getItem(StorageService.TOKEN_NAME);
    }

    removeToken() {
        log.info('Remove Token');
        localStorage.removeItem(StorageService.TOKEN_NAME);
    }

    setCurentAccount(account) {
        localStorage.setItem(StorageService.CURRENT_ACCOUNT, JSON.stringify(account));
    }

    getCurentAccount(): Account {
        return JSON.parse(localStorage.getItem(StorageService.CURRENT_ACCOUNT));
    }

    removeAccount() {
        log.info('Remove Account');
        localStorage.removeItem(StorageService.CURRENT_ACCOUNT);
    }

    clear() {
        log.info('Clear all storage');
        const app = this.getCurentApp();
        const self = this;
        this.getItemAsync(StorageService.CURRENT_APP).then(function (app) {
            log.info('Clear all all storage');
            localStorage.clear();
            self.setCurentApp(app);
        });
    }


    setItemAsync(key, value): Promise<any> {
        return new Promise(resolve => {
            let i = 0;
            localStorage.setItem(key, JSON.stringify(value));
            setTimeout(() => {
                if (i > 10) { resolve(false); }
                let value = JSON.parse(localStorage.getItem(key));
                if (value) { resolve(true); }
            }, 500);
        });
    }

    getItemAsync(key): Promise<any> {
        return new Promise(resolve => {
            let i = 0;
            setTimeout(() => {
                if (i > 10) { resolve(false); }
                let value = JSON.parse(localStorage.getItem(key));
                if (value) { resolve(value); }
            }, 500);
        });
    }
}
