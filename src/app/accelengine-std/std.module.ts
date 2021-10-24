import { NgModule } from '@angular/core';

import { SharedModule } from '@app/accelengine-shared/shared.module';
import { StdRoutingModule } from './std-routing.module';

// Components
import { ApplicationDetailComponent } from './pages/application/application-detail/application-detail.component';
import { AccountMasterDetailComponent } from './pages/account/account-master-detail/account-master-detail.component';
import { AccountDetailComponent } from './pages/account/account-detail/account-detail.component';
import { RoleMasterDetailComponent } from './pages/account/role-master-detail/role-master-detail.component';
import { MenuMasterDetailComponent } from './pages/menu/menu-master-detail/menu-master-detail.component';
import { BatchExecutionComponent } from './pages/batch/batch-execution/batch-execution.component';
import { JobMasterDetailComponent } from './pages/job/job-master-detail/job-master-detail.component';

import { PermissionFormComponent } from './pages/account/permission-form/permission-form.component';

// Services
import { RoleService } from './services/role.service';
import { BatchExecutionService } from './services/batch.execution.service';
import { BatchsWebsocketService } from './services/batchs.websocket.service';
import { JobService } from './services/job.service';


@NgModule({
  imports: [
    SharedModule,
    StdRoutingModule,
  ],
  declarations: [
    ApplicationDetailComponent,
    AccountMasterDetailComponent,
    AccountDetailComponent,
    RoleMasterDetailComponent,
    MenuMasterDetailComponent,
    BatchExecutionComponent,
    JobMasterDetailComponent,
    PermissionFormComponent
  ],
  entryComponents: [
    PermissionFormComponent
  ],
  providers: [
    RoleService,
    BatchExecutionService,
    BatchsWebsocketService,
    JobService
  ]
})

export class StdModule { }