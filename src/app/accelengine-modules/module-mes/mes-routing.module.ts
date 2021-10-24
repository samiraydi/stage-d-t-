import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CustomerMasterDetailComponent } from './pages/customer/operationP-master-detail/customer-master-detail.component';
import { OperationMasterDetailComponent } from './pages/customer/operationNP-master-detail/operation-master-detail.component';


const routes: Routes = [
  {
    path: 'operationP',
    component: CustomerMasterDetailComponent,
    data: {
      title: 'Clients'
    }
  },{
    path: 'operationNP',
    component: OperationMasterDetailComponent,
    data: {
      title: 'Clients'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MESRoutingModule { }
