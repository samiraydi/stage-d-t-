import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models
import { Menu } from '@core/models/menu.model'
import { AEList } from 'accelengine-lib';

// Services
import { CrudAPIService } from 'accelengine-lib';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';
const log = new Logger('MenuService');

@Injectable({ providedIn: 'root' })
export class MainMenuService extends CrudAPIService<Menu> {

    constructor(
        private injector: Injector) {
        super(injector);
        this.endpointService = APP_CONFIG.apiBaseUrl + '/menu';
    }

    getMainMenu(): Observable<AEList<Menu>> {
        log.debug('getMenu');
        const url = `${this.endpointService}/menu`;
        return this.http.get<any>(url);
    }

}