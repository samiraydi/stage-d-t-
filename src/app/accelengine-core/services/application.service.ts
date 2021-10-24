import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models
import { Application } from '../../accelengine-std/models/application.model';

// Services
import { CrudAPIService } from 'accelengine-lib';

import { APP_CONFIG } from '@app/app.config';
//import { Logger } from '@shared/helpers/logger';
//const log = new Logger('ApplicationService');

@Injectable({ providedIn: 'root' })
export class ApplicationService extends CrudAPIService<Application>{

    constructor(
        private injector: Injector) {
        super(injector);
        this.endpointService = APP_CONFIG.apiBaseUrl + '/application';
    }

    getAppInfo(id: number): Observable<{}> {
        const url = `${this.endpointService}/info/${id}`;
        return this.http.get<Application>(url);
    }

}