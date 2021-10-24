import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { UtilitiesModule } from './utilities/utilities.module';

import { AuthGuard } from './guards/auth.guard';

// Websocket
import { RxStompService } from '@stomp/ng2-stompjs';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Components

// Services
import { AccountService } from './services/account.service';
import { ApplicationService } from './services/application.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationSOAPService } from './services/authentication.soap.service';
import { MenuSaveService } from 'accelengine-lib';
import { MainMenuService } from './services/mainmenu.service';
import { StorageService } from './services/storage.service';
import { HttpCallInterceptorProvider } from './services/http.call.interceptor';
import { MsgService } from './services/msg.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  imports: [
    UtilitiesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [

  ],
  entryComponents: [
  ],
  providers: [
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    HttpCallInterceptorProvider,
    RxStompService,
    // CORE
    StorageService,
    ApplicationService,
    AccountService,
    AuthenticationService,
    AuthenticationSOAPService,
    MenuSaveService,
    MainMenuService,
    MsgService,
    LoadingService
  ]
})

export class CoreModule {
  constructor() { }
}

// required for AOT compilation
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}