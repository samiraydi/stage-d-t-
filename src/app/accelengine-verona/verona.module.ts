import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { SharedModule } from '@app/accelengine-shared/shared.module';


// Components
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppFooterComponent } from './app.footer.component';

// Pages
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppLoginComponent } from './pages/app.login.component';

// Service
import { MenuService } from './app.menu.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AppMainComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppFooterComponent,
    // Pages
    AppNotfoundComponent,
    AppLoginComponent
  ],
  entryComponents: [
  ],
  providers: [
    MenuService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    ConfirmationService,
    MessageService
  ]
})

export class VeronaModule {
  constructor() { }
}
