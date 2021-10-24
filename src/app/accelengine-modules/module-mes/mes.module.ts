import { NgModule } from '@angular/core';

import { SharedModule } from '@app/accelengine-shared/shared.module';
import { MESRoutingModule } from './mes-routing.module';
import { CustomerMasterDetailComponent } from './pages/customer/operationP-master-detail/customer-master-detail.component';
import { OperationMasterDetailComponent } from './pages/customer/operationNP-master-detail/operation-master-detail.component';

import { CustomerService } from './services/customer.service';

// Components

// Services

@NgModule({
  imports: [
    SharedModule,
    MESRoutingModule
  ],
  declarations: [
    CustomerMasterDetailComponent,
    OperationMasterDetailComponent

  ],
  entryComponents: [
  ],
  providers: [
    CustomerService,
    
  ]
})
export class MESModule {

  constructor() {
  }

}
