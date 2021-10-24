import { Injectable, Injector } from '@angular/core';

// Models
import { Customer } from '../models/customer.model';

// Services
import { CrudAPIService } from 'accelengine-lib';

import { APP_CONFIG } from '@app/app.config';

@Injectable()
export class CustomerService extends CrudAPIService<Customer>{

    constructor(
        private injector: Injector) {
        super(injector);
        this.endpointService = APP_CONFIG.apiBaseUrl + '/customer';
    }

}