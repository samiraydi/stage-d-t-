import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';


// Models
import { DatasModel } from '../models/datas.model';


@Injectable({ providedIn: 'root', })
export class DatasSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    getData(): Observable<DatasModel[]> {
        var param = {};
        param['gpdomain'] = "PACO";


        const self = this;
        return super.invokeDiscoWS('wsrefresh', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return DatasModel.fromMany(this.getDatas('tt_gantt'));
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

}