import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, 
    MatTableModule, MatTabsModule, MatPaginatorModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { SystemUserDashboardComponent } from './system-user.component';
import { RoleService } from 'app/core/services/api/api-calls/role-service/role.service';
import { UserService } from 'app/core/services/api/api-calls/user.service.ts/user.service';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    {
        path     : '**',
        component: SystemUserDashboardComponent,
        // // canActivate: AuthGuard
        // ,
        // resolve  : {
        //     data: null
        // }
    }
];

@NgModule({
    declarations: [
        SystemUserDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        NgSelectModule
    ],
    providers   : [
        UserService,
        RoleService,
        AuthGuard
    ]
})
export class SystemUserDashboardModule
{
}

