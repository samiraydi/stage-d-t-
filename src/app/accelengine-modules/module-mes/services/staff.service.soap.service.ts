import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { StaffModel } from '../models/staff.model';


@Injectable({ providedIn: 'root', })
export class StaffSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    getStaff(): Observable<StaffModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";


        const self = this;
        return super.invokeDiscoWS('wsstaff', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return StaffModel.fromMany(this.getDatas('tt_staff'));
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }



}