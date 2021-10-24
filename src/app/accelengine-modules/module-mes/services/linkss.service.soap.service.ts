import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { LinksModel } from '../models/links.model';


@Injectable({ providedIn: 'root', })
export class LinkssSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    getLinkss(): Observable<LinksModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";


        const self = this;
        return super.invokeDiscoWS('wsrelinks', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return LinksModel.fromMany(this.getDatas('tt_link'));
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }



}