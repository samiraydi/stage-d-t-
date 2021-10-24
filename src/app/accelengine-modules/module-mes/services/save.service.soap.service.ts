import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { SaveModel } from '../models/save.model';


@Injectable({ providedIn: 'root', })
export class SaveSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    chargerSave(text,owner_id,start_date,duration,nbr,lot,op): Observable<SaveModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";
        console.log("WSSAVE log",text,owner_id,start_date,duration,nbr,lot,op);
        
        param['gpText'] = text;
        param['gpOwner_id'] = owner_id;
        param['gpStart_date'] = start_date;
        param['gpDuration'] = duration;

        param['gpNbr'] = nbr;
        param['gpLot'] = lot;
        param['gpOp'] = op;
        const self = this;
        return super.invokeDiscoWS('wssave', param)
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