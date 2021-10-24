import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import jwt_decode, { JwtPayload } from "jwt-decode";

// Models
import { Application } from '../../accelengine-std/models/application.model';
import { Account } from '../models/account.model';

// Services

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { StorageService } from './storage.service';

import { Logger } from 'accelengine-lib';
const log = new Logger('AuthenticationService');

export const TOKEN_NAME: string = '_jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    endpointService: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private storageService: StorageService) {
        this.endpointService = APP_CONFIG.apiBaseUrl + '/authentication';
    }

    getAuthorizationToken() {
        let token = this.storageService.getToken();
        if (!token) return null;
        return `Bearer ${token}`;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: JwtPayload = jwt_decode(token);
        if (decoded.exp === undefined) return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (APP_CONFIG.noToken) {
            const user = this.storageService.getCurentAccount()
            if (!user) return true;
        } else {
            if (!token) token = this.storageService.getToken();
            if (!token) return true;
            if (APP_CONFIG.fakeAuth)
                return false;
            const date = this.getTokenExpirationDate(token);
            if (date === undefined) return false;
            return !(date.valueOf() > new Date().valueOf());
        }
    }

    login(username, password) {
        const self = this;
        return this.http.post<Account>(this.endpointService + '/authenticate', { username, password }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                self.storageService.setToken(user.token);
            }
            return user;
        }));
    }

    logout(doRouter: boolean = true) {
        // remove all local storage
        log.info('Logout', doRouter);
        this.storageService.clear();
        if (doRouter)
            this.router.navigate([APP_CONFIG.app.loginPage]);
    }
}