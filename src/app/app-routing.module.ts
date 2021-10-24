import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@core/guards/auth.guard';

// Component
import { AppMainComponent } from './accelengine-verona/app.main.component';
import { AppNotfoundComponent } from './accelengine-verona/pages/app.notfound.component';
import { AppLoginComponent } from './accelengine-verona/pages/app.login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            {
                path: '', component: AppMainComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'std',
                        loadChildren: () => import('@app/accelengine-std/std.module').then(m => m.StdModule)
                    }, {
                        path: 'dashboard',
                        loadChildren: () => import('@modules/module-dashboard/dashboard.module').then(m => m.DashboardModule)
                    }, {
                        path: 'mes',
                        loadChildren: () => import('@modules/module-mes/mes.module').then(m => m.MESModule)
                    },

                ]
            }, {
                path: 'login',
                component: AppLoginComponent,
            },
            /*
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},

            {path: 'login', component: AppLoginComponent},
            */
            { path: 'notfound', component: AppNotfoundComponent },

            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
