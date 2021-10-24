import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_CONFIG } from '@app/app.config';

// Services
import { WsDiscoService } from '@app/accelengine-core/helpers/dsc-client/ws-disco.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';

// Models
import { Bobine } from '../models/bobine.model';



@Injectable({ providedIn: 'root', })
export class ChargementBobineSoapService extends WsDiscoService {

    constructor(injector: Injector, private storageService: StorageService) {
        super(injector);
    }

    //OK Service + not implemented
    getBobine(nbr): Observable<Bobine[]> {
        var param = {};
        param['ip_domain'] = APP_CONFIG.tenant.default;
        param['ip_addr'] = this.storageService.getCurentAccount().username;
        param['ip_wo_nbr'] = nbr;

        const self = this;
        return super.invokeDiscoWS('zzchbmvl', param)
            .pipe(
                map((response) => {
                    console.log(response);
                    return Bobine.fromMany(this.getDatas('optt_wo'));
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }


    //OK
    chargerDev(nbr, lot, part, serial, ref, site, loc, locDv, siteDv, qty): Observable<any> {

        var param = {};
        param['ip_domain'] = APP_CONFIG.tenant.default;
        param['ip_addr'] = this.storageService.getCurentAccount().username;
        param['ip_ld_nbr'] = nbr;
        param['ip_ld_lot'] = lot;
        param['ip_ld_part'] = part;
        param['ip_ld_serial'] = serial;
        param['ip_ld_ref'] = ref;
        param['ip_ld_site'] = site;
        param['ip_ld_loc'] = loc;
        param['ip_dv_loc'] = locDv;
        param['ip_dv_site'] = siteDv;
        param['ip_qty'] = qty;

        const self = this;
        return super.invokeDiscoWS('zzslbmvl', param)
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