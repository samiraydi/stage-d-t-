import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { wrModel } from '../models/data.model';


@Injectable({ providedIn: 'root', })
export class LinksSoapService extends WsDiscoService {

    
    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    getLinks(): Observable<wrModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";


        const self = this;
        return super.invokeDiscoWS('wswr', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return wrModel.fromMany(this.getDatas('tt_wr'));
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }



}