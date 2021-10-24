import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models
import { Role, Action, Document } from '@core/models/account.model';
import { AEList } from 'accelengine-lib';

// Services
import { CrudAPIService } from 'accelengine-lib';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';

const log = new Logger('RoleService');

@Injectable({ providedIn: 'root' })
export class RoleService extends CrudAPIService<Role>{

    constructor(
        private injector: Injector) {
        super(injector);
        this.endpointService = APP_CONFIG.apiBaseUrl + '/role';
    }

    getDocuments(): Observable<AEList<Document>> {
        log.debug('getDocuments');
        const url = `${this.endpointService}/alldocuments`;
        return this.http.get<any>(url);
    }

    getActions(): Observable<AEList<Action>> {
        log.debug('getActions');
        const url = `${this.endpointService}/allactions`;
        return this.http.get<any>(url);
    }
}