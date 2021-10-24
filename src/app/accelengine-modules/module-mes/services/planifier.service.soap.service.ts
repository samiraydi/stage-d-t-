import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { PlanifierModel } from '../models/planifier.model';


@Injectable({ providedIn: 'root', })
export class PlanifierSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    chargerPlanifier(nbr,lot,op): Observable<PlanifierModel[]> {
        var param = {};
        param['gpDomain'] = "PACO";
        console.log("insert",nbr,lot,op)
        param['gpNbr'] = nbr;
        param['gpLot'] = lot;
        param['gpOp'] = op;
        const self = this;
        return super.invokeDiscoWS('wsinsert', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return response
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

}