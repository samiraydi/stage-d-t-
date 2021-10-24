import { NgModule, APP_INITIALIZER } from '@angular/core';
import * as moment from 'moment';
import * as momenttimezone from 'moment-timezone';

// Models
import { Application } from './accelengine-std/models/application.model';

// Services
import { ApplicationService } from './accelengine-core/services/application.service';
import { StorageService } from './accelengine-core/services/storage.service';
import { APP_CONFIG } from './app.config';

// data
import *  as  datas from '../assets/data.json';

@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initConfiguration,
            deps: [ApplicationService, StorageService],
            multi: true,
        },
    ],
})
export class AppInitializationModule {

}

export function initConfiguration(applicationService: ApplicationService, storageService: StorageService) {

    moment.locale('fr');
    momenttimezone.tz.setDefault("Africa/Tunis");

    return (): Promise<any> => {
        return new Promise((resolve, reject) => {
            storageService.removeCurentApp();
            if (APP_CONFIG.QADBackend) {
                if (datas.application) {
                    storageService.setCurentApp(datas.application as Application);
                    resolve(true);
                } else {
                    resolve(true);
                }
            } else {
                applicationService.getAppInfo(1).subscribe(
                    (application: Application) => {
                        if (application) {
                            storageService.setCurentApp(application);
                            resolve(true);
                        } else {
                            resolve(true);
                        }
                    });
            }
        })
    }
}