import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, finalize, delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import { each } from 'lodash';

// data
import *  as  datas from '../../../assets/data.json';

// Services
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';
import { ErrorResponse, Logger } from 'accelengine-lib';

// Helpers
import { APP_CONFIG } from '@app/app.config';
const log = new Logger('HttpCallInterceptor');

@Injectable({ providedIn: 'root' })
export class HttpCallInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private translateService: TranslateService,
        private messageService: MessageService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const { url, method, headers, body } = request;

        const NoBackendURLs: string[] = [
            'application/info/1',
            'account/bylogin',
            '/menu/menu'
        ];

        //this.loadingScreenService.startLoading();
        if (isHandleRouteOK()) {
            // wrap in delayed observable to simulate server api call
            return of(null)
                .pipe(mergeMap(handleRoute))
                .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
                .pipe(delay(500))
                .pipe(dematerialize())
                .pipe(
                    finalize(() => {
                        //this.loadingScreenService.stopLoading();
                    }),
                    catchError((error: HttpErrorResponse) => {
                        doCatchError(error, this.translateService, this.messageService);
                        return ok(undefined);
                    })
                );
        } else {
            if (!url.endsWith('application/info') && !url.includes('/assets')) {
                // add authorization header with jwt token if available
                const authToken = this.authenticationService.getAuthorizationToken();
                if (authToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: authToken
                        }
                    });
                }
            }
            return next.handle(request).pipe(
                finalize(() => {
                    //this.loadingScreenService.stopLoading();
                }),
                catchError((error: HttpErrorResponse) => {
                    doCatchError(error, this.translateService, this.messageService);
                    return ok(undefined);
                })
            );
        }

        function isHandleRouteOK() {
            if (url.endsWith('/authentication/authenticate') && method === 'POST') {
                return APP_CONFIG.fakeAuth;
            } else {
                if (APP_CONFIG.noBackend) {
                    let urlMapped = false;
                    each(NoBackendURLs, function (noBackendURL) {
                        urlMapped = url.endsWith(noBackendURL);
                        if (urlMapped) {
                            return false;
                        }
                    });
                    return urlMapped;
                } else
                    return false;

            }
        }

        function handleRoute() {
            switch (true) {
                case url.endsWith('application/info/1'):
                    return getApplicationInfo();
                case url.endsWith('/authentication/authenticate'):
                    return authenticate();
                case url.endsWith('account/bylogin'):
                    return getAccountInfo();
                case url.endsWith('/menu/menu'):
                    return getMenu();
                default:
                    // pass through any requests not handled above
                    return error('URL not mapped');
            }
        }

        // DATA
        function getApplicationInfo() {
            return ok(datas.application);
        }

        function authenticate() {
            const { username, password } = body;
            const user = datas.users.find(x => x.username === username && x.password === password);
            if (!user) return error('Le nom d\'utilisateur ou le mot de passe est incorrect');
            return ok(user);
        }

        function getAccountInfo() {
            const { username } = body;
            const user = datas.users.find(x => x.username === username);
            return ok(user);
        }

        function getMenu() {
            return ok(datas.menus);
        }

        function doCatchError(error, translateService, messageService) {
            if (error.status === UNAUTHORIZED) {
                messageService.add({ severity: 'error', summary: 'Erreur', detail: "Vous n'avez pas l'autorisation pour exécuter cette action" });
                return of(undefined);
            }
            let message;
            let errorResponse: ErrorResponse = new ErrorResponse();
            if (error instanceof HttpErrorResponse) {
                if (error.status === 0) {
                    message = translateService.instant('error.server.down', { value: message });
                } else {
                    errorResponse = error.error;
                    if (errorResponse.status === BAD_REQUEST) {
                        if (errorResponse.violations) {
                            errorResponse.message = translateService.instant('messages.validation.constraint_violation', { value: errorResponse.detail });
                            each(errorResponse.violations, function (violation) {
                                errorResponse.message = errorResponse.message + `<br>[${violation.field}] : ${violation.message}`
                            });
                        }
                    }

                    if (error.error.message)
                        message = error.error.message;

                    if (error.error.detail)
                        message = error.error.detail;
                }
            }

            log.error(error);
            log.error(message);
            messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
        }

        // HELPER FUNCTIONS
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError(new HttpErrorResponse({ status: BAD_REQUEST, error: { message } }));
        }

        function unauthorized() {
            return throwError(new HttpErrorResponse({ status: UNAUTHORIZED, error: { message: 'Unauthorised' } }));
        }
    }
}


export const HttpCallInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallInterceptor,
    multi: true
};
