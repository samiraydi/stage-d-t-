import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AccountDetailComponent } from './pages/account/account-detail/account-detail.component';
import { AccountMasterDetailComponent } from './pages/account/account-master-detail/account-master-detail.component';
import { RoleMasterDetailComponent } from './pages/account/role-master-detail/role-master-detail.component';
import { ApplicationDetailComponent } from './pages/application/application-detail/application-detail.component';
import { BatchExecutionComponent } from './pages/batch/batch-execution/batch-execution.component';
import { JobMasterDetailComponent } from './pages/job/job-master-detail/job-master-detail.component';
import { MenuMasterDetailComponent } from './pages/menu/menu-master-detail/menu-master-detail.component';

const routes: Routes = [
  // follow
  {
    path: 'follow/batch/execution',
    component: BatchExecutionComponent,
    data: {
      title: 'Traitements asynchrone'
    }
  }, {
    path: 'follow/job',
    component: JobMasterDetailComponent,
    data: {
      title: 'Tâches planifiées'
    }
  },
  // access
  {
    path: 'access/account',
    component: AccountMasterDetailComponent,
    data: {
      title: 'Comptes'
    }
  }, {
    path: 'access/account/detail',
    component: AccountDetailComponent,
    data: {
      title: 'Profile'
    }
  }, {
    path: 'access/role',
    component: RoleMasterDetailComponent,
    data: {
      title: 'Roles'
    }
  },
  // param
  {
    path: 'param/menu',
    component: MenuMasterDetailComponent,
    data: {
      title: 'Menus'
    }
  }, {
    path: 'param/application',
    component: ApplicationDetailComponent,
    data: {
      title: 'Application'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StdRoutingModule { }
