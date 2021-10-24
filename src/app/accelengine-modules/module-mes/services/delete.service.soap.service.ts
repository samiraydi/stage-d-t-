import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { DeleteModel } from '../models/delete.model';


@Injectable({ providedIn: 'root', })
export class DeleteSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    chargerDelete(nbr,lot,op): Observable<DeleteModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";
        console.log("WSDELETE log",nbr,lot,op);
        
        param['gpNbr'] = nbr;
        param['gpLot'] = lot;
        param['gpOp'] = op;
        const self = this;
        return super.invokeDiscoWS('wsdelete', param)
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